import React from 'react';
import { Copy, Check, Sparkles, Edit3, Gamepad2 } from 'lucide-react';
import { SocialAccount, ThemeMode, ActiveTab, UserProfile, DiscordServerConfig } from '../types';
import { DiscordLogo } from './DiscordLogo';
import { DEFAULT_PROFILE } from '../data/defaultData';

interface HeroProps {
  profile: UserProfile;
  discordConfig?: DiscordServerConfig;
  onSelectTab: (tab: ActiveTab) => void;
  onCopyHandle: (text: string) => void;
  copiedText: string | null;
  socials: SocialAccount[];
  discordInviteUrl: string;
  theme: ThemeMode;
  isUnlocked: boolean;
  onOpenEditProfile: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  discordConfig,
  onSelectTab,
  onCopyHandle,
  copiedText,
  socials,
  discordInviteUrl,
  theme,
  isUnlocked,
  onOpenEditProfile,
}) => {
  const safeProfile = profile ? { ...DEFAULT_PROFILE, ...profile } : DEFAULT_PROFILE;
  const isCopied = copiedText === safeProfile.primaryHandle;
  const isLight = theme === 'light';

  return (
    <section id="hero" className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className={`absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] ${
            isLight ? 'bg-blue-400/15' : 'bg-blue-600/15'
          }`}
        />
        <div
          className={`absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full blur-[120px] ${
            isLight ? 'bg-sky-300/15' : 'bg-indigo-600/10'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with theme frame */}
        <div
          className={`relative rounded-3xl overflow-hidden border shadow-2xl mb-8 ${
            isLight
              ? 'border-blue-100 bg-white shadow-blue-900/5'
              : 'border-blue-950 bg-[#050505] shadow-blue-950/40'
          }`}
        >
          {/* Edit button if unlocked */}
          {isUnlocked && (
            <div className="absolute top-4 left-4 z-20">
              <button
                onClick={onOpenEditProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold shadow-lg backdrop-blur-md transition-all active:scale-[0.98]"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل الواجهة والبروفايل</span>
              </button>
            </div>
          )}

          <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
            <img
              src={safeProfile.bannerUrl || "/src/assets/images/kylr_banner_darkblue_1790325354359.jpg"}
              alt="KYLR SAUD Studio & Gaming Setup"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay for contrast */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                isLight
                  ? 'from-white via-white/50 to-transparent'
                  : 'from-[#000000] via-[#000000]/60 to-transparent'
              }`}
            />
          </div>

          {/* Profile details container positioned over lower banner */}
          <div className="relative px-6 sm:px-10 pb-8 pt-0 -mt-20 sm:-mt-24 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-right">
              {/* Profile Avatar with blue aura ring */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-75 blur group-hover:opacity-100 transition duration-300" />
                <div
                  className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 ${
                    isLight
                      ? 'border-white bg-blue-50'
                      : 'border-[#000000] bg-[#080808]'
                  }`}
                >
                  <img
                    src={safeProfile.avatarUrl || "/src/assets/images/kylr_saud_avatar_1790325338787.jpg"}
                    alt={safeProfile.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Active status indicator */}
                <div
                  className={`absolute bottom-2 left-2 p-1 rounded-full ${
                    isLight ? 'bg-white' : 'bg-[#000000]'
                  }`}
                >
                  <span
                    className={`flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 ${
                      isLight ? 'border-white' : 'border-[#000000]'
                    }`}
                  />
                </div>
              </div>

              {/* Identity & titles */}
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {safeProfile.name}
                  </h1>
                </div>

                {/* Clean unboxed metadata separated by middots with Discord server info */}
                <div
                  className={`flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs sm:text-sm ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  <span className="text-blue-600 font-bold">{safeProfile.tagline}</span>
                  <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-slate-700'}>
                    ·
                  </span>
                  <a
                    href={discordConfig?.inviteUrl || discordInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#5865F2] hover:text-[#4752c4] transition-colors"
                    title={`سيرفر ديسكورد: ${discordConfig?.name || 'KYLR'} (${discordConfig?.onlineMembers || 842} متصل الآن)`}
                  >
                    <DiscordLogo className="w-4 h-4 shrink-0" />
                    <span>{discordConfig?.name || 'سيرفر ديسكورد KYLR | SAUD'} ({discordConfig?.onlineMembers || 842} متصل)</span>
                  </a>
                  <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-slate-700'}>
                    ·
                  </span>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                    {safeProfile.location}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm max-w-xl leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {safeProfile.bio}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={() => onSelectTab('discord')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-xs shadow-xl shadow-[#5865F2]/25 transition-all active:scale-[0.98]"
              >
                <DiscordLogo className="w-4 h-4" />
                <span>سيرفر ديسكورد</span>
              </button>

              <button
                onClick={() => onSelectTab('fivem')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-700/25 transition-all active:scale-[0.98]"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>FiveM</span>
              </button>

              <button
                onClick={() => onSelectTab('socials')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all border ${
                  isLight
                    ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                    : 'bg-[#0a0a0a] hover:bg-blue-950/60 text-slate-200 border-blue-950'
                }`}
              >
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>حساباتي</span>
              </button>

              <button
                onClick={() => onCopyHandle(safeProfile.primaryHandle)}
                className={`p-2.5 rounded-xl transition-all border ${
                  isLight
                    ? 'bg-blue-50 hover:bg-blue-100 text-slate-700 border-blue-200'
                    : 'bg-[#0a0a0a] hover:bg-blue-950/60 text-slate-300 hover:text-white border-blue-950'
                }`}
                title={`نسخ المعرف الموحد ${safeProfile.primaryHandle}`}
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tabs Bar to access individual lists directly */}
        <div
          className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isLight
              ? 'bg-blue-50/60 border-blue-100 text-slate-700'
              : 'bg-[#050505] border-blue-950 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-blue-500">
            <span>القوائم المستقلة:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => onSelectTab('socials')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                isLight
                  ? 'bg-white hover:bg-blue-600 hover:text-white text-slate-800 shadow-sm border border-blue-100'
                  : 'bg-[#0d0d0d] hover:bg-blue-600 hover:text-white text-slate-200 border border-blue-950'
              }`}
            >
              📱 قائمة حساباتي (تيك توك، انستا، سناب)
            </button>
            <button
              onClick={() => onSelectTab('discord')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                isLight
                  ? 'bg-white hover:bg-[#5865F2] hover:text-white text-slate-800 shadow-sm border border-blue-100'
                  : 'bg-[#0d0d0d] hover:bg-[#5865F2] hover:text-white text-slate-200 border border-blue-950'
              }`}
            >
              <DiscordLogo className="w-4 h-4 text-[#5865F2]" />
              <span>قائمة سيرفر ديسكورد</span>
            </button>
            <button
              onClick={() => onSelectTab('about')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                isLight
                  ? 'bg-white hover:bg-blue-600 hover:text-white text-slate-800 shadow-sm border border-blue-100'
                  : 'bg-[#0d0d0d] hover:bg-blue-600 hover:text-white text-slate-200 border border-blue-950'
              }`}
            >
              ⚡ قائمة السيت أب والألعاب
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
