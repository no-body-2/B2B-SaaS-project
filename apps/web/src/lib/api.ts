import axios from 'axios';

// 환경 변수 설정 (브라우저 환경이므로 NEXT_PUBLIC_ 접두사 사용)
const IS_MOCK = process.env.NEXT_PUBLIC_API_MOCK !== 'false';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// 실제 NestJS API 통신용 Axios 인스턴스 및 인터셉터 설정
const realApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Access Token 자동 주입
realApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const at = localStorage.getItem('accessToken');
    if (at && config.headers) {
      config.headers.Authorization = `Bearer ${at}`;
    }
  }
  return config;
});

// 응답 인터셉터: 401 오류 발생 시 Refresh Token으로 자동 RTR 갱신
realApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh' &&
      originalRequest.url !== '/auth/login'
    ) {
      originalRequest._retry = true;
      try {
        const rt = localStorage.getItem('refreshToken');
        if (!rt) throw new Error('No refresh token');

        // Refresh API 호출
        const res = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${rt}`,
            },
          }
        );

        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 이전 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return realApi(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/?error=session_expired';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// LocalStorage 기반 Mock 데이터베이스 및 헬퍼 함수
const getMockStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(data) as T;
};

const setMockStorage = <T>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Mock Seed Data 초기 기동 시 자동 생성
const initializeMockDb = () => {
  // 가상 유저
  getMockStorage('b2b_mock_users', [
    {
      id: 'usr-1',
      email: 'owner@example.com',
      password: 'password123',
      name: '김대포 (OWNER)',
    },
    {
      id: 'usr-2',
      email: 'member@example.com',
      password: 'password123',
      name: '이멤버 (MEMBER)',
    },
  ]);

  // 워크스페이스
  getMockStorage('b2b_mock_workspaces', [
    {
      id: 'ws-1',
      name: '루미나노 코리아',
      domain: 'luminano',
      createdAt: new Date().toISOString(),
      deletedAt: null,
    },
  ]);

  // 워크스페이스 멤버 매핑
  getMockStorage('b2b_mock_workspace_members', [
    { workspaceId: 'ws-1', userId: 'usr-1', role: 'OWNER' },
    { workspaceId: 'ws-1', userId: 'usr-2', role: 'MEMBER' },
  ]);

  // 문서 (Nano) 트리
  getMockStorage('b2b_mock_nanos', [
    {
      id: 'nano-1',
      workspaceId: 'ws-1',
      title: '웰컴 가이드',
      content: '# 웰컴 가이드\n\n워크스페이스에 오신 것을 환영합니다! 문서를 자유롭게 편집해보세요.',
      parentNanoId: null,
      order: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'nano-2',
      workspaceId: 'ws-1',
      title: '2026 하반기 마일스톤',
      content: '# 2026 하반기 마일스톤\n\n- [ ] Next.js FE 구축 완료\n- [ ] 무중단 CD 오픈',
      parentNanoId: null,
      order: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'nano-3',
      workspaceId: 'ws-1',
      title: '하위 상세 기획서',
      content: '상세 기획서 내용입니다.',
      parentNanoId: 'nano-2',
      order: 1,
      createdAt: new Date().toISOString(),
    },
  ]);

  // 결재 요청 목록
  getMockStorage('b2b_mock_approval_requests', [
    {
      id: 'appr-1',
      workspaceId: 'ws-1',
      nanoId: 'nano-2',
      title: '2026 하반기 마일스톤 수정 건',
      content: '하반기 마일스톤 문서를 수정했습니다. 결재 승인 부탁드립니다.',
      requesterId: 'usr-2',
      requesterName: '이멤버 (MEMBER)',
      status: 'PENDING', // PENDING, APPROVED, REJECTED, CANCELLED
      opinion: null,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  // 채팅방 목록
  getMockStorage('b2b_mock_chatrooms', [
    {
      id: 'ch-1',
      workspaceId: 'ws-1',
      name: '잡담-수다방',
      isPrivate: false,
      ownerId: 'usr-1',
    },
    {
      id: 'ch-2',
      workspaceId: 'ws-1',
      name: '기획-공유방',
      isPrivate: false,
      ownerId: 'usr-1',
    },
  ]);

  // 채팅 메시지 목록
  getMockStorage('b2b_mock_chat_messages', [
    {
      id: 'msg-1',
      chatroomId: 'ch-1',
      senderId: 'usr-1',
      senderName: '김대포 (OWNER)',
      content: '안녕하세요! 새로 만든 수다방입니다.',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      isEdited: false,
      isDeleted: false,
    },
    {
      id: 'msg-2',
      chatroomId: 'ch-1',
      senderId: 'usr-2',
      senderName: '이멤버 (MEMBER)',
      content: '방갑습니다 대표님! 테스트 메시지입니다.',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      isEdited: false,
      isDeleted: false,
    },
  ]);
};

if (typeof window !== 'undefined') {
  initializeMockDb();
}

// Mock API 가상 모듈 정의
const mockApi = {
  auth: {
    register: async (dto: any) => {
      const users = getMockStorage('b2b_mock_users', [] as any[]);
      if (users.some((u) => u.email === dto.email)) {
        throw { response: { status: 409, data: { message: '이미 사용 중인 이메일입니다.' } } };
      }
      const newUser = {
        id: `usr-${Date.now()}`,
        email: dto.email,
        password: dto.password,
        name: dto.name || '신규유저',
      };
      users.push(newUser);
      setMockStorage('b2b_mock_users', users);
      return { data: { id: newUser.id, email: newUser.email, name: newUser.name } };
    },

    login: async (dto: any) => {
      const users = getMockStorage('b2b_mock_users', [] as any[]);
      const user = users.find((u) => u.email === dto.email && u.password === dto.password);
      if (!user) {
        throw { response: { status: 401, data: { message: '이메일 또는 비밀번호가 불일치합니다.' } } };
      }
      const accessToken = `mock_at_${user.id}_${Date.now()}`;
      const refreshToken = `mock_rt_${user.id}_${Date.now()}`;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('currentUser', JSON.stringify({ userId: user.id, email: user.email, name: user.name }));
      return { data: { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } } };
    },

    logout: async () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      return { data: { message: '로그아웃 성공' } };
    },
    googleLogin: async (dto: any) => {
      const accessToken = `mock_at_google_${Date.now()}`;
      const refreshToken = `mock_rt_google_${Date.now()}`;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('currentUser', JSON.stringify({ userId: 'usr-1', email: 'owner@example.com', name: '김대포 (OWNER)' }));
      return { data: { accessToken, refreshToken, user: { id: 'usr-1', email: 'owner@example.com', name: '김대포 (OWNER)' } } };
    },
  },

  user: {
    getMe: async () => {
      const cu = localStorage.getItem('currentUser');
      if (!cu) throw { response: { status: 401 } };
      return { data: JSON.parse(cu) };
    },
    deleteMe: async () => {
      const cu = localStorage.getItem('currentUser');
      if (!cu) throw { response: { status: 401 } };
      const current = JSON.parse(cu);
      
      const users = getMockStorage('b2b_mock_users', [] as any[]);
      const updatedUsers = users.filter((u) => u.id !== current.userId);
      setMockStorage('b2b_mock_users', updatedUsers);
      
      localStorage.clear();
      return { data: { message: '회원 탈퇴 완료' } };
    },
    updateProfile: async (dto: any) => {
      const cu = localStorage.getItem('currentUser');
      if (!cu) throw { response: { status: 401 } };
      const current = JSON.parse(cu);
      current.name = `${dto.lastName || ''}${dto.firstName || ''}`.trim() || current.name;
      localStorage.setItem('currentUser', JSON.stringify(current));
      return { data: { message: '모크 프로필 변경 완료' } };
    },
    changePassword: async (dto: any) => {
      return { data: { message: '모크 비밀번호 변경 완료' } };
    },
    requestEmailChange: async (dto: any) => {
      return { data: { message: '모크 이메일 변경 요청 완료' } };
    },
    verifyEmailChange: async (token: string) => {
      return { data: { message: '모크 이메일 검증 승인 완료' } };
    },
    getPreference: async () => {
      return { data: { theme: 'light', language: 'ko', timezone: 'Asia/Seoul' } };
    },
    updatePreference: async (dto: any) => {
      return { data: { message: '모크 환경설정 변경 완료' } };
    },
  },

  workspace: {
    create: async (dto: any) => {
      const workspaces = getMockStorage('b2b_mock_workspaces', [] as any[]);
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');

      // 3개 소유제한 검사
      const ownedCount = members.filter((m) => m.userId === cu.userId && m.role === 'OWNER').length;
      if (ownedCount >= 3) {
        throw { response: { status: 403, data: { message: '워크스페이스 소유 한도(3개)를 초과했습니다.' } } };
      }

      const newWs = {
        id: `ws-${Date.now()}`,
        name: dto.name,
        domain: dto.domain,
        createdAt: new Date().toISOString(),
        deletedAt: null,
      };

      workspaces.push(newWs);
      members.push({ workspaceId: newWs.id, userId: cu.userId, role: 'OWNER' });

      setMockStorage('b2b_mock_workspaces', workspaces);
      setMockStorage('b2b_mock_workspace_members', members);

      return { data: newWs };
    },

    list: async () => {
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const workspaces = getMockStorage('b2b_mock_workspaces', [] as any[]);

      const userWsIds = members.filter((m) => m.userId === cu.userId).map((m) => m.workspaceId);
      const list = workspaces.filter((w) => userWsIds.includes(w.id) && !w.deletedAt);
      return { data: list };
    },

    getDetail: async (workspaceId: string) => {
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const workspaces = getMockStorage('b2b_mock_workspaces', [] as any[]);
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);

      const ws = workspaces.find((w) => w.id === workspaceId);
      if (!ws) throw { response: { status: 404, data: { message: '워크스페이스를 찾을 수 없습니다.' } } };

      const member = members.find((m) => m.workspaceId === workspaceId && m.userId === cu.userId);
      if (!member) throw { response: { status: 403, data: { message: '해당 워크스페이스 멤버가 아닙니다.' } } };

      return { data: { ...ws, role: member.role } };
    },

    update: async (workspaceId: string, dto: any) => {
      const workspaces = getMockStorage('b2b_mock_workspaces', [] as any[]);
      const idx = workspaces.findIndex((w) => w.id === workspaceId);
      if (idx === -1) throw { response: { status: 404 } };
      workspaces[idx] = { ...workspaces[idx], ...dto };
      setMockStorage('b2b_mock_workspaces', workspaces);
      return { data: workspaces[idx] };
    },

    delete: async (workspaceId: string) => {
      const workspaces = getMockStorage('b2b_mock_workspaces', [] as any[]);
      const idx = workspaces.findIndex((w) => w.id === workspaceId);
      if (idx === -1) throw { response: { status: 404 } };
      workspaces[idx].deletedAt = new Date().toISOString();
      setMockStorage('b2b_mock_workspaces', workspaces);
      return { data: { message: '30일 보관함으로 이동 완료' } };
    },

    restore: async (workspaceId: string) => {
      const workspaces = getMockStorage('b2b_mock_workspaces', [] as any[]);
      const idx = workspaces.findIndex((w) => w.id === workspaceId);
      if (idx === -1) throw { response: { status: 404 } };
      workspaces[idx].deletedAt = null;
      setMockStorage('b2b_mock_workspaces', workspaces);
      return { data: { message: '워크스페이스 복구 성공' } };
    },
  },

  members: {
    list: async (workspaceId: string) => {
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const users = getMockStorage('b2b_mock_users', [] as any[]);
      const wsMembers = members.filter((m) => m.workspaceId === workspaceId);
      
      const detailedMembers = wsMembers.map((m) => {
        const u = users.find((user) => user.id === m.userId);
        return {
          userId: m.userId,
          role: m.role,
          user: u ? { name: u.name, email: u.email } : { name: '알 수 없음', email: '' },
        };
      });
      return { data: detailedMembers };
    },

    invite: async (workspaceId: string, email: string) => {
      const users = getMockStorage('b2b_mock_users', [] as any[]);
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw { response: { status: 404, data: { message: '해당 이메일의 유저가 존재하지 않습니다.' } } };
      }
      if (members.some((m) => m.workspaceId === workspaceId && m.userId === user.id)) {
        throw { response: { status: 409, data: { message: '이미 가입된 사용자이거나 진행 중인 초대입니다.' } } };
      }
      
      // 즉시 추가 (Mock 단축 처리)
      members.push({ workspaceId, userId: user.id, role: 'MEMBER' });
      setMockStorage('b2b_mock_workspace_members', members);
      return { data: { message: '초대장 발송 및 즉시 합류되었습니다.' } };
    },

    updateRole: async (workspaceId: string, targetUserId: string, role: string) => {
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const idx = members.findIndex((m) => m.workspaceId === workspaceId && m.userId === targetUserId);
      if (idx === -1) throw { response: { status: 404 } };
      
      members[idx].role = role;
      setMockStorage('b2b_mock_workspace_members', members);
      return { data: members[idx] };
    },

    kick: async (workspaceId: string, targetUserId: string) => {
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const filtered = members.filter((m) => !(m.workspaceId === workspaceId && m.userId === targetUserId));
      setMockStorage('b2b_mock_workspace_members', filtered);
      return { data: { message: '멤버가 강퇴되었습니다.' } };
    },

    leave: async (workspaceId: string) => {
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const m = members.find((m) => m.workspaceId === workspaceId && m.userId === cu.userId);
      if (m?.role === 'OWNER') {
        throw { response: { status: 400, data: { message: 'OWNER는 워크스페이스를 즉시 나갈 수 없습니다. 방장 이양 후 시도하세요.' } } };
      }
      const filtered = members.filter((m) => !(m.workspaceId === workspaceId && m.userId === cu.userId));
      setMockStorage('b2b_mock_workspace_members', filtered);
      return { data: { message: '탈퇴 성공' } };
    },
    acceptInvite: async (dto: any) => {
      return { data: { message: '모크 초대 수락 성공' } };
    },
  },

  nanos: {
    listRoot: async (workspaceId: string) => {
      const nanos = getMockStorage('b2b_mock_nanos', [] as any[]);
      return { data: nanos.filter((n) => n.workspaceId === workspaceId && n.parentNanoId === null) };
    },

    listChild: async (workspaceId: string, parentNanoId: string) => {
      const nanos = getMockStorage('b2b_mock_nanos', [] as any[]);
      return { data: nanos.filter((n) => n.workspaceId === workspaceId && n.parentNanoId === parentNanoId) };
    },

    getDetail: async (workspaceId: string, nanoId: string) => {
      const nanos = getMockStorage('b2b_mock_nanos', [] as any[]);
      const doc = nanos.find((n) => n.workspaceId === workspaceId && n.id === nanoId);
      if (!doc) throw { response: { status: 404 } };
      return { data: doc };
    },

    create: async (workspaceId: string, dto: any) => {
      const nanos = getMockStorage('b2b_mock_nanos', [] as any[]);
      const newDoc = {
        id: `nano-${Date.now()}`,
        workspaceId,
        title: dto.title || '제목 없음',
        content: dto.content || '',
        parentNanoId: dto.parentNanoId || null,
        order: nanos.length + 1,
        createdAt: new Date().toISOString(),
      };
      nanos.push(newDoc);
      setMockStorage('b2b_mock_nanos', nanos);
      return { data: newDoc };
    },

    update: async (workspaceId: string, nanoId: string, dto: any) => {
      const nanos = getMockStorage('b2b_mock_nanos', [] as any[]);
      const idx = nanos.findIndex((n) => n.workspaceId === workspaceId && n.id === nanoId);
      if (idx === -1) throw { response: { status: 404 } };

      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const members = getMockStorage('b2b_mock_workspace_members', [] as any[]);
      const myMember = members.find((m) => m.workspaceId === workspaceId && m.userId === cu.userId);

      // 일반 멤버가 수정할 시 결재 요청으로 변환
      if (myMember && myMember.role === 'MEMBER') {
        const approvals = getMockStorage('b2b_mock_approval_requests', [] as any[]);
        const newAppr = {
          id: `appr-${Date.now()}`,
          workspaceId,
          nanoId,
          title: `[수정 상신] ${nanos[idx].title} -> ${dto.title || nanos[idx].title}`,
          content: dto.content || '',
          requesterId: cu.userId,
          requesterName: cu.name || '일반 멤버',
          status: 'PENDING',
          opinion: null,
          createdAt: new Date().toISOString(),
        };
        approvals.push(newAppr);
        setMockStorage('b2b_mock_approval_requests', approvals);
        return { data: { message: 'MEMBER 권한으로 수정사항이 결재 대기 상태로 등록되었습니다.', approvalRequest: newAppr } };
      }

      // OWNER/ADMIN은 즉시 갱신
      nanos[idx] = { ...nanos[idx], ...dto };
      setMockStorage('b2b_mock_nanos', nanos);
      return { data: nanos[idx] };
    },

    delete: async (workspaceId: string, nanoId: string) => {
      const nanos = getMockStorage('b2b_mock_nanos', [] as any[]);
      const filtered = nanos.filter((n) => !(n.workspaceId === workspaceId && n.id === nanoId));
      setMockStorage('b2b_mock_nanos', filtered);
      return { data: { message: '문서 삭제 완료' } };
    },
    movePosition: async (workspaceId: string, nanoId: string, dto: any) => {
      return { data: { message: '모크 문서 위치 변경 성공' } };
    },
  },

  workflows: {
    createApproval: async (workspaceId: string, nanoId: string, dto: any) => {
      const approvals = getMockStorage('b2b_mock_approval_requests', [] as any[]);
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const newAppr = {
        id: `appr-${Date.now()}`,
        workspaceId,
        nanoId,
        title: dto.title,
        content: dto.content,
        requesterId: cu.userId,
        requesterName: cu.name,
        status: 'PENDING',
        opinion: null,
        createdAt: new Date().toISOString(),
      };
      approvals.push(newAppr);
      setMockStorage('b2b_mock_approval_requests', approvals);
      return { data: newAppr };
    },

    decide: async (workspaceId: string, approvalRequestId: string, dto: any) => {
      const approvals = getMockStorage('b2b_mock_approval_requests', [] as any[]);
      const idx = approvals.findIndex((a) => a.workspaceId === workspaceId && a.id === approvalRequestId);
      if (idx === -1) throw { response: { status: 404 } };

      approvals[idx].status = dto.decision; // APPROVED or REJECTED
      approvals[idx].opinion = dto.opinion;
      setMockStorage('b2b_mock_approval_requests', approvals);

      // 만약 승인(APPROVED) 이고 결재에 수정 정보가 내재되어 있었다면 문서 본문 갱신
      if (dto.decision === 'APPROVED') {
        const nanos = getMockStorage('b2b_mock_nanos', [] as any[]);
        const nanoIdx = nanos.findIndex((n) => n.id === approvals[idx].nanoId);
        if (nanoIdx !== -1) {
          // [수정 상신] 제목에서 신규 제목 파싱 혹은 content 결합
          const titleMatch = approvals[idx].title.match(/->\s*(.*)$/);
          if (titleMatch && titleMatch[1]) {
            nanos[nanoIdx].title = titleMatch[1];
          }
          nanos[nanoIdx].content = approvals[idx].content;
          setMockStorage('b2b_mock_nanos', nanos);
        }
      }

      return { data: approvals[idx] };
    },

    listOwner: async (workspaceId: string) => {
      const approvals = getMockStorage('b2b_mock_approval_requests', [] as any[]);
      return { data: approvals.filter((a) => a.workspaceId === workspaceId) };
    },

    listMe: async (workspaceId: string) => {
      const approvals = getMockStorage('b2b_mock_approval_requests', [] as any[]);
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return { data: approvals.filter((a) => a.workspaceId === workspaceId && a.requesterId === cu.userId) };
    },

    cancel: async (workspaceId: string, approvalRequestId: string) => {
      const approvals = getMockStorage('b2b_mock_approval_requests', [] as any[]);
      const idx = approvals.findIndex((a) => a.workspaceId === workspaceId && a.id === approvalRequestId);
      if (idx === -1) throw { response: { status: 404 } };
      
      approvals[idx].status = 'CANCELLED';
      setMockStorage('b2b_mock_approval_requests', approvals);
      return { data: approvals[idx] };
    },
  },

  channels: {
    list: async (workspaceId: string) => {
      const rooms = getMockStorage('b2b_mock_chatrooms', [] as any[]);
      return { data: rooms.filter((r) => r.workspaceId === workspaceId) };
    },

    create: async (workspaceId: string, dto: any) => {
      const rooms = getMockStorage('b2b_mock_chatrooms', [] as any[]);
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const newRoom = {
        id: `ch-${Date.now()}`,
        workspaceId,
        name: dto.name,
        isPrivate: dto.isPrivate || false,
        ownerId: cu.userId,
      };
      rooms.push(newRoom);
      setMockStorage('b2b_mock_chatrooms', rooms);
      return { data: newRoom };
    },

    join: async (workspaceId: string, chatroomId: string) => {
      // Mock 환경에서는 단순 참여 성공 반환
      return { data: { message: '채팅방 합류 완료' } };
    },

    leave: async (workspaceId: string, chatroomId: string) => {
      const rooms = getMockStorage('b2b_mock_chatrooms', [] as any[]);
      const filtered = rooms.filter((r) => !(r.workspaceId === workspaceId && r.id === chatroomId));
      setMockStorage('b2b_mock_chatrooms', filtered);
      return { data: { message: '채팅방 퇴장 완료' } };
    },

    messagesList: async (workspaceId: string, chatroomId: string) => {
      const msgs = getMockStorage('b2b_mock_chat_messages', [] as any[]);
      const roomMsgs = msgs.filter((m) => m.chatroomId === chatroomId && !m.isDeleted);
      return { data: roomMsgs };
    },

    postMessage: async (workspaceId: string, chatroomId: string, content: string) => {
      const msgs = getMockStorage('b2b_mock_chat_messages', [] as any[]);
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const newMsg = {
        id: `msg-${Date.now()}`,
        chatroomId,
        senderId: cu.userId,
        senderName: cu.name || '알 수 없음',
        content,
        createdAt: new Date().toISOString(),
        isEdited: false,
        isDeleted: false,
      };
      msgs.push(newMsg);
      setMockStorage('b2b_mock_chat_messages', msgs);
      return { data: newMsg };
    },

    deleteMessage: async (workspaceId: string, messageId: string) => {
      const msgs = getMockStorage('b2b_mock_chat_messages', [] as any[]);
      const idx = msgs.findIndex((m) => m.id === messageId);
      if (idx !== -1) {
        msgs[idx].isDeleted = true;
        setMockStorage('b2b_mock_chat_messages', msgs);
      }
      return { data: { message: '메시지 삭제 성공' } };
    },

    patchMessage: async (workspaceId: string, messageId: string, content: string) => {
      const msgs = getMockStorage('b2b_mock_chat_messages', [] as any[]);
      const idx = msgs.findIndex((m) => m.id === messageId);
      if (idx !== -1) {
        msgs[idx].content = content;
        msgs[idx].isEdited = true;
        setMockStorage('b2b_mock_chat_messages', msgs);
        return { data: msgs[idx] };
      }
      throw { response: { status: 404 } };
    },

    searchMessages: async (workspaceId: string, chatroomId: string, keyword: string) => {
      const msgs = getMockStorage('b2b_mock_chat_messages', [] as any[]);
      const filtered = msgs.filter(
        (m: any) =>
          m.chatroomId === chatroomId &&
          !m.isDeleted &&
          m.content.toLowerCase().includes(keyword.toLowerCase())
      );
      return { data: filtered };
    },
    delegate: async (workspaceId: string, chatroomId: string, dto: any) => {
      return { data: { message: '모크 방장 위임 완료' } };
    },
    read: async (workspaceId: string, chatroomId: string, dto: any) => {
      return { data: { message: '모크 읽음 동기화 완료' } };
    },
  },
};

// 모드 통합 내보내기 (IS_MOCK 여부에 따라 API 동적 연동)
export const apiClient = IS_MOCK
  ? mockApi
  : {
      auth: {
        register: (dto: any) => realApi.post('/auth/register', dto),
        login: (dto: any) => realApi.post('/auth/login', dto),
        logout: () => {
          const rt = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
          return realApi.post('/auth/logout', {}, {
            headers: {
              Authorization: rt ? `Bearer ${rt}` : undefined,
            },
          });
        },
        googleLogin: (dto: any) => realApi.post('/auth/google', dto),
      },
      user: {
        getMe: () => realApi.get('/user/me'),
        deleteMe: () => realApi.delete('/user/me'),
        updateProfile: (dto: any) => realApi.patch('/user/me', dto),
        changePassword: (dto: any) => realApi.patch('/user/password', dto),
        requestEmailChange: (dto: any) => realApi.post('/user/email/request', dto),
        verifyEmailChange: (token: string) => realApi.get(`/user/email/verify?token=${token}`),
        getPreference: () => realApi.get('/user/preference'),
        updatePreference: (dto: any) => realApi.patch('/user/preference', dto),
      },
      workspace: {
        create: (dto: any) => realApi.post('/workspace/create', dto),
        list: () => realApi.get('/workspace/list'),
        getDetail: (workspaceId: string) => realApi.get(`/workspace/${workspaceId}`),
        update: (workspaceId: string, dto: any) => realApi.patch(`/workspace/${workspaceId}`, dto),
        delete: (workspaceId: string) => realApi.delete(`/workspace/${workspaceId}`),
        restore: (workspaceId: string) => realApi.patch(`/workspace/restore/${workspaceId}`),
      },
      members: {
        list: (workspaceId: string) => realApi.get(`/workspace/${workspaceId}/members`),
        invite: (workspaceId: string, email: string) => realApi.post(`/workspace/${workspaceId}/invite`, { email }),
        updateRole: (workspaceId: string, targetUserId: string, role: string) =>
          realApi.patch(`/workspace/${workspaceId}/members/${targetUserId}/role`, { role }),
        kick: (workspaceId: string, targetUserId: string) =>
          realApi.delete(`/workspace/${workspaceId}/members/${targetUserId}`),
        leave: (workspaceId: string) => realApi.delete(`/workspace/${workspaceId}/leave`),
        acceptInvite: (dto: any) => realApi.post('/workspace/invite/accept', dto),
      },
      nanos: {
        listRoot: (workspaceId: string) => realApi.get(`/workspace/${workspaceId}/nanos/root`),
        listChild: (workspaceId: string, parentNanoId: string) =>
          realApi.get(`/workspace/${workspaceId}/nanos/${parentNanoId}/child`),
        getDetail: (workspaceId: string, nanoId: string) => realApi.get(`/workspace/${workspaceId}/nanos/${nanoId}`),
        create: (workspaceId: string, dto: any) => realApi.post(`/workspace/${workspaceId}/create-nano`, dto),
        update: (workspaceId: string, nanoId: string, dto: any) =>
          realApi.patch(`/workspace/${workspaceId}/nanos/${nanoId}`, dto),
        delete: (workspaceId: string, nanoId: string) => realApi.delete(`/workspace/${workspaceId}/nanos/${nanoId}`),
        movePosition: (workspaceId: string, nanoId: string, dto: any) =>
          realApi.patch(`/workspace/${workspaceId}/nanos/${nanoId}/position`, dto),
      },
      workflows: {
        createApproval: (workspaceId: string, nanoId: string, dto: any) =>
          realApi.post(`/workspace/${workspaceId}/nano/${nanoId}/create-approval`, dto),
        decide: (workspaceId: string, approvalRequestId: string, dto: any) =>
          realApi.patch(`/workspace/${workspaceId}/approvals/${approvalRequestId}/decide`, dto),
        listOwner: (workspaceId: string) => realApi.get(`/workspace/${workspaceId}/approvals`),
        listMe: (workspaceId: string) => realApi.get(`/workspace/${workspaceId}/approvals/me`),
        cancel: (workspaceId: string, approvalRequestId: string) =>
          realApi.patch(`/workspace/${workspaceId}/approvals/${approvalRequestId}/cancel`),
      },
      channels: {
        list: (workspaceId: string) => realApi.get(`/workspace/${workspaceId}/chatrooms`),
        create: (workspaceId: string, dto: any) => realApi.post(`/workspace/${workspaceId}/chatrooms`, dto),
        join: (workspaceId: string, chatroomId: string) =>
          realApi.post(`/workspace/${workspaceId}/chatrooms/${chatroomId}/join`),
        leave: (workspaceId: string, chatroomId: string) =>
          realApi.delete(`/workspace/${workspaceId}/channels/${chatroomId}/leave`),
        messagesList: (workspaceId: string, chatroomId: string) =>
          realApi.get(`/workspace/${workspaceId}/channels/${chatroomId}/messages`),
        postMessage: (workspaceId: string, chatroomId: string, content: string) =>
          realApi.post(`/workspace/${workspaceId}/channels/${chatroomId}/messages`, { content }),
        deleteMessage: (workspaceId: string, messageId: string) =>
          realApi.delete(`/workspace/${workspaceId}/messages/${messageId}`),
        patchMessage: (workspaceId: string, messageId: string, content: string) =>
          realApi.patch(`/workspace/${workspaceId}/messages/${messageId}`, { content }),
        searchMessages: (workspaceId: string, chatroomId: string, keyword: string) =>
          realApi.get(`/workspace/${workspaceId}/channels/${chatroomId}/search`, { params: { keyword } }),
        delegate: (workspaceId: string, chatRoomId: string, dto: any) =>
          realApi.patch(`/workspace/${workspaceId}/channels/${chatRoomId}/delegate`, dto),
        read: (workspaceId: string, chatRoomId: string, dto: any) =>
          realApi.patch(`/workspace/${workspaceId}/channels/${chatRoomId}/read`, dto),
      },
    };
