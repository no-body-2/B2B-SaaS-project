import { io } from 'socket.io-client';

const IS_MOCK = process.env.NEXT_PUBLIC_API_MOCK !== 'false';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Mock Socket 시뮬레이터 클래스 (실제 Socket.io 클라이언트 인터페이스 모방)
class MockSocket {
  private callbacks: { [event: string]: Function[] } = {};
  private mockInterval: NodeJS.Timeout | null = null;
  private currentChatroomId: string | null = null;

  connect() {
    console.log('[Mock Socket] Connected to virtual namespace /chat');
    return this;
  }

  disconnect() {
    console.log('[Mock Socket] Disconnected');
    this.stopSimulation();
    return this;
  }

  on(event: string, callback: Function) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
    return this;
  }

  off(event: string, callback?: Function) {
    if (!callback) {
      delete this.callbacks[event];
    } else if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter((cb) => cb !== callback);
    }
    return this;
  }

  emit(event: string, data: any) {
    console.log(`[Mock Socket] Sent event: ${event}`, data);

    if (event === 'joinRoom') {
      this.currentChatroomId = data.chatroomId;
      // 입장 알림 발송 시뮬레이션
      this.trigger('joinedRoomNotice', {
        message: '새로운 사용자가 대화방에 합류했습니다.',
        userId: 'usr-2',
      });
      // 주기적 채팅 유발 시뮬레이션 재시작
      this.startSimulation();
    }
    return this;
  }

  // 가상 이벤트 트리거용 (내부 유틸)
  private trigger(event: string, data: any) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach((cb) => cb(data));
    }
  }

  private startSimulation() {
    this.stopSimulation();

    // 12초마다 가상의 사용자로부터 새 메시지 도착 시뮬레이션
    const mockMessages = [
      '문서 결재 부탁드립니다.',
      '오타 수정 완료했습니다.',
      '혹시 이번주 릴리즈 일정은 어떻게 되나요?',
      '기획서 초안 전송 부탁드립니다.',
      '네 알겠습니다!',
    ];

    this.mockInterval = setInterval(() => {
      if (!this.currentChatroomId) return;

      const randomContent = mockMessages[Math.floor(Math.random() * mockMessages.length)];

      // 메시지 저장소 갱신
      if (typeof window !== 'undefined') {
        const key = 'b2b_mock_chat_messages';
        const msgs = JSON.parse(localStorage.getItem(key) || '[]');
        const newMsg = {
          id: `msg-sim-${Date.now()}`,
          chatroomId: this.currentChatroomId,
          senderId: 'usr-2',
          senderName: '이멤버 (MEMBER)',
          content: randomContent,
          createdAt: new Date().toISOString(),
          isEdited: false,
          isDeleted: false,
        };
        msgs.push(newMsg);
        localStorage.setItem(key, JSON.stringify(msgs));

        // 화면 갱신을 위해 브로드캐스트 이벤트 시뮬레이션 트리거
        this.trigger('newMessage', newMsg);
      }
    }, 12000);
  }

  private stopSimulation() {
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }
}

// 통합 소켓 인스턴스 생성 팩토리
export const getSocket = (token?: string) => {
  if (IS_MOCK) {
    return new MockSocket() as any;
  }

  // 실제 소켓 연결 생성
  return io(`${BASE_URL}/chat`, {
    auth: {
      token: token ? `Bearer ${token}` : undefined,
    },
    transports: ['websocket'],
    autoConnect: false,
  });
};
