import React, { useState } from 'react';
import { X, Save, RotateCcw, User, Image, Sparkles } from 'lucide-react';
import { UserProfile, ThemeMode } from '../types';
import { DEFAULT_PROFILE } from '../data/defaultData';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
  onReset: () => void;
  theme: ThemeMode;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
  theme,
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl ${
          isLight
            ? 'bg-white border-blue-200 text-slate-800'
            : 'bg-[#0a0a0a] border-blue-950 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-blue-100' : 'border-blue-950'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                تعديل الملف التعريفي والواجهة الرئيسية
              </h3>
              <p className="text-xs text-slate-500">
                عدّل الاسم، البايو، الصور، المعرف الأساسي، والوصف.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                الاسم الكامل في الواجهة *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                  isLight
                    ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                    : 'bg-[#0f0f0f] border-blue-950 text-white'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                الاسم المختصر *
              </label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) => handleChange('shortName', e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                  isLight
                    ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                    : 'bg-[#0f0f0f] border-blue-950 text-white'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                المعرف الموحد الرئيسي *
              </label>
              <input
                type="text"
                value={formData.primaryHandle}
                onChange={(e) => handleChange('primaryHandle', e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border dir-ltr font-mono focus:border-blue-500 focus:outline-none ${
                  isLight
                    ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                    : 'bg-[#0f0f0f] border-blue-950 text-white'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                الموقع / الدولة
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                  isLight
                    ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                    : 'bg-[#0f0f0f] border-blue-950 text-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">
              الوصف المختصر (Tagline)
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                isLight
                  ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                  : 'bg-[#0f0f0f] border-blue-950 text-white'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">
              نبذة التعريف (Bio)
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none resize-none ${
                isLight
                  ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                  : 'bg-[#0f0f0f] border-blue-950 text-white'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-blue-950">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                رابط صورة الأفاتار / البروفايل
              </label>
              <input
                type="text"
                value={formData.avatarUrl}
                onChange={(e) => handleChange('avatarUrl', e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border dir-ltr font-mono focus:border-blue-500 focus:outline-none ${
                  isLight
                    ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                    : 'bg-[#0f0f0f] border-blue-950 text-white'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                رابط صورة البانر العلوي
              </label>
              <input
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => handleChange('bannerUrl', e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border dir-ltr font-mono focus:border-blue-500 focus:outline-none ${
                  isLight
                    ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                    : 'bg-[#0f0f0f] border-blue-950 text-white'
                }`}
              />
            </div>
          </div>

          <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-blue-100' : 'border-blue-950'}`}>
            <button
              type="button"
              onClick={() => {
                setFormData(DEFAULT_PROFILE);
                onReset();
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة البيانات الافتراضية</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
