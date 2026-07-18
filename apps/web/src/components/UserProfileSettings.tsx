'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Lock, Mail, Settings, Loader2, Sparkles } from 'lucide-react';

export default function UserProfileSettings() {
  const { user } = useAuth();
  const { setTheme: setThemeContext } = useTheme();

  // 1. 프로필 수정 State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  // 2. 비번 변경 State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');

  // 3. 이메일 요청 State
  const [newEmail, setNewEmail] = useState('');
  const [requestingEmail, setRequestingEmail] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');

  // 4. 환경 설정 State
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('ko');
  const [timezone, setTimezone] = useState('Asia/Seoul');
  const [loadingPref, setLoadingPref] = useState(true);
  const [updatingPref, setUpdatingPref] = useState(false);
  const [prefMsg, setPrefMsg] = useState('');

  // 마운트 시 데이터 로드
  useEffect(() => {
    const loadProfileAndPreferences = async () => {
      try {
        const [profileRes, prefRes] = await Promise.all([
          apiClient.user.getMe(),
          apiClient.user.getPreference()
        ]);
        
        if (profileRes.data) {
          setFirstName(profileRes.data.firstName || '');
          setLastName(profileRes.data.lastName || '');
        }
        
        if (prefRes.data) {
          setTheme(prefRes.data.theme || 'light');
          setLanguage(prefRes.data.language || 'ko');
          setTimezone(prefRes.data.timezone || 'Asia/Seoul');
        }
      } catch (err) {
        console.error('Failed to load user info:', err);
      } finally {
        setLoadingPref(false);
      }
    };

    if (user) {
      loadProfileAndPreferences();
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg('');
    setUpdatingProfile(true);

    try {
      await apiClient.user.updateProfile({ firstName, lastName });
      setProfileMsg('성공적으로 이름을 변경하였습니다. 갱신을 위해 재로그인 하실 수 있습니다.');
    } catch (err: any) {
      const rawMsg = err.response?.data?.message;
      const parsedMsg = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg;
      setProfileMsg(parsedMsg || '프로필 수정에 실패했습니다.');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');

    if (newPassword !== confirmPassword) {
      setPasswordMsg('새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
      return;
    }

    setUpdatingPassword(true);
    try {
      await apiClient.user.changePassword({ currentPassword, newPassword });
      setPasswordMsg('비밀번호가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해주세요.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const rawMsg = err.response?.data?.message;
      const parsedMsg = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg;
      setPasswordMsg(parsedMsg || '비밀번호 변경에 실패했습니다.');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleRequestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg('');
    if (!newEmail) return;

    setRequestingEmail(true);
    try {
      await apiClient.user.requestEmailChange({ newEmail });
      setEmailMsg('이메일 변경 인증 메일이 발송되었습니다. 메일함의 링크를 확인해주세요.');
      setNewEmail('');
    } catch (err: any) {
      const rawMsg = err.response?.data?.message;
      const parsedMsg = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg;
      setEmailMsg(parsedMsg || '이메일 변경 요청에 실패했습니다.');
    } finally {
      setRequestingEmail(false);
    }
  };

  const handleUpdatePreference = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrefMsg('');
    setUpdatingPref(true);

    try {
      await apiClient.user.updatePreference({ theme, language, timezone });
      setPrefMsg('환경 설정 정보가 데이터베이스에 영속화되었습니다.');

      // 로컬 테마와도 즉각 연동 처리
      if (theme === 'dark' || theme === 'light') {
        setThemeContext(theme);
      }
    } catch (err: any) {
      setPrefMsg(err.response?.data?.message || '환경 설정 반영에 실패했습니다.');
    } finally {
      setUpdatingPref(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl w-full mx-auto py-4 text-foreground">
      
      {/* 1. 기본 프로필 설정 */}
      <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-luminano-accent" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">기본 정보 수정</h3>
        </div>
        
        {profileMsg && (
          <div className={`p-2.5 rounded-lg text-xs font-semibold border ${
            profileMsg.includes('성공') 
              ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/50' 
              : 'bg-red-950/20 text-red-400 border-red-900/50'
          }`}>
            {profileMsg}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 col-span-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">성 (Family Name)</label>
            <input
              type="text"
              placeholder="김"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5 col-span-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">이름 (Given Name)</label>
            <input
              type="text"
              placeholder="대포"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={updatingProfile}
              className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border-0"
            >
              {updatingProfile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '프로필 저장'}
            </button>
          </div>
        </form>
      </div>

      {/* 2. 비밀번호 수정 */}
      <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-luminano-accent" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">비밀번호 변경</h3>
        </div>

        {passwordMsg && (
          <div className={`p-2.5 rounded-lg text-xs font-semibold border ${
            passwordMsg.includes('성공') 
              ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/50' 
              : 'bg-red-950/20 text-red-400 border-red-900/50'
          }`}>
            {passwordMsg}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">현재 비밀번호</label>
            <input
              type="password"
              placeholder="현재 계정 암호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">새 비밀번호</label>
            <input
              type="password"
              placeholder="최소 8자 이상의 새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">새 비밀번호 확인</label>
            <input
              type="password"
              placeholder="새 비밀번호 다시 입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updatingPassword}
              className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border-0"
            >
              {updatingPassword ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '비밀번호 업데이트'}
            </button>
          </div>
        </form>
      </div>

      {/* 3. 이메일 주소 변경 */}
      <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-luminano-accent" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">이메일 주소 변경</h3>
        </div>

        {emailMsg && (
          <div className={`p-2.5 rounded-lg text-xs font-semibold border ${
            emailMsg.includes('발송') 
              ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/50' 
              : 'bg-red-950/20 text-red-400 border-red-900/50'
          }`}>
            {emailMsg}
          </div>
        )}

        <form onSubmit={handleRequestEmail} className="flex gap-3">
          <input
            type="email"
            placeholder="new-email@company.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
          />
          <button
            type="submit"
            disabled={requestingEmail}
            className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border-0"
          >
            {requestingEmail ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '변경 링크 발송'}
          </button>
        </form>
      </div>

      {/* 4. 사용자 개인 설정 영속화 */}
      <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-luminano-accent" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">개인 환경설정</h3>
        </div>

        {prefMsg && (
          <div className="p-2.5 bg-emerald-950/20 text-emerald-400 border border-emerald-900/50 rounded-lg text-xs font-semibold">
            {prefMsg}
          </div>
        )}

        {loadingPref ? (
          <div className="flex justify-center p-4">
            <Loader2 className="w-6 h-6 animate-spin text-luminano-accent" />
          </div>
        ) : (
          <form onSubmit={handleUpdatePreference} className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5 col-span-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">기본 테마</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                >
                  <option value="light">라이트 테마 (Light)</option>
                  <option value="dark">다크 테마 (Dark)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 col-span-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">언어 (Language)</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                >
                  <option value="ko">한국어 (Korean)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 col-span-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">타임존 (Timezone)</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                >
                  <option value="Asia/Seoul">Asia/Seoul (GMT+9)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updatingPref}
                className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border-0"
              >
                {updatingPref ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '환경설정 영속화'}
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
