import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Edit3,
  Video,
  Instagram,
  Ghost,
  Sparkles,
  Share2,
  Lock
} from 'lucide-react';
import { SocialAccount, ThemeMode } from '../types';
import { DiscordLogo } from './DiscordLogo';
import { DEFAULT_SOCIALS } from '../data/defaultData';

interface SocialsSectionProps {
  socials: SocialAccount[];
  onCopyHandle: (text: string) => void;
  copiedText: string | null;
  onOpenQr: (account: SocialAccount) => void;
  onOpenEdit: () => void;
  theme: ThemeMode;
  isUnlocked: boolean;
  onOpenAuth: () => void;
}

export const SocialsSection: React.FC<SocialsSectionProps> = ({
  socials,
  onCopyHandle,
  copiedText,
  onOpenQr,
  onOpenEdit,
  theme,
  isUnlocked,
  onOpenAuth,
}) => {
  const safeSocials = Array.isArray(socials) && socials.length > 0 ? socials : DEFAULT_SOCIALS;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const isLight = theme === 'light';

  const filteredSocials =
    activeFilter === 'all'
      ? safeSocials
      : safeSocials.filter((s) => s.id === activeFilter || s.name.toLowerCase().includes(activeFilter));

  const getPlatformIcon = (acc: SocialAccount) => {
    const id = acc.id.toLowerCase();
    if (id.includes('tiktok')) return <Video className="w-5 h-5 text-cyan-400" />;
    if (id.includes('instagram')) return <Instagram className="w-5 h-5 text-rose-500" />;
    if (id.includes('snapchat')) return <Ghost className="w-5 h-5 text-amber-400" />;
    if (id.includes('discord')) return <DiscordLogo className="w-5 h-5 text-[#5865F2]" />;
    return <Share2 className="w-5 h-5 text-blue-500" />;
  };

  return (
    <section
      id="socials"
      className={`py-12 md:py-20 relative transition-colors duration-200 ${
        isLight ? 'bg-slate-50/50' : 'bg-[#020202]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b ${
            isLight ? 'border-blue-100' : 'border-blue-950'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>الحسابات الرسمية المعتمدة</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              حساباتي
            </h2>
            <p
              className={`text-sm mt-2 max-w-2xl leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              تابع حساباتي الرسمية المعتمدة لتكون أول من يشاهد المقاطع واليوميات والفعاليات والبثوث أولاً بأول.
            </p>
          </div>

          {/* Action to edit links (only shown when lock is unlocked) */}
          {isUnlocked && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenEdit}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border transition-all active:scale-[0.98] ${
                  isLight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25 border-blue-600'
                    : 'bg-blue-600 text-white hover:bg-blue-500 border-blue-500'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>تعديل هذا القسم ✏️</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : isLight
                ? 'bg-white text-slate-600 hover:text-blue-600 border border-blue-100 shadow-sm'
                : 'bg-[#080808] text-slate-400 hover:text-white border border-blue-950'
            }`}
          >
            جميع المنصات ({socials.length})
          </button>
          {socials.map((acc) => (
            <button
              key={acc.id}
              onClick={() => setActiveFilter(acc.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeFilter === acc.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : isLight
                  ? 'bg-white text-slate-600 hover:text-blue-600 border border-blue-100 shadow-sm'
                  : 'bg-[#080808] text-slate-400 hover:text-white border border-blue-950'
              }`}
            >
              {acc.arabicName}
            </button>
          ))}
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSocials.map((account) => {
            const isCopied = copiedText === account.handle;

            return (
              <div
                key={account.id}
                className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1 ${
                  isLight
                    ? 'bg-white border-blue-100 hover:border-blue-400 shadow-blue-900/5'
                    : 'bg-[#050505] border-blue-950 hover:border-blue-600 shadow-blue-950/40'
                }`}
              >
                <div>
                  {/* Top card header */}
                  <div
                    className={`flex items-center justify-between pb-4 border-b ${
                      isLight ? 'border-blue-100' : 'border-blue-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 shadow-inner"
                        style={{ backgroundColor: `${account.color}15` }}
                      >
                        {getPlatformIcon(account)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3
                            className={`text-base font-bold transition-colors ${
                              isLight
                                ? 'text-slate-900 group-hover:text-blue-600'
                                : 'text-white group-hover:text-blue-300'
                            }`}
                          >
                            {account.arabicName}
                          </h3>
                          {account.verified && (
                            <span
                              className={`text-[10px] font-semibold px-1 py-0.5 rounded ${
                                isLight
                                  ? 'text-blue-700 bg-blue-50'
                                  : 'text-blue-400 bg-blue-950/80'
                              }`}
                            >
                              رسمي
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-xs font-mono dir-ltr block mt-0.5 ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {account.handle}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenQr(account)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isLight
                          ? 'bg-blue-50/60 hover:bg-blue-100 text-slate-600 border-blue-100'
                          : 'bg-[#0a0a0a] hover:bg-blue-950 text-slate-400 hover:text-blue-300 border-blue-950'
                      }`}
                      title="عرض رمز QR للهاتف"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs mt-4 leading-relaxed line-clamp-3 ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {account.description}
                  </p>

                  {/* Unboxed Stats separated cleanly */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                      isLight ? 'border-blue-50' : 'border-blue-950/60'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                      {account.statsLabel}
                    </span>
                    <span
                      className={`font-bold font-mono tabular-nums ${
                        isLight ? 'text-blue-700' : 'text-blue-300'
                      }`}
                    >
                      {account.statsValue}
                    </span>
                  </div>
                </div>

                {/* Bottom CTA actions */}
                <div
                  className={`mt-6 pt-4 border-t flex items-center gap-2 ${
                    isLight ? 'border-blue-100' : 'border-blue-950'
                  }`}
                >
                  <button
                    onClick={() => onCopyHandle(account.handle)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                      isLight
                        ? 'bg-blue-50/70 hover:bg-blue-100 text-slate-700 border-blue-200'
                        : 'bg-[#0a0a0a] hover:bg-[#151515] text-slate-300 hover:text-white border-blue-950'
                    }`}
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{isCopied ? 'تم النسخ!' : 'نسخ اليوزر'}</span>
                  </button>

                  <a
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>زيارة الحساب</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Helper Note */}
        <div
          className={`mt-8 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isLight
              ? 'bg-white border-blue-100 text-slate-600 shadow-sm'
              : 'bg-[#050505] border-blue-950 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2 text-center sm:text-right">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>
              جميع الحسابات أعلاه تدار شخصياً ومباشرة من قِبل سعود (KYLR). لا توجد حسابات بديلة غير المذكورة هنا.
            </span>
          </div>
          {isUnlocked ? (
            <button
              onClick={onOpenEdit}
              className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 whitespace-nowrap"
            >
              تعديل أو إضافة حسابات ✏️
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-slate-400 hover:text-blue-500 font-medium underline underline-offset-4 whitespace-nowrap"
            >
              هل أنت المالك وتريد التعديل؟ أدخل الرمز 🔒
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
