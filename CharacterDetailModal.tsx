import React from 'react';
import { X, Shield, Server, User, Sparkles, Clock, BadgeCheck } from 'lucide-react';
import { FiveMCharacter, ThemeMode } from '../types';

interface CharacterDetailModalProps {
  character: FiveMCharacter | null;
  onClose: () => void;
  theme: ThemeMode;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  onClose,
  theme,
}) => {
  if (!character) return null;

  const isLight = theme === 'light';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-blue-200 text-slate-800'
            : 'bg-[#080808] border-blue-900/60 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 z-20 p-2.5 rounded-full backdrop-blur-md border transition-colors ${
            isLight
              ? 'bg-white/80 hover:bg-white text-slate-700 border-slate-200'
              : 'bg-black/60 hover:bg-black text-slate-300 border-white/10'
          }`}
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Character Hero Banner / Picture */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-3xl">
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-full h-full object-cover object-top"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isLight
                ? 'from-white via-white/50 to-transparent'
                : 'from-[#080808] via-[#080808]/60 to-transparent'
            }`}
          />

          <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between gap-4">
            <div>
              {character.serverName && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-bold mb-2 shadow-md">
                  <Server className="w-3.5 h-3.5" />
                  <span>{character.serverName}</span>
                </div>
              )}
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {character.name}
              </h2>
              {character.alias && (
                <p className="text-sm font-semibold text-blue-500 mt-0.5">
                  « {character.alias} »
                </p>
              )}
            </div>

            {character.status && (
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold shrink-0">
                <BadgeCheck className="w-3.5 h-3.5" />
                {character.status}
              </span>
            )}
          </div>
        </div>

        {/* Character Info Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              className={`p-3 rounded-2xl border ${
                isLight
                  ? 'bg-blue-50/50 border-blue-100'
                  : 'bg-[#0f0f0f] border-blue-950'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-blue-500 font-semibold mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>الرول / الدور</span>
              </div>
              <p
                className={`text-xs font-bold truncate ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                {character.role || 'مواطن'}
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border ${
                isLight
                  ? 'bg-blue-50/50 border-blue-100'
                  : 'bg-[#0f0f0f] border-blue-950'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-blue-500 font-semibold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>العمر</span>
              </div>
              <p
                className={`text-xs font-bold ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                {character.age || 'غير محدد'}
              </p>
            </div>

            <div
              className={`col-span-2 sm:col-span-1 p-3 rounded-2xl border ${
                isLight
                  ? 'bg-blue-50/50 border-blue-100'
                  : 'bg-[#0f0f0f] border-blue-950'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-blue-500 font-semibold mb-1">
                <Server className="w-3.5 h-3.5" />
                <span>سيرفر FiveM</span>
              </div>
              <p
                className={`text-xs font-bold truncate ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                {character.serverName || 'FiveM Server'}
              </p>
            </div>
          </div>

          {/* Full Bio & Backstory */}
          <div className="space-y-3">
            <h3
              className={`text-sm font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <User className="w-4 h-4 text-blue-500" />
              <span>نبذة عن الشخصية وقصتها في المدينة:</span>
            </h3>
            <div
              className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                isLight
                  ? 'bg-blue-50/30 border-blue-100 text-slate-700'
                  : 'bg-[#0b0f19] border-blue-900/40 text-slate-300'
              }`}
            >
              {character.bio}
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/25"
            >
              إغلاق النبذة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
