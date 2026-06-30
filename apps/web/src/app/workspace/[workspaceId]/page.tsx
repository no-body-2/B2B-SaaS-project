'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWorkspace } from '../../../context/WorkspaceContext';
import { useAuth } from '../../../context/AuthContext';
import WorkspaceSettings from '../../../components/WorkspaceSettings';
import LumiNanoIcon from '../../../components/LumiNanoIcon';

import NanoEditor from '../../../components/NanoEditor';
import WorkflowPanel from '../../../components/WorkflowPanel';
import ChatPanel from '../../../components/ChatPanel';

import { 
  Building2, FileText, MessageSquare, ShieldCheck, Settings, 
  ChevronLeft, Plus, Folder, Hash, Lock, Loader2 
} from 'lucide-react';

type Tab = 'doc' | 'approval' | 'chat' | 'settings';

export default function WorkspaceDetailView() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { 
    activeWorkspace, 
    nanos, 
    channels, 
    approvals,
    selectWorkspace, 
    createNano,
    createChannel,
    selectNano,
    selectChannel,
    loadingWorkspace 
  } = useWorkspace();

  const workspaceId = params.workspaceId as string;

  const [currentTab, setCurrentTab] = useState<Tab>('doc');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);

  const [newChannelName, setNewChannelName] = useState('');
  const [isPrivateChannel, setIsPrivateChannel] = useState(false);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);

  // 미승인 결재 건수 카운트
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING').length;

  // 비로그인 튕겨내기
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // 워크스페이스 선택 및 정보 동기화
  useEffect(() => {
    if (workspaceId && user) {
      selectWorkspace(workspaceId);
    }
  }, [workspaceId, user]);

  const handleCreateRootDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;
    try {
      await createNano(newDocTitle, '', null);
      setNewDocTitle('');
      setIsCreatingDoc(false);
    } catch (err) {
      alert('문서 생성에 실패했습니다.');
    }
  };

  const handleCreateChatroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName) return;
    try {
      await createChannel(newChannelName, isPrivateChannel);
      setNewChannelName('');
      setIsPrivateChannel(false);
      setIsCreatingChannel(false);
    } catch (err: any) {
      alert(err.response?.data?.message || '채널 생성에 실패했습니다.');
    }
  };

  const clickNano = async (id: string) => {
    await selectNano(id);
    setCurrentTab('doc');
  };

  const clickChannel = async (id: string) => {
    await selectChannel(id);
    setCurrentTab('chat');
  };

  if (authLoading || loadingWorkspace || !activeWorkspace) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-luminano-accent" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">워크스페이스 동기화 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen overflow-hidden bg-background text-foreground">
      
      {/* 좌측 통합 사이드바 */}
      <aside className="w-64 flex flex-col border-r border-luminano-border bg-luminano-point overflow-y-auto h-full max-h-screen">
        
        {/* 상단 로고 및 정보 */}
        <div className="p-4 border-b border-luminano-border flex items-center gap-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-800/40 rounded-md transition cursor-pointer bg-transparent border-0"
            title="대시보드로 돌아가기"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden shrink-0">
            <LumiNanoIcon size={28} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-150 truncate">
              {activeWorkspace.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-450 truncate">
              {user?.name} ({activeWorkspace.role})
            </span>
          </div>
        </div>

        {/* 탭/메뉴 리스트 */}
        <div className="flex-1 p-3 flex flex-col gap-6">
          
          {/* 가. 문서 관리 영역 (Nano) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-2 text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Folder className="w-3.5 h-3.5" />
                협업 문서 (Nanos)
              </span>
              <button
                onClick={() => setIsCreatingDoc(!isCreatingDoc)}
                className="p-1 hover:bg-slate-800/40 rounded-md transition cursor-pointer text-slate-500 hover:text-luminano-accent bg-transparent border-0"
                title="새 문서 추가"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {isCreatingDoc && (
              <form onSubmit={handleCreateRootDoc} className="flex gap-1.5 px-2 mt-1">
                <input
                  type="text"
                  placeholder="새 문서 제목..."
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="flex-1 px-2.5 py-1 border border-luminano-border rounded text-xs bg-background focus:outline-none focus:ring-1 focus:ring-luminano-accent text-foreground"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-1 bg-luminano-accent text-white dark:text-slate-950 font-bold rounded text-[10px] cursor-pointer border-0"
                >
                  등록
                </button>
              </form>
            )}

            <div className="flex flex-col gap-0.5 mt-1.5">
              {nanos.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => clickNano(doc.id)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-left transition cursor-pointer bg-transparent border-0 text-slate-600 hover:bg-slate-800/40 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 실시간 채팅 영역 (Channels) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-2 text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                실시간 채널
              </span>
              <button
                onClick={() => setIsCreatingChannel(!isCreatingChannel)}
                className="p-1 hover:bg-slate-800/40 rounded-md transition cursor-pointer text-slate-500 hover:text-luminano-accent bg-transparent border-0"
                title="새 채널 추가"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {isCreatingChannel && (
              <form onSubmit={handleCreateChatroom} className="flex flex-col gap-1.5 px-2 mt-1 bg-background/50 p-2 rounded border border-luminano-border">
                <input
                  type="text"
                  placeholder="채널명..."
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  className="px-2.5 py-1 border border-luminano-border rounded text-xs bg-background focus:outline-none focus:ring-1 focus:ring-luminano-accent text-foreground"
                  autoFocus
                />
                <label className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400 font-semibold mt-1">
                  <input
                    type="checkbox"
                    checked={isPrivateChannel}
                    onChange={(e) => setIsPrivateChannel(e.target.checked)}
                  />
                  비공개 채널 여부
                </label>
                <button
                  type="submit"
                  className="w-full mt-1.5 py-1 bg-luminano-accent text-white dark:text-slate-950 font-bold rounded text-[10px] cursor-pointer border-0"
                >
                  채널 생성
                </button>
              </form>
            )}

            <div className="flex flex-col gap-0.5 mt-1.5">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => clickChannel(ch.id)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-left transition cursor-pointer bg-transparent border-0 text-slate-600 hover:bg-slate-800/40 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-550"
                >
                  {ch.isPrivate ? (
                    <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <Hash className="w-3.5 h-3.5 text-slate-505 shrink-0" />
                  )}
                  <span className="truncate">{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 결재 프로세스 및 설정 단추 */}
          <div className="flex flex-col gap-1 border-t border-luminano-border pt-4">
            <button
              onClick={() => setCurrentTab('approval')}
              className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                currentTab === 'approval' 
                  ? 'bg-luminano-accent/10 text-luminano-accent border-luminano-accent/30' 
                  : 'text-slate-700 hover:bg-slate-800/40 dark:text-slate-350 bg-transparent border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                결재 워크플로우
              </span>
              {pendingApprovalsCount > 0 && (
                <span className="bg-red-500 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full border-0">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('settings')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                currentTab === 'settings' 
                  ? 'bg-luminano-accent/10 text-luminano-accent border-luminano-accent/30' 
                  : 'text-slate-700 hover:bg-slate-800/40 dark:text-slate-350 bg-transparent border-transparent'
              }`}
            >
              <Settings className="w-4 h-4" />
              멤버 및 초대 관리
            </button>
          </div>

        </div>

      </aside>

      {/* 우측 동적 메인 본문 콘텐츠 */}
      <main className="flex-1 flex flex-col overflow-hidden bg-background h-full max-h-screen">
        
        {currentTab === 'doc' && (
          <NanoEditor />
        )}

        {currentTab === 'approval' && (
          <div className="flex-1 overflow-y-auto p-8">
            <WorkflowPanel />
          </div>
        )}

        {currentTab === 'chat' && (
          <ChatPanel />
        )}

        {currentTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-8">
            <WorkspaceSettings />
          </div>
        )}

      </main>

    </div>
  );
}
