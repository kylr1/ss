import React, { useState } from 'react';
import {
  Users,
  Radio,
  Volume2,
  Hash,
  Copy,
  Check,
  ShieldCheck,
  Trophy,
  Sparkles,
  Edit3,
  Bell,
  Lock
} from 'lucide-react';
import { DiscordServerConfig, ThemeMode } from '../types';
import { DiscordLogo } from './DiscordLogo';
import { DEFAULT_DISCORD_CONFIG } from '../data/defaultData';

interface DiscordSectionProps {
  config: DiscordServerConfig;
  onCopyInvite: (code: string) => void;
  copiedText: string | null;
  onOpenEdit: () => void;
  theme: ThemeMode;
  isUnlocked: boolean;
  onOpenAuth: () => void;
}

export const DiscordSection: React.FC<DiscordSectionProps> = ({
  config,
  onCopyInvite,
  copiedText,
  onOpenEdit,
  theme,
  isUnlocked,
  onOpenAuth,
}) => {
  const safeChannels = Array.isArray(config?.channels) && config.channels.length > 0
    ? config.channels
    : DEFAULT_DISCORD_CONFIG.channels;

  const safeRoles = Array.isArray(config?.roles) && config.roles.length > 0
    ? config.roles
    : DEFAULT_DISCORD_CONFIG.roles;

  const [selectedChannel, setSelectedChannel] = useState<string>(
    safeChannels[0]?.id || '1'
  );
  const [isSimulatingActivity, setIsSimulatingActivity] = useState(false);
  const [onlineCount, setOnlineCount] = useState(config?.onlineMembers || 842);

  const isLight = theme === 'light';
  const isCopied = copiedText === config?.inviteUrl || copiedText === config?.inviteCode;

  const handleSimulatePulse = () => {
    setIsSimulatingActivity(true);
    const delta = Math.floor(Math.random() * 9) - 4;
    setOnlineCount((prev) => Math.max(100, prev + delta));
    setTimeout(() => setIsSimulatingActivity(false), 800);
  };

  return (
    <section id="discord" className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b ${
            isLight ? 'border-blue-100' : 'border-blue-950'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2">
              <DiscordLogo className="w-4 h-4 text-[#5865F2]" />
              <span>خيار سيرفر ديسكورد الرسمي</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              سيرفر ديسكورد KYLR | SAUD
            </h2>
            <p
              className={`text-sm mt-2 max-w-2xl leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {config?.description || DEFAULT_DISCORD_CONFIG.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isUnlocked && (
              <button
                onClick={onOpenEdit}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all active:scale-[0.98] ${
                  isLight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25 border-blue-600'
                    : 'bg-blue-600 text-white hover:bg-blue-500 border-blue-500'
                }`}
                title="تعديل رابط ومعلومات السيرفر"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل هذا القسم ✏️</span>
              </button>
            )}

            <a
              href={config?.inviteUrl || DEFAULT_DISCORD_CONFIG.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-lg shadow-[#5865F2]/25 transition-all"
            >
              <DiscordLogo className="w-4 h-4" />
              <span>الانضمام المباشر</span>
            </a>
          </div>
        </div>

        {/* Discord Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Discord Server Interactive Card (7 cols) */}
          <div
            className={`lg:col-span-7 rounded-2xl border overflow-hidden shadow-2xl ${
              isLight
                ? 'bg-white border-blue-100 shadow-blue-900/5'
                : 'bg-[#050505] border-blue-950 shadow-blue-950/40'
            }`}
          >
            {/* Server Banner Image */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden">
              <img
                src={config?.bannerUrl || DEFAULT_DISCORD_CONFIG.bannerUrl}
                alt={config?.name || 'Discord'}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  isLight
                    ? 'from-white via-white/40 to-transparent'
                    : 'from-[#050505] via-[#050505]/40 to-transparent'
                }`}
              />
              
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>سيرفر رسمي موثق</span>
              </div>
            </div>

            {/* Server Info Header */}
            <div className="p-6 pt-2">
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b ${
                  isLight ? 'border-blue-100' : 'border-blue-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#5865F2] border-2 border-blue-400 flex items-center justify-center font-black text-white text-xl shadow-lg shrink-0">
                    <DiscordLogo className="w-8 h-8" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold tracking-tight ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {config?.name || DEFAULT_DISCORD_CONFIG.name}
                    </h3>
                    <div
                      className={`flex items-center gap-4 text-xs mt-1 ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="tabular-nums font-mono">{onlineCount}</span> متصل الآن
                      </span>
                      <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-slate-700'}>
                        ·
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span className="tabular-nums font-mono">{config?.totalMembers || DEFAULT_DISCORD_CONFIG.totalMembers}</span> إجمالي الأعضاء
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live simulation refresh button */}
                <button
                  onClick={handleSimulatePulse}
                  className={`self-start sm:self-auto text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                    isLight
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-[#0a0a0a] hover:bg-[#151515] text-blue-300 border-blue-950'
                  }`}
                  title="تحديث حالة النشاط الحية"
                >
                  {isSimulatingActivity ? 'جاري التحديث...' : 'تحديث النشاط 🔄'}
                </button>
              </div>

              {/* Announcement Banner */}
              {config?.announcementText && (
                <div
                  className={`mt-4 p-3 rounded-xl border flex items-start gap-2.5 ${
                    isLight
                      ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                      : 'bg-[#090f1d] border-blue-900/40 text-blue-200'
                  }`}
                >
                  <Bell className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">
                    {config.announcementText}
                  </p>
                </div>
              )}

              {/* Channels Preview Simulation */}
              <div className="mt-5 space-y-3">
                <div
                  className={`flex items-center justify-between text-xs font-medium ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  <span>تصفح قنوات ورومات السيرفر</span>
                  <span className="text-[11px] text-slate-500">اختر الروم للمعاينة</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {safeChannels.map((channel) => {
                    const isSelected = selectedChannel === channel.id;
                    const isVoice = channel.type === 'voice';

                    return (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all text-right ${
                          isSelected
                            ? 'bg-blue-600 text-white font-semibold shadow-sm'
                            : isLight
                            ? 'bg-blue-50/50 border border-blue-100 hover:bg-blue-100 text-slate-700'
                            : 'bg-[#0a0a0a] border border-blue-950 hover:bg-[#141414] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isVoice ? (
                            <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <span className="truncate">{channel.name}</span>
                        </div>

                        {isVoice && channel.activeCount && (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono shrink-0">
                            <Radio className="w-3 h-3 animate-pulse" />
                            <span>{channel.activeCount} متحدثين</span>
                          </span>
                        )}

                        {channel.unread && (
                          <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Invite Code & Action Strip */}
              <div
                className={`mt-6 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  isLight ? 'border-blue-100' : 'border-blue-950'
                }`}
              >
                <div
                  className={`flex items-center gap-2 w-full sm:w-auto p-2 rounded-xl border ${
                    isLight
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-[#0a0a0a] border-blue-950'
                  }`}
                >
                  <span
                    className={`text-xs px-1 font-mono dir-ltr truncate ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    discord.gg/{config?.inviteCode || 'RBfG8mYUHQ'}
                  </span>
                  <button
                    onClick={() => onCopyInvite(`https://discord.gg/${config?.inviteCode || 'RBfG8mYUHQ'}`)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      isLight
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-950 hover:bg-blue-900 text-blue-200'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'تم النسخ' : 'نسخ الرابط'}</span>
                  </button>
                </div>

                <a
                  href={config?.inviteUrl || DEFAULT_DISCORD_CONFIG.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition-all shadow-lg shadow-[#5865F2]/30 active:scale-[0.98]"
                >
                  <DiscordLogo className="w-4 h-4" />
                  <span>دخول السيرفر فوراً</span>
                </a>
              </div>
            </div>
          </div>

          {/* Discord Server Features & Roles (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Server Perks Card */}
            <div
              className={`p-6 rounded-2xl border space-y-4 ${
                isLight
                  ? 'bg-white border-blue-100 shadow-blue-900/5'
                  : 'bg-[#050505] border-blue-950 shadow-blue-950/40'
              }`}
            >
              <h3
                className={`text-base font-bold flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>مميزات التواجد في السيرفر</span>
              </h3>

              <div className="space-y-3">
                <div
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isLight
                      ? 'bg-blue-50/50 border-blue-100'
                      : 'bg-[#0a0a0a] border-blue-950'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      بطولات وتحديات شهرية
                    </h4>
                    <p
                      className={`text-xs mt-0.5 ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      جوائز مالية، اشتراكات نايترو، وأكواد شحن مجانية للأعضاء المتفاعلين.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isLight
                      ? 'bg-blue-50/50 border-blue-100'
                      : 'bg-[#0a0a0a] border-blue-950'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-600 shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      رومات صوتية مخصصة وسوالف
                    </h4>
                    <p
                      className={`text-xs mt-0.5 ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      أعلى جودة صوت (High Bitrate) لديوانيات الألعاب وبثوث الشاشات المشتركة.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isLight
                      ? 'bg-blue-50/50 border-blue-100'
                      : 'bg-[#0a0a0a] border-blue-950'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-600 shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      إشعارات المقاطع والبث أولاً بأول
                    </h4>
                    <p
                      className={`text-xs mt-0.5 ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      تنبيهات فورية عند نشر مقطع جديد على تيك توك أو بدء بث مباشر.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Server Roles Preview */}
            <div
              className={`p-6 rounded-2xl border space-y-3 ${
                isLight
                  ? 'bg-white border-blue-100 shadow-blue-900/5'
                  : 'bg-[#050505] border-blue-950 shadow-blue-950/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  رتب وأدوار السيرفر الرسمية
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  {safeRoles.length} رتب رئيسية
                </span>
              </div>

              <div className="space-y-2">
                {safeRoles.map((role) => (
                  <div
                    key={role.name}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                      isLight
                        ? 'bg-blue-50/50 border-blue-100'
                        : 'bg-[#0a0a0a] border-blue-950'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: role.color }}
                      />
                      <span
                        className={`font-semibold ${
                          isLight ? 'text-slate-800' : 'text-slate-200'
                        }`}
                      >
                        {role.name}
                      </span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {role.count} عضو
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
