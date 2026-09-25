import React from 'react';
import { Moon, Sun, Menu, X, Lock, Unlock } from 'lucide-react';
import { ThemeMode, ActiveTab } from '../types';
import { DiscordLogo } from './DiscordLogo';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  discordInviteUrl: string;
  onlineCount?: number;
  isUnlocked: boolean;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  activeTab,
  onSelectTab,
  discordInviteUrl,
  onlineCount = 842,
  isUnlocked,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'all', label: 'الرئيسية' },
    { id: 'socials', label: 'حساباتي' },
    { id: 'discord', label: 'سيرفر ديسكورد' },
    { id: 'fivem', label: 'FiveM' },
    { id: 'about', label: 'السيت اب و الالعاب' },
  ];

  const handleLinkClick = (id: ActiveTab) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 backdrop-blur-md border-b ${
        isLight
          ? 'bg-white/95 border-blue-100 text-slate-800 shadow-sm'
          : 'bg-[#000000]/95 border-blue-950/80 text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand title wordmark */}
        <button
          onClick={() => handleLinkClick('all')}
          className="text-lg md:text-xl font-black tracking-wider transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span
            className={
              isLight
                ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent'
            }
          >
            KYLR | SAUD
          </span>
        </button>

        {/* Navigation tabs with independent page switching */}
        <nav
          className={`hidden lg:flex items-center gap-3 text-xs sm:text-sm font-semibold p-1 rounded-2xl border ${
            isLight
              ? 'bg-blue-50/70 border-blue-100'
              : 'bg-[#050505] border-blue-950/70'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isLight
                    ? 'text-slate-600 hover:text-blue-700 hover:bg-white/70'
                    : 'text-slate-400 hover:text-white hover:bg-blue-950/30'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme switcher: Sun and Moon icons ONLY (no text) */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl transition-all border ${
              isLight
                ? 'bg-blue-50 hover:bg-blue-100 text-amber-500 border-blue-200 shadow-sm'
                : 'bg-[#0a0a0a] hover:bg-blue-950/60 text-sky-400 border-blue-900/60'
            }`}
            title={isLight ? 'التبديل إلى النمط الغامق' : 'التبديل إلى النمط الفاتح'}
            aria-label="تبديل النمط"
          >
            {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin Lock / Unlock PIN Status button */}
          <button
            onClick={onOpenAuth}
            className={`p-2.5 rounded-xl border transition-all ${
              isUnlocked
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20'
                : isLight
                ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
                : 'bg-[#0a0a0a] border-blue-950 text-slate-400 hover:text-white'
            }`}
            title={isUnlocked ? 'وضع التعديل مفعّل (المالك) - انقر للقفل أو تغيير الرمز' : 'قفل التعديل - انقر لإدخال الرمز السري'}
            aria-label="قفل التعديل"
          >
            {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>

          {/* Discord CTA Action button with official Discord logo */}
          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-md shadow-[#5865F2]/30 transition-all active:scale-[0.98]"
            title={`الانضمام لسيرفر ديسكورد (${onlineCount} متصل)`}
            aria-label="ديسكورد"
          >
            <DiscordLogo className="w-5 h-5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-slate-700 hover:bg-blue-100'
                : 'bg-[#0a0a0a] border-blue-950 text-slate-300 hover:text-white'
            }`}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-4 pt-2 pb-4 space-y-1.5 border-t ${
            isLight
              ? 'bg-white border-blue-100 shadow-xl'
              : 'bg-[#050505] border-blue-950'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === link.id
                  ? 'bg-blue-600 text-white font-bold'
                  : isLight
                  ? 'text-slate-700 hover:bg-blue-50'
                  : 'text-slate-300 hover:bg-blue-950/40'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
