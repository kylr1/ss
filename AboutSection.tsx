import React, { useState } from 'react';
import { Cpu, Gamepad2, HelpCircle, ChevronDown, Check, User, Edit3, Lock } from 'lucide-react';
import { SetupSpecItem, FavoriteGameItem, FaqItem, ThemeMode } from '../types';
import {
  DEFAULT_GAMING_SETUP,
  DEFAULT_FAVORITE_GAMES,
  DEFAULT_FAQS,
} from '../data/defaultData';

interface AboutSectionProps {
  theme: ThemeMode;
  specs: SetupSpecItem[];
  games: FavoriteGameItem[];
  faqs: FaqItem[];
  isUnlocked: boolean;
  onOpenEdit: () => void;
  onOpenAuth: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  theme,
  specs,
  games,
  faqs,
  isUnlocked,
  onOpenEdit,
  onOpenAuth,
}) => {
  const safeSpecs = Array.isArray(specs) && specs.length > 0 ? specs : DEFAULT_GAMING_SETUP;
  const safeGames = Array.isArray(games) && games.length > 0 ? games : DEFAULT_FAVORITE_GAMES;
  const safeFaqs = Array.isArray(faqs) && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isLight = theme === 'light';

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="about" className="py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b ${
            isLight ? 'border-blue-100' : 'border-blue-950'
          }`}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2">
              <Cpu className="w-4 h-4" />
              <span>مواصفات السيت اب والألعاب</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              السيت اب و الالعاب
            </h2>
            <p
              className={`text-sm mt-2 leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              مواصفات جهاز البث والقيمنق، الألعاب المفضلة وتخصصات البث، وأسئلة المتابعين الشائعة.
            </p>
          </div>

          {isUnlocked && (
            <div className="shrink-0">
              <button
                onClick={onOpenEdit}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all active:scale-[0.98] ${
                  isLight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25 border-blue-600'
                    : 'bg-blue-600 text-white hover:bg-blue-500 border-blue-500'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل هذا القسم ✏️</span>
              </button>
            </div>
          )}
        </div>

        {/* 2-Column Split: Favorite Games & Gaming Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Gaming Setup & PC Specs */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-6 ${
              isLight
                ? 'bg-white border-blue-100 shadow-blue-900/5'
                : 'bg-[#050505] border-blue-950 shadow-blue-950/40'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-4 border-b ${
                isLight ? 'border-blue-100' : 'border-blue-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl border ${
                    isLight
                      ? 'bg-blue-50 text-blue-600 border-blue-200'
                      : 'bg-[#0a0a0a] text-blue-400 border-blue-950'
                  }`}
                >
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    مواصفات السيت أب وجهاز البث
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Gaming & Streaming Rig</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-600 font-bold">High Performance</span>
            </div>

            <div className="space-y-3">
              {safeSpecs.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                    isLight
                      ? 'bg-blue-50/40 border-blue-100'
                      : 'bg-[#0a0a0a] border-blue-950'
                  }`}
                >
                  <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400 font-medium'}>
                    {item.title}
                  </span>
                  <span
                    className={`font-mono font-bold dir-ltr text-left ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {item.spec}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Games & Roles */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-6 ${
              isLight
                ? 'bg-white border-blue-100 shadow-blue-900/5'
                : 'bg-[#050505] border-blue-950 shadow-blue-950/40'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-4 border-b ${
                isLight ? 'border-blue-100' : 'border-blue-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl border ${
                    isLight
                      ? 'bg-blue-50 text-blue-600 border-blue-200'
                      : 'bg-[#0a0a0a] text-cyan-400 border-blue-950'
                  }`}
                >
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    الألعاب المفضلة وتخصصات البث
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Competitive & Community Games</p>
                </div>
              </div>
              <span className="text-xs font-mono text-blue-600 font-bold">Ranked & Fun</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {safeGames.map((game) => (
                <div
                  key={game.id}
                  className={`p-4 rounded-xl border space-y-2 transition-colors ${
                    isLight
                      ? 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
                      : 'bg-[#0a0a0a] border-blue-950 hover:border-blue-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {game.name}
                    </h4>
                    <span className="text-[11px] text-blue-600 font-mono font-bold">{game.genre}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-xs ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{game.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick summary banner */}
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isLight
                  ? 'bg-blue-50/80 border-blue-200 text-blue-950 font-medium'
                  : 'bg-blue-950/20 border-blue-900/40 text-blue-200'
              }`}
            >
              💡 يشارك سعود مجتمعه في رومات لعب جماعية على سيرفر الديسكورد خلال عطلة نهاية الأسبوع مع جوائز للمراكز الأولى!
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 shadow-xl space-y-6 ${
            isLight
              ? 'bg-white border-blue-100 shadow-blue-900/5'
              : 'bg-[#050505] border-blue-950 shadow-blue-950/40'
          }`}
        >
          <div
            className={`flex items-center gap-3 pb-4 border-b ${
              isLight ? 'border-blue-100' : 'border-blue-950'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl border ${
                isLight
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'bg-[#0a0a0a] text-amber-400 border-blue-950'
              }`}
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3
                className={`text-lg font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                الأسئلة الشائعة من المتابعين
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">إجابات سريعة على أهم الاستفسارات</p>
            </div>
          </div>

          <div className="space-y-3">
            {safeFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border overflow-hidden transition-colors ${
                    isLight
                      ? 'bg-blue-50/30 border-blue-100'
                      : 'bg-[#0a0a0a] border-blue-950'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-right transition-colors"
                  >
                    <span
                      className={`text-sm font-bold ${
                        isLight ? 'text-slate-800' : 'text-white'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={`px-4 pb-4 pt-1 text-xs sm:text-sm border-t leading-relaxed ${
                        isLight
                          ? 'text-slate-600 border-blue-100'
                          : 'text-slate-300 border-blue-950/60'
                      }`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
