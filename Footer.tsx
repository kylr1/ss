import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SocialAccount, ThemeMode, ActiveTab } from '../types';

interface FooterProps {
  socials: SocialAccount[];
  onScrollTop: () => void;
  onSelectTab: (tab: ActiveTab) => void;
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({
  socials,
  onScrollTop,
  onSelectTab,
  theme,
}) => {
  const isLight = theme === 'light';

  return (
    <footer
      className={`border-t py-12 text-xs transition-colors duration-200 ${
        isLight
          ? 'bg-white border-blue-100 text-slate-600'
          : 'bg-[#000000] border-blue-950 text-slate-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b ${
            isLight ? 'border-blue-100' : 'border-blue-950/60'
          }`}
        >
          <div className="text-center md:text-right">
            <span
              className={`text-lg font-black tracking-wider ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              KYLR | SAUD
            </span>
            <p className="mt-1 max-w-sm leading-relaxed">
              الموقع التعريفي الرسمي لصانع المحتوى سعود. الروابط الرسمية لسيرفر الديسكورد، تيك توك، إنستغرام، وسناب شات.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold">
            <button
              onClick={() => onSelectTab('all')}
              className="hover:text-blue-600 transition-colors"
            >
              الرئيسية
            </button>
            <button
              onClick={() => onSelectTab('socials')}
              className="hover:text-blue-600 transition-colors"
            >
              حساباتي
            </button>
            <button
              onClick={() => onSelectTab('discord')}
              className="hover:text-blue-600 transition-colors"
            >
              سيرفر ديسكورد
            </button>
            <button
              onClick={() => onSelectTab('fivem')}
              className="hover:text-blue-600 transition-colors"
            >
              FiveM
            </button>
            <button
              onClick={() => onSelectTab('about')}
              className="hover:text-blue-600 transition-colors"
            >
              السيت اب و الالعاب
            </button>
          </div>

          <button
            onClick={onScrollTop}
            className={`flex items-center gap-2 p-2.5 rounded-xl border transition-colors ${
              isLight
                ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                : 'bg-[#0a0a0a] hover:bg-[#151515] text-slate-300 border-blue-950'
            }`}
            title="العودة لأعلى الصفحة"
          >
            <ArrowUp className="w-4 h-4 text-blue-500" />
            <span>للأعلى</span>
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} KYLR | SAUD. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>
              {isLight ? 'النمط الفاتح: أبيض وأزرق' : 'النمط الغامق: أسود وأزرق'}
            </span>
            <span className="text-blue-500">✦</span>
            <span>المملكة العربية السعودية 🇸🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
