// apps/web/src/utils/theme.util.ts

/**
 * CSS Variables & Font Theme Utility
 *
 * @description
 * - CSS Theme Variables 동적 변경 및 폰트 테마 관리
 *
 * @author <nobody>
 * @date 2026-08-18
 */

export type ThemePreset = 'light' | 'dark' | 'neon' | 'glassmorphism';
export type FontFamilyOption = 'inter' | 'pretendard' | 'roboto';

export class ThemeUtil {
  static applyTheme(theme: ThemePreset, font: FontFamilyOption): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-font', font);

    // CSS Variables 변경
    switch (theme) {
      case 'dark':
        root.style.setProperty('--bg-primary', '#0f172a');
        root.style.setProperty('--text-primary', '#f8fafc');
        break;
      case 'neon':
        root.style.setProperty('--bg-primary', '#050515');
        root.style.setProperty('--text-primary', '#00ffcc');
        break;
      case 'glassmorphism':
        root.style.setProperty('--bg-primary', 'rgba(255, 255, 255, 0.7)');
        root.style.setProperty('--text-primary', '#1e293b');
        break;
      default:
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--text-primary', '#0f172a');
        break;
    }
  }
}
