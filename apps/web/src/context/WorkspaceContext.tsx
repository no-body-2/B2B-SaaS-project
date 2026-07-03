'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiClient } from '../lib/api';

interface Workspace {
  id: string;
  name: string;
  domain: string;
  role?: string;
  createdAt: string;
  deletedAt: string | null;
}

interface Member {
  userId: string;
  role: string;
  user: {
    name: string;
    email: string;
  };
}

interface Nano {
  id: string;
  workspaceId: string;
  title: string;
  content: string;
  parentNanoId: string | null;
  order: number;
  createdAt: string;
}

interface ApprovalRequest {
  id: string;
  workspaceId: string;
  nanoId: string;
  title: string;
  content: string;
  requesterId: string;
  requesterName: string;
  status: string;
  opinion: string | null;
  createdAt: string;
}

interface Channel {
  id: string;
  name: string;
  isPrivate: boolean;
  ownerId: string;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  members: Member[];
  nanos: Nano[];
  activeNano: Nano | null;
  channels: Channel[];
  activeChannel: Channel | null;
  approvals: ApprovalRequest[];
  loadingWorkspace: boolean;

  fetchWorkspaces: () => Promise<void>;
  selectWorkspace: (workspaceId: string) => Promise<void>;
  createWorkspace: (name: string, domain: string) => Promise<void>;
  updateWorkspaceInfo: (name: string, domain: string) => Promise<void>;
  deleteWorkspace: () => Promise<void>;
  restoreWorkspace: (workspaceId: string) => Promise<void>;
  
  inviteMember: (email: string) => Promise<void>;
  updateMemberRole: (targetUserId: string, role: string) => Promise<void>;
  kickMember: (targetUserId: string) => Promise<void>;
  leaveWorkspace: () => Promise<void>;

  fetchNanos: () => Promise<void>;
  selectNano: (nanoId: string) => Promise<void>;
  createNano: (title: string, content: string, parentNanoId?: string | null) => Promise<void>;
  updateNano: (nanoId: string, title: string, content: string) => Promise<any>;
  deleteNano: (nanoId: string) => Promise<void>;

  fetchApprovals: () => Promise<void>;
  decideApproval: (approvalRequestId: string, decision: 'APPROVED' | 'REJECTED', opinion?: string) => Promise<void>;
  cancelApproval: (approvalRequestId: string) => Promise<void>;

  fetchChannels: () => Promise<void>;
  selectChannel: (channelId: string) => Promise<void>;
  createChannel: (name: string, isPrivate?: boolean) => Promise<void>;
  leaveChannel: (channelId: string) => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [nanos, setNanos] = useState<Nano[]>([]);
  const [activeNano, setActiveNano] = useState<Nano | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [loadingWorkspace, setLoadingWorkspace] = useState(false);

  // 백엔드의 평탄화된 멤버 DTO를 프런트엔드의 중첩된 Member 모델 규격으로 변환하는 헬퍼
  const formatMembers = useCallback((memberList: any[]): Member[] => {
    return memberList.map((m: any) => {
      const nameCombined = m.user?.name || 
        `${m.firstname || m.user?.firstName || ''} ${m.lastname || m.user?.lastName || ''}`.trim() || 
        m.email || 
        'Unknown Member';
      return {
        userId: m.userId,
        role: m.role || 'MEMBER',
        user: {
          name: nameCombined,
          email: m.email || m.user?.email || '',
        }
      };
    });
  }, []);

  // 워크스페이스 목록 조회
  const fetchWorkspaces = useCallback(async () => {
    try {
      const res = await apiClient.workspace.list();
      const listData = Array.isArray(res.data) 
        ? res.data 
        : (res.data?.workspaces || []);
      
      const formatted = listData.map((ws: any) => ({
        ...ws,
        domain: ws.domain || ws.description || ws.name || ''
      }));
      setWorkspaces(formatted);
    } catch (err) {
      console.error('Failed to fetch workspaces:', err);
    }
  }, []);

  // 워크스페이스 세부 데이터 일괄 동기화
  const selectWorkspace = async (workspaceId: string) => {
    setLoadingWorkspace(true);
    try {
      // 1. 워크스페이스 상세 정보 및 내 권한 파악
      const wsRes = await apiClient.workspace.getDetail(workspaceId);
      const formattedWs = {
        ...wsRes.data,
        domain: wsRes.data.domain || wsRes.data.description || wsRes.data.name || ''
      };
      setActiveWorkspace(formattedWs);

      // 2. 멤버 목록 로딩
      const memRes = await apiClient.members.list(workspaceId);
      const memberList = Array.isArray(memRes.data) 
        ? memRes.data 
        : (memRes.data?.members || []);
      setMembers(formatMembers(memberList));

      // 3. 문서(Nano) 최상위 목록 로딩
      const nanoRes = await apiClient.nanos.listRoot(workspaceId);
      const nanoList = Array.isArray(nanoRes.data) 
        ? nanoRes.data 
        : (nanoRes.data?.nanoList || []);
      
      const formattedNanos = nanoList.map((n: any) => ({
        id: n.nanoId || n.id,
        title: n.title,
        type: n.type,
        createdAt: n.createdAt,
        workspaceId,
        content: n.content || '',
        parentNanoId: n.parentNanoId || null,
        order: n.order || 1
      }));
      setNanos(formattedNanos);
      setActiveNano(null);

      // 4. 채팅방 목록 로딩
      const chRes = await apiClient.channels.list(workspaceId);
      const channelList = Array.isArray(chRes.data) 
        ? chRes.data 
        : (chRes.data?.rooms || []);
      
      const formattedChannels = channelList.map((ch: any) => ({
        id: ch.chatroomId || ch.id,
        name: ch.title || ch.name,
        isPrivate: ch.isPrivate,
        ownerId: ch.ownerId || '',
      }));
      setChannels(formattedChannels);
      setActiveChannel(null);

      // 5. 결재 요청 목록 로딩
      const isOwner = wsRes.data.role === 'OWNER';
      const appRes = isOwner 
        ? await apiClient.workflows.listOwner(workspaceId)
        : await apiClient.workflows.listMe(workspaceId);
      const approvalList = Array.isArray(appRes.data) 
        ? appRes.data 
        : (appRes.data?.items || []);

      const formattedApprovals = approvalList.map((ap: any) => ({
        id: ap.approvalRequestId || ap.id,
        workspaceId,
        nanoId: ap.nanoId,
        title: ap.title,
        content: ap.content || '',
        requesterId: ap.requesterId || '',
        requesterName: ap.requesterName || 'Unknown',
        status: ap.status,
        opinion: ap.opinion || null,
        createdAt: ap.createdAt,
      }));
      setApprovals(formattedApprovals);

    } catch (err) {
      console.error('Failed to load workspace data details:', err);
      setActiveWorkspace(null);
    } finally {
      setLoadingWorkspace(false);
    }
  };

  const createWorkspace = async (name: string, domain: string) => {
    try {
      await apiClient.workspace.create({ name, description: domain });
      await fetchWorkspaces();
    } catch (err) {
      console.error('Create workspace failed:', err);
      throw err;
    }
  };

  const updateWorkspaceInfo = async (name: string, domain: string) => {
    if (!activeWorkspace) return;
    try {
      const res = await apiClient.workspace.update(activeWorkspace.id, { name, description: domain });
      const formattedRes = {
        ...res.data,
        domain: res.data.domain || res.data.description || res.data.name || ''
      };
      setActiveWorkspace((prev) => (prev ? { ...prev, ...formattedRes } : null));
      await fetchWorkspaces();
    } catch (err) {
      console.error('Update workspace failed:', err);
      throw err;
    }
  };

  const deleteWorkspace = async () => {
    if (!activeWorkspace) return;
    try {
      await apiClient.workspace.delete(activeWorkspace.id);
      setActiveWorkspace(null);
      await fetchWorkspaces();
    } catch (err) {
      console.error('Delete workspace failed:', err);
      throw err;
    }
  };

  const restoreWorkspace = async (workspaceId: string) => {
    try {
      await apiClient.workspace.restore(workspaceId);
      await fetchWorkspaces();
    } catch (err) {
      console.error('Restore workspace failed:', err);
      throw err;
    }
  };

  // 멤버 관리
  const inviteMember = async (email: string) => {
    if (!activeWorkspace) return;
    try {
      await apiClient.members.invite(activeWorkspace.id, email);
      const memRes = await apiClient.members.list(activeWorkspace.id);
      const memberList = Array.isArray(memRes.data) ? memRes.data : (memRes.data?.members || []);
      setMembers(formatMembers(memberList));
    } catch (err) {
      console.error('Failed to invite member:', err);
      throw err;
    }
  };

  const updateMemberRole = async (targetUserId: string, role: string) => {
    if (!activeWorkspace) return;
    try {
      await apiClient.members.updateRole(activeWorkspace.id, targetUserId, role);
      const memRes = await apiClient.members.list(activeWorkspace.id);
      const memberList = Array.isArray(memRes.data) ? memRes.data : (memRes.data?.members || []);
      setMembers(formatMembers(memberList));
    } catch (err) {
      console.error('Failed to update member role:', err);
      throw err;
    }
  };

  const kickMember = async (targetUserId: string) => {
    if (!activeWorkspace) return;
    try {
      await apiClient.members.kick(activeWorkspace.id, targetUserId);
      const memRes = await apiClient.members.list(activeWorkspace.id);
      const memberList = Array.isArray(memRes.data) ? memRes.data : (memRes.data?.members || []);
      setMembers(formatMembers(memberList));
    } catch (err) {
      console.error('Failed to kick member:', err);
      throw err;
    }
  };

  const leaveWorkspace = async () => {
    if (!activeWorkspace) return;
    try {
      await apiClient.members.leave(activeWorkspace.id);
      setActiveWorkspace(null);
      await fetchWorkspaces();
    } catch (err) {
      console.error('Failed to leave workspace:', err);
      throw err;
    }
  };

  // 문서 (Nano) 관리
  const fetchNanos = async () => {
    if (!activeWorkspace) return;
    try {
      const nanoRes = await apiClient.nanos.listRoot(activeWorkspace.id);
      const nanoList = Array.isArray(nanoRes.data) 
        ? nanoRes.data 
        : (nanoRes.data?.nanoList || []);
      
      const formattedNanos = nanoList.map((n: any) => ({
        id: n.nanoId || n.id,
        title: n.title,
        type: n.type,
        createdAt: n.createdAt,
        workspaceId: activeWorkspace.id,
        content: n.content || '',
        parentNanoId: n.parentNanoId || null,
        order: n.order || 1
      }));
      setNanos(formattedNanos);
    } catch (err) {
      console.error('Failed to fetch nanos:', err);
    }
  };

  const selectNano = async (nanoId: string) => {
    if (!activeWorkspace) return;
    try {
      const res = await apiClient.nanos.getDetail(activeWorkspace.id, nanoId);
      const raw = res.data;
      const formatted = {
        ...raw,
        id: raw.nanoId || raw.id,
        content: typeof raw.content === 'object' ? (raw.content?.markdown || '') : (raw.content || '')
      };
      setActiveNano(formatted);
    } catch (err) {
      console.error('Failed to get nano detail:', err);
    }
  };

  const createNano = async (title: string, content: string, parentNanoId: string | null = null) => {
    if (!activeWorkspace) return;
    try {
      const contentPayload = { blockStyle: 'default', markdown: content || '' };
      await apiClient.nanos.create(activeWorkspace.id, { 
        title, 
        type: 'PAGE',
        content: contentPayload, 
        parentNanoId: parentNanoId || undefined 
      });
      await fetchNanos();
    } catch (err) {
      console.error('Failed to create nano:', err);
      throw err;
    }
  };

  const updateNano = async (nanoId: string, title: string, content: string) => {
    if (!activeWorkspace) return;
    try {
      const contentPayload = { blockStyle: 'default', markdown: content || '' };
      const res = await apiClient.nanos.update(activeWorkspace.id, nanoId, { title, content: contentPayload });
      
      // 만약 일반 멤버인 경우, 수정본은 결재 상신되었으므로 로컬 리스트 갱신 후 리턴 알림
      if (activeWorkspace.role === 'MEMBER') {
        await fetchApprovals();
        return res.data; // { message, approvalRequest }
      }

      // OWNER/ADMIN일 경우 바로 로컬 문서 상태 갱신
      const raw = res.data;
      const formatted = {
        id: raw.nanoId || raw.id || nanoId,
        title: raw.title || title,
        content: typeof raw.content === 'object' ? (raw.content?.markdown || '') : (raw.content || ''),
        workspaceId: activeWorkspace.id,
        parentNanoId: activeNano?.parentNanoId || null,
        order: activeNano?.order || 1,
        createdAt: activeNano?.createdAt || new Date().toISOString()
      };
      setActiveNano(formatted);
      await fetchNanos();
      return res.data;
    } catch (err) {
      console.error('Failed to update nano:', err);
      throw err;
    }
  };

  const deleteNano = async (nanoId: string) => {
    if (!activeWorkspace) return;
    try {
      await apiClient.nanos.delete(activeWorkspace.id, nanoId);
      setActiveNano(null);
      await fetchNanos();
    } catch (err) {
      console.error('Failed to delete nano:', err);
      throw err;
    }
  };

  // 결재 (Workflow) 관리
  const fetchApprovals = async () => {
    if (!activeWorkspace) return;
    try {
      const isOwner = activeWorkspace.role === 'OWNER';
      const res = isOwner 
        ? await apiClient.workflows.listOwner(activeWorkspace.id)
        : await apiClient.workflows.listMe(activeWorkspace.id);
      const approvalList = Array.isArray(res.data) ? res.data : (res.data?.items || []);
      const formattedApprovals = approvalList.map((ap: any) => ({
        id: ap.approvalRequestId || ap.id,
        workspaceId: activeWorkspace.id,
        nanoId: ap.nanoId,
        title: ap.title,
        content: ap.content || '',
        requesterId: ap.requesterId || '',
        requesterName: ap.requesterName || 'Unknown',
        status: ap.status,
        opinion: ap.opinion || null,
        createdAt: ap.createdAt,
      }));
      setApprovals(formattedApprovals);
    } catch (err) {
      console.error('Failed to fetch approvals:', err);
    }
  };

  const decideApproval = async (approvalRequestId: string, decision: 'APPROVED' | 'REJECTED', opinion?: string) => {
    if (!activeWorkspace) return;
    try {
      const statusMap: Record<string, string> = {
        APPROVED: 'APPROVE',
        REJECTED: 'REJECT'
      };
      await apiClient.workflows.decide(activeWorkspace.id, approvalRequestId, { 
        status: statusMap[decision] || 'APPROVE', 
        comment: opinion || '결재 의견을 승인 처리합니다.' 
      });
      await fetchApprovals();
      await fetchNanos(); // 결재 통과 시 문서 내용이 바뀌므로 동기화
      if (activeNano && approvals.find((a) => a.id === approvalRequestId)?.nanoId === activeNano.id) {
        await selectNano(activeNano.id);
      }
    } catch (err) {
      console.error('Failed to decide approval request:', err);
      throw err;
    }
  };

  const cancelApproval = async (approvalRequestId: string) => {
    if (!activeWorkspace) return;
    try {
      await apiClient.workflows.cancel(activeWorkspace.id, approvalRequestId);
      await fetchApprovals();
    } catch (err) {
      console.error('Failed to cancel approval request:', err);
      throw err;
    }
  };

  // 채널 (채팅방) 관리
  const fetchChannels = async () => {
    if (!activeWorkspace) return;
    try {
      const res = await apiClient.channels.list(activeWorkspace.id);
      const channelList = Array.isArray(res.data) 
        ? res.data 
        : (res.data?.rooms || []);
      
      const formattedChannels = channelList.map((ch: any) => ({
        id: ch.chatroomId || ch.id,
        name: ch.title || ch.name,
        isPrivate: ch.isPrivate,
        ownerId: ch.ownerId || '',
      }));
      setChannels(formattedChannels);
    } catch (err) {
      console.error('Failed to fetch channels:', err);
    }
  };

  const selectChannel = async (channelId: string) => {
    if (!activeWorkspace) return;
    try {
      const target = channels.find((c) => c.id === channelId) || null;
      if (target) {
        await apiClient.channels.join(activeWorkspace.id, channelId);
        setActiveChannel(target);
      }
    } catch (err) {
      console.error('Failed to select channel:', err);
    }
  };

  const createChannel = async (name: string, isPrivate: boolean = false) => {
    if (!activeWorkspace) return;
    try {
      await apiClient.channels.create(activeWorkspace.id, { title: name, isPrivate });
      await fetchChannels();
    } catch (err) {
      console.error('Failed to create channel:', err);
      throw err;
    }
  };

  const leaveChannel = async (channelId: string) => {
    if (!activeWorkspace) return;
    try {
      await apiClient.channels.leave(activeWorkspace.id, channelId);
      setActiveChannel(null);
      await fetchChannels();
    } catch (err) {
      console.error('Failed to leave channel:', err);
      throw err;
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        members,
        nanos,
        activeNano,
        channels,
        activeChannel,
        approvals,
        loadingWorkspace,
        fetchWorkspaces,
        selectWorkspace,
        createWorkspace,
        updateWorkspaceInfo,
        deleteWorkspace,
        restoreWorkspace,
        inviteMember,
        updateMemberRole,
        kickMember,
        leaveWorkspace,
        fetchNanos,
        selectNano,
        createNano,
        updateNano,
        deleteNano,
        fetchApprovals,
        decideApproval,
        cancelApproval,
        fetchChannels,
        selectChannel,
        createChannel,
        leaveChannel,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
