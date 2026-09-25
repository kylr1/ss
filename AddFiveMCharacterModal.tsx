import React, { useState } from 'react';
import { X, Save, Sparkles, Image, Shield, AlertCircle, Plus } from 'lucide-react';
import { FiveMCharacter, ThemeMode } from '../types';

interface AddFiveMCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (char: FiveMCharacter) => void;
  initialCharacter?: FiveMCharacter | null;
  theme: ThemeMode;
}

const PRESET_AVATARS = [
  {
    label: 'رسمي / محقق',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    label: 'ستريت / كول',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    label: 'تكتيكي / عسكري',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
  {
    label: 'كلاسيك / رجل أعمال',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
  },
];

export const AddFiveMCharacterModal: React.FC<AddFiveMCharacterModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCharacter,
  theme,
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  const [name, setName] = useState(initialCharacter?.name || '');
  const [alias, setAlias] = useState(initialCharacter?.alias || '');
  const [imageUrl, setImageUrl] = useState(initialCharacter?.imageUrl || PRESET_AVATARS[0].url);
  const [role, setRole] = useState(initialCharacter?.role || '');
  const [serverName, setServerName] = useState(initialCharacter?.serverName || 'سيرفر المملكة رول بلاي');
  const [status, setStatus] = useState(initialCharacter?.status || 'نشط في السيرفر 🎮');
  const [age, setAge] = useState(initialCharacter?.age || '25 سنة');
  const [bio, setBio] = useState(initialCharacter?.bio || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('يرجى إدخال اسم الشخصية.');
      return;
    }

    if (!imageUrl.trim()) {
      setErrorMsg('يرجى تحديد أو إدخال رابط صورة الشخصية.');
      return;
    }

    if (!bio.trim()) {
      setErrorMsg('يرجى كتابة نبذة أو قصة الشخصية.');
      return;
    }

    const newChar: FiveMCharacter = {
      id: initialCharacter?.id || `char_${Date.now()}`,
      name: name.trim(),
      alias: alias.trim() || undefined,
      imageUrl: imageUrl.trim(),
      role: role.trim() || 'شخصية رول بلاي',
      serverName: serverName.trim() || 'FiveM Server',
      status: status.trim() || 'نشط',
      age: age.trim() || undefined,
      bio: bio.trim(),
    };

    onSave(newChar);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-blue-200 text-slate-800'
            : 'bg-[#0a0a0a] border-blue-950 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 p-2 rounded-xl transition-colors ${
            isLight
              ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-blue-950/40'
          }`}
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-600/20">
          <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-500 border border-blue-500/20">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h2
              className={`text-xl font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {initialCharacter ? 'تعديل بيانات الشخصية' : 'إضافة شخصية جديدة في FiveM'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              أضف صورة واسم ونبذة شخصية الرول بلاي لعرضها في الموقع
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Character Name & Nickname */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1.5 text-blue-500">
                اسم الشخصية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: سعود المحمدي"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-semibold outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#121212] border-blue-950 text-white'
                }`}
              />
            </div>

            <div>
              <label className="block font-bold mb-1.5 text-slate-400">
                اللقب / الشهرة (اختياري)
              </label>
              <input
                type="text"
                placeholder="مثال: كايْلر / الشبح"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#121212] border-blue-950 text-white'
                }`}
              />
            </div>
          </div>

          {/* Character Image Selection & Preview */}
          <div className="space-y-2">
            <label className="block font-bold text-blue-500">
              صورة الشخصية <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-500 shrink-0 bg-slate-900">
                <img
                  src={imageUrl || PRESET_AVATARS[0].url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = PRESET_AVATARS[0].url;
                  }}
                />
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="رابط الصورة المباشر (URL)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-[11px] dir-ltr outline-none focus:ring-2 focus:ring-blue-500 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-[#121212] border-blue-950 text-white'
                  }`}
                />
              </div>
            </div>

            {/* Presets buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] text-slate-400 self-center">صور جاهزة للاختيار السريع:</span>
              {PRESET_AVATARS.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setImageUrl(preset.url)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                    imageUrl === preset.url
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : isLight
                      ? 'bg-blue-50/70 border-blue-100 text-slate-600 hover:bg-blue-100'
                      : 'bg-[#161616] border-blue-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role and Server */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1.5 text-slate-400">
                الدور / الوظيفة في المدينة
              </label>
              <input
                type="text"
                placeholder="مثال: رئيس المباحث، مسعف، متسابق"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#121212] border-blue-950 text-white'
                }`}
              />
            </div>

            <div>
              <label className="block font-bold mb-1.5 text-slate-400">
                اسم سيرفر FiveM
              </label>
              <input
                type="text"
                placeholder="مثال: سيرفر المملكة رول بلاي"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#121212] border-blue-950 text-white'
                }`}
              />
            </div>
          </div>

          {/* Age and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1.5 text-slate-400">
                العمر
              </label>
              <input
                type="text"
                placeholder="مثال: 27 سنة"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#121212] border-blue-950 text-white'
                }`}
              />
            </div>

            <div>
              <label className="block font-bold mb-1.5 text-slate-400">
                الحالة في السيرفر
              </label>
              <input
                type="text"
                placeholder="مثال: نشط، في الخدمة، مطلوب"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#121212] border-blue-950 text-white'
                }`}
              />
            </div>
          </div>

          {/* Bio & Story */}
          <div>
            <label className="block font-bold mb-1.5 text-blue-500">
              نبذة وقصة الشخصية <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="اكتب نبذة شيقة عن الشخصية وقصتها، أهدافها، وسلوكها في رول بلاي FiveM..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#121212] border-blue-950 text-white'
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-blue-600/20">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl border transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-[#141414] hover:bg-[#1a1a1a] text-slate-300 border-blue-950'
              }`}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              <Save className="w-4 h-4" />
              <span>{initialCharacter ? 'حفظ التعديلات' : 'إضافة الشخصية'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
