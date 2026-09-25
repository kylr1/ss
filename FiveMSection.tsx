import React, { useState } from 'react';
import {
  Gamepad2,
  Plus,
  User,
  Shield,
  Server,
  Sparkles,
  Lock,
  Edit3,
  Trash2,
  ExternalLink,
  Info
} from 'lucide-react';
import { FiveMCharacter, ThemeMode } from '../types';

interface FiveMSectionProps {
  characters: FiveMCharacter[];
  onSelectCharacter: (char: FiveMCharacter) => void;
  onOpenAddModal: () => void;
  onEditCharacter: (char: FiveMCharacter) => void;
  onDeleteCharacter: (id: string) => void;
  isUnlocked: boolean;
  onOpenAuth: () => void;
  theme: ThemeMode;
}

export const FiveMSection: React.FC<FiveMSectionProps> = ({
  characters,
  onSelectCharacter,
  onOpenAddModal,
  onEditCharacter,
  onDeleteCharacter,
  isUnlocked,
  onOpenAuth,
  theme,
}) => {
  const isLight = theme === 'light';

  return (
    <section id="fivem" className="py-12 md:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b ${
            isLight ? 'border-blue-100' : 'border-blue-950'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2">
              <Gamepad2 className="w-4 h-4 text-blue-500" />
              <span>رول بلاي GTA V - FiveM Roleplay</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              شخصيات FiveM
            </h2>
            <p
              className={`text-sm mt-2 max-w-2xl leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              استعرض شخصيات الرول بلاي لـ سعود (KYLR)، تاريخ وقصة كل شخصية في السيرفرات، والأدوار والوظائف المختلفة.
            </p>
          </div>

          {/* Add Character button (only shown when lock is unlocked) */}
          {isUnlocked && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة شخصية ➕</span>
              </button>
            </div>
          )}
        </div>

        {/* Characters Grid */}
        {characters.length === 0 ? (
          <div
            className={`p-12 text-center rounded-3xl border ${
              isLight
                ? 'bg-blue-50/40 border-blue-100'
                : 'bg-[#050505] border-blue-950'
            }`}
          >
            <Gamepad2 className="w-12 h-12 mx-auto text-blue-500 mb-3 opacity-60" />
            <h3 className="text-base font-bold mb-1">لا توجد شخصيات مضافة حالياً</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
              استعرض شخصيات الرول بلاي وقصصها في السيرفر.
            </p>
            {isUnlocked && (
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/25"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة شخصية الآن</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((char) => (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className={`group relative rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                  isLight
                    ? 'bg-white border-blue-100 hover:border-blue-300 shadow-blue-900/5'
                    : 'bg-[#060606] border-blue-950 hover:border-blue-800 shadow-blue-950/30'
                }`}
              >
                {/* Character Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={char.imageUrl}
                    alt={char.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isLight
                        ? 'from-white via-transparent to-transparent'
                        : 'from-[#060606] via-transparent to-black/30'
                    }`}
                  />

                  {/* Server Badge */}
                  {char.serverName && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white shadow-lg">
                      <Server className="w-3 h-3 text-blue-400" />
                      <span className="truncate max-w-[140px]">{char.serverName}</span>
                    </div>
                  )}

                  {/* Unlocked Controls: Edit / Delete */}
                  {isUnlocked && (
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1.5 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onEditCharacter(char)}
                        className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all active:scale-95"
                        title="تعديل الشخصية"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`هل أنت متأكد من حذف شخصية "${char.name}"؟`)) {
                            onDeleteCharacter(char.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-all active:scale-95"
                        title="حذف الشخصية"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-500">
                        <Shield className="w-3.5 h-3.5" />
                        <span>{char.role || 'شخصية رول بلاي'}</span>
                      </span>
                      {char.status && (
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          {char.status}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg font-black tracking-tight group-hover:text-blue-500 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {char.name}
                    </h3>

                    {char.alias && (
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        « {char.alias} »
                      </p>
                    )}
                  </div>

                  {/* Bio Preview Snippet */}
                  <p
                    className={`text-xs leading-relaxed line-clamp-2 ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {char.bio}
                  </p>

                  {/* Click to view full bio CTA */}
                  <div className="pt-2 border-t border-blue-600/10 flex items-center justify-between text-xs font-bold text-blue-500 group-hover:text-blue-400">
                    <span className="flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>عرض نبذة الشخصية الكاملة</span>
                    </span>
                    <span className="transition-transform group-hover:-translate-x-1">←</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
