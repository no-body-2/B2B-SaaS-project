'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../lib/socket';
import { apiClient } from '../lib/api';
import { 
  MessageSquare, Send, Search, Trash2, Edit2, Check, X, 
  Hash, Lock, LogOut, ArrowLeft, Loader2, Users, Crown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  chatroomId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isEdited: boolean;
  isDeleted: boolean;
}

export default function ChatPanel() {
  const { user } = useAuth();
  const { activeWorkspace, activeChannel, leaveChannel, members, selectWorkspace } = useWorkspace();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // 메시지 수정 상태
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  // 메시지 검색 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searching, setSearching] = useState(false);

  // 방장 위임 팝오버 상태
  const [showDelegateModal, setShowDelegateModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  // 스크롤 하단 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 초기 메시지 데이터 로드 및 소켓 이벤트 바인딩
  useEffect(() => {
    if (!activeWorkspace || !activeChannel) return;

    setLoading(true);
    setMessages([]);
    setShowSearch(false);
    setSearchQuery('');

    // 과거 대화 목록 로드
    const loadHistory = async () => {
      try {
        const res = await apiClient.channels.messagesList(activeWorkspace.id, activeChannel.id);
        const list = Array.isArray(res.data) ? res.data : (res.data?.items || []);
        
        // messageId를 id로 맵핑하고, members에서 senderName 조회
        const formatted = list.map((m: any) => {
          const sender = members.find((mem) => mem.userId === m.senderId);
          return {
            id: m.messageId || m.id,
            chatroomId: m.chatroomId,
            senderId: m.senderId,
            senderName: sender?.user?.name || m.senderName || '알 수 없음',
            content: m.content || '',
            createdAt: m.createdAt,
            isEdited: m.isEdited ?? false,
            isDeleted: m.isDeleted ?? false,
          };
        });
        setMessages(formatted);
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error('Failed to load chat history:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();

    // 소켓 초기화 및 연결
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';
    const socket = getSocket(token);
    socketRef.current = socket;

    socket.connect();
    socket.emit('joinRoom', { chatroomId: activeChannel.id });

    // 실시간 신규 메시지 청취
    socket.on('newMessage', (newMsg: ChatMessage) => {
      if (newMsg.chatroomId === activeChannel.id) {
        const sender = members.find((mem) => mem.userId === newMsg.senderId);
        const formattedMsg = {
          ...newMsg,
          id: newMsg.id || (newMsg as any).messageId,
          senderName: sender?.user?.name || newMsg.senderName || '알 수 없음'
        };
        setMessages((prev) => {
          if (prev.some((m) => m.id === formattedMsg.id)) return prev;
          return [...prev, formattedMsg];
        });
        setTimeout(scrollToBottom, 50);
      }
    });

    // 실시간 메시지 수정 청취
    socket.on('updateMessage', (updatedMsg: ChatMessage) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === updatedMsg.id ? { ...m, content: updatedMsg.content, isEdited: true } : m))
      );
    });

    // 실시간 메시지 삭제 청취
    socket.on('deleteMessage', (deletedMsg: { id: string }) => {
      setMessages((prev) => prev.filter((m) => m.id !== deletedMsg.id));
    });

    return () => {
      socket.off('newMessage');
      socket.off('updateMessage');
      socket.off('deleteMessage');
      socket.disconnect();
    };
  }, [activeWorkspace, activeChannel, members]);

  // 2. 메시지 전송
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !activeWorkspace || !activeChannel) return;

    const payloadText = text;
    setText('');

    try {
      const res = await apiClient.channels.postMessage(activeWorkspace.id, activeChannel.id, payloadText);
      const rawMsg = res.data;
      const sender = members.find((mem) => mem.userId === rawMsg.senderId);
      const formatted = {
        id: rawMsg.messageId || rawMsg.id,
        chatroomId: rawMsg.chatroomId,
        senderId: rawMsg.senderId,
        senderName: sender?.user?.name || rawMsg.senderName || '나',
        content: rawMsg.content,
        createdAt: rawMsg.createdAt,
        isEdited: rawMsg.isEdited ?? false,
        isDeleted: rawMsg.isDeleted ?? false,
      };
      setMessages((prev) => [...prev, formatted]);
      setTimeout(scrollToBottom, 50);

      if (process.env.NEXT_PUBLIC_API_MOCK !== 'false' && socketRef.current) {
        socketRef.current.trigger?.('newMessage', formatted);
      }
    } catch (err) {
      alert('메시지 전송에 실패했습니다.');
    }
  };

  // 3. 메시지 수정 처리
  const saveEdit = async (messageId: string) => {
    if (!editingText.trim() || !activeWorkspace) return;
    try {
      if (process.env.NEXT_PUBLIC_API_MOCK !== 'false') {
        const key = 'b2b_mock_chat_messages';
        const msgs = JSON.parse(localStorage.getItem(key) || '[]');
        const idx = msgs.findIndex((m: any) => m.id === messageId);
        if (idx !== -1) {
          msgs[idx].content = editingText;
          msgs[idx].isEdited = true;
          localStorage.setItem(key, JSON.stringify(msgs));
          socketRef.current?.trigger?.('updateMessage', msgs[idx]);
        }
      } else {
        await apiClient.channels.patchMessage(activeWorkspace.id, messageId, editingText);
      }
      
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, content: editingText, isEdited: true } : m))
      );
      setEditingMsgId(null);
    } catch (err) {
      alert('메시지 수정에 실패했습니다.');
    }
  };

  // 4. 메시지 삭제 처리
  const handleDeleteMessage = async (messageId: string) => {
    if (!activeWorkspace || !confirm('이 메시지를 삭제하시겠습니까?')) return;
    try {
      await apiClient.channels.deleteMessage(activeWorkspace.id, messageId);
      setMessages((prev) => prev.filter((m) => m.id !== messageId));

      if (process.env.NEXT_PUBLIC_API_MOCK !== 'false' && socketRef.current) {
        socketRef.current?.trigger?.('deleteMessage', { id: messageId });
      }
    } catch (err) {
      alert('메시지 삭제에 실패했습니다.');
    }
  };

  // 5. 키워드 검색 기능
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !activeWorkspace || !activeChannel) return;

    setSearching(true);
    try {
      if (process.env.NEXT_PUBLIC_API_MOCK !== 'false') {
        const key = 'b2b_mock_chat_messages';
        const allMsgs = JSON.parse(localStorage.getItem(key) || '[]');
        const filtered = allMsgs.filter(
          (m: any) =>
            m.chatroomId === activeChannel.id &&
            !m.isDeleted &&
            m.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        const res = await apiClient.channels.searchMessages(
          activeWorkspace.id,
          activeChannel.id,
          searchQuery
        );
        setSearchResults(res.data);
      }
      setShowSearch(true);
    } catch (err) {
      alert('검색 도중 실패했습니다.');
    } finally {
      setSearching(false);
    }
  };

  const handleLeaveChannel = async () => {
    if (!activeWorkspace || !activeChannel) return;
    if (confirm(`'# ${activeChannel.name}' 채널에서 퇴장하시겠습니까?`)) {
      try {
        await leaveChannel(activeChannel.id);
      } catch (err) {
        alert('채널 퇴장에 실패했습니다.');
      }
    }
  };

  const handleDelegate = async (targetUserId: string) => {
    if (!activeWorkspace || !activeChannel) return;
    try {
      await apiClient.channels.delegate(activeWorkspace.id, activeChannel.id, {
        targetUserId,
      });
      alert('방장 권한을 성공적으로 위임했습니다.');
      setShowDelegateModal(false);
      await selectWorkspace(activeWorkspace.id);
    } catch (err: any) {
      alert(err.response?.data?.message || '방장 위임 처리에 실패했습니다.');
    }
  };

  if (!activeChannel) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <MessageSquare className="w-12 h-12 text-slate-500 mb-3" />
        <h3 className="text-slate-800 dark:text-slate-300 font-bold text-base">선택된 채널이 없습니다</h3>
        <p className="text-slate-600 dark:text-slate-500 text-xs mt-1">좌측 사이드바에서 실시간 채팅방을 선택해 참가하세요.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-luminano-point border-l border-luminano-border">
      
      {/* 메인 채팅 패널 (왼쪽 영역) */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* 상단 채널 헤더 바 */}
        <div className="p-4 border-b border-luminano-border flex justify-between items-center shadow-xs bg-luminano-point z-10">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800 dark:text-slate-100">
            {activeChannel.isPrivate ? (
              <Lock className="w-4 h-4 text-amber-500 shrink-0" />
            ) : (
              <Hash className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>{activeChannel.name}</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* 검색 폼 */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
              <input
                type="text"
                placeholder="대화 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-8 py-1.5 border border-luminano-border rounded-lg text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-luminano-accent w-44"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-500 hover:text-luminano-accent cursor-pointer bg-transparent border-0"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {activeChannel.ownerId === user?.id && (
              <button
                onClick={() => setShowDelegateModal(!showDelegateModal)}
                className={`p-1.5 text-slate-400 hover:text-luminano-accent rounded-md hover:bg-slate-800 transition cursor-pointer border border-transparent bg-transparent flex items-center gap-1 text-[11px] font-bold ${
                  showDelegateModal ? 'text-luminano-accent bg-slate-800/60' : ''
                }`}
                title="방장 권한 위임"
              >
                <Crown className="w-3.5 h-3.5" />
                위임
              </button>
            )}

            <button
              onClick={handleLeaveChannel}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-800 transition cursor-pointer border border-transparent bg-transparent flex items-center gap-1 text-[11px] font-bold"
              title="채널 퇴장"
            >
              <LogOut className="w-3.5 h-3.5" />
              나가기
            </button>
          </div>
        </div>

        {/* 방장 위임 팝오버 */}
        {showDelegateModal && (
          <div className="absolute top-14 right-4 bg-luminano-point border border-luminano-border rounded-xl shadow-xl p-4 z-50 w-72 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-luminano-border pb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                방장 권한 위임하기
              </span>
              <button
                onClick={() => setShowDelegateModal(false)}
                className="text-slate-500 hover:text-slate-100 cursor-pointer bg-transparent border-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[10px] text-slate-500">
              아래 워크스페이스 멤버 중 새로운 채널 방장으로 지정할 멤버를 선택하세요.
            </p>

            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
              {members
                .filter((m) => m.userId !== user?.id)
                .map((m) => (
                  <button
                    key={m.userId}
                    onClick={() => handleDelegate(m.userId)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-800/60 rounded-lg transition cursor-pointer text-left bg-transparent border-0"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {m.user?.name || m.user?.email || '이름 없음'}
                      </span>
                      <span className="text-[9px] text-slate-500">{m.user?.email}</span>
                    </div>
                    <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono capitalize">
                      {m.role.toLowerCase()}
                    </span>
                  </button>
                ))}
              {members.filter((m) => m.userId !== user?.id).length === 0 && (
                <span className="text-center py-4 text-[10px] text-slate-500">
                  위임 가능한 다른 멤버가 없습니다.
                </span>
              )}
            </div>
          </div>
        )}

        {/* 메시지 리스트 스크롤러 */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-background h-[calc(100vh-130px)] max-h-[calc(100vh-130px)] min-h-0">
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin text-luminano-accent" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <MessageSquare className="w-10 h-10 text-slate-500 mb-2" />
              <span className="text-xs text-slate-600 dark:text-slate-500">대화방에 참여했습니다. 첫 메시지를 보내보세요!</span>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === user?.id;
              const isEditing = editingMsgId === msg.id;

              return (
                <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {msg.senderName.charAt(0)}
                    </div>
                  )}

                  {/* 메시지 바디 */}
                  <div className="flex flex-col gap-1">
                    
                    {/* 발송 정보 */}
                    <div className={`flex items-center gap-2 text-[10px] text-slate-655 dark:text-slate-500 ${isMe ? 'justify-end' : ''}`}>
                      <span className="font-bold text-slate-700 dark:text-slate-400">{msg.senderName}</span>
                      <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {msg.isEdited && <span className="text-slate-600 dark:text-slate-500 font-semibold">(수정됨)</span>}
                    </div>

                    {/* 대화 내용 풍선 */}
                    <div className={`group relative p-3 rounded-2xl text-xs leading-relaxed shadow-3xs ${
                      isMe 
                        ? 'bg-luminano-accent text-white dark:text-slate-950 font-bold rounded-tr-none' 
                        : 'bg-luminano-point border border-luminano-border rounded-tl-none text-slate-800 dark:text-slate-200'
                    }`}>
                      {isEditing ? (
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full px-2 py-1 text-slate-800 dark:text-slate-200 bg-background border border-luminano-border rounded text-xs focus:outline-none"
                            autoFocus
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setEditingMsgId(null)}
                              className="p-1 hover:bg-slate-800/40 rounded text-[10px] text-slate-600 dark:text-slate-450 font-bold bg-transparent border-0 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => saveEdit(msg.id)}
                              className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold border-0 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span>{msg.content}</span>
                      )}

                      {/* 마우스 오버 시 수정/삭제 메뉴 노출 (작성자 본인 전용) */}
                      {isMe && !isEditing && (
                        <div className="absolute top-1/2 -translate-y-1/2 -left-12 hidden group-hover:flex items-center gap-1 bg-luminano-point border border-luminano-border rounded-md p-1 shadow-md">
                          <button
                            onClick={() => {
                              setEditingMsgId(msg.id);
                              setEditingText(msg.content);
                            }}
                            className="p-1 hover:bg-slate-800/40 text-slate-500 hover:text-luminano-accent rounded border-0 cursor-pointer bg-transparent"
                            title="수정"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 hover:bg-slate-800/40 text-slate-500 hover:text-red-400 rounded border-0 cursor-pointer bg-transparent"
                            title="삭제"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 하단 입력 폼 */}
        <form onSubmit={handleSend} className="p-4 border-t border-luminano-border flex gap-3 bg-luminano-point z-10 shadow-lg">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-luminano-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="p-2.5 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-white dark:text-slate-950 font-bold rounded-xl transition shadow-md shadow-luminano-accent/10 cursor-pointer flex items-center justify-center shrink-0 border-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* 우측 검색 서랍 패널 (키워드 매칭 시 활성화) */}
      {showSearch && (
        <div className="w-80 border-l border-luminano-border flex flex-col bg-luminano-point">
          <div className="p-4 border-b border-luminano-border flex justify-between items-center bg-background/50">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-luminano-accent" />
              검색 결과 ({searchResults.length})
            </span>
            <button
              onClick={() => setShowSearch(false)}
              className="p-1 hover:bg-slate-800/40 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 rounded-md transition cursor-pointer border-0 bg-transparent font-bold text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {searching ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-5 h-5 animate-spin text-luminano-accent" />
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-10 text-slate-600 dark:text-slate-500 text-xs font-medium">
                일치하는 메시지가 존재하지 않습니다.
              </div>
            ) : (
              searchResults.map((res) => (
                <div 
                  key={res.id} 
                  className="p-3 border border-luminano-border rounded-lg hover:bg-slate-800/40 transition flex flex-col gap-1.5"
                >
                  <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-500 font-semibold">
                    <span>{res.senderName}</span>
                    <span>{new Date(res.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {res.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
