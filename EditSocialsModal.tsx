import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Share2, Check } from 'lucide-react';
import { SocialAccount, ThemeMode } from '../types';
import { DEFAULT_SOCIALS } from '../data/defaultData';

interface EditSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  socials: SocialAccount[];
  onSave: (updated: SocialAccount[]) => void;
  onReset: () => void;
  theme: ThemeMode;
}

export const EditSocialsModal: React.FC<EditSocialsModalProps> = ({
  isOpen,
  onClose,
  socials,
  onSave,
  onReset,
  theme,
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const [items, setItems] = useState<SocialAccount[]>(socials);

  const handleFieldChange = (index: number, field: keyof SocialAccount, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleAddNew = () => {
    const newAccount: SocialAccount = {
      id: `social_${Date.now()}`,
      name: 'منصة جديدة',
      arabicName: 'منصة جديدة',
      handle: '@username',
      url: 'https://',
      description: 'وصف الحساب هنا...',
      color: '#3b82f6',
      bgGradient: 'from-blue-950 to-slate-900',
      iconName: 'Share2',
      statsLabel: 'المتابعون',
      statsValue: '0',
      verified: true,
    };
    setItems([...items, newAccount]);
  };

  const handleDelete = (index: number) => {
    const updated = items.filter((_, idx) => idx !== index);
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(items);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl ${
          isLight
            ? 'bg-white border-blue-200 text-slate-800'
            : 'bg-[#0a0a0a] border-blue-950 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-blue-100' : 'border-blue-950'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                تعديل قائمة الحسابات (تيك توك، إنستغرام، سناب...)
              </h3>
              <p className="text-xs text-slate-500">
                عدّل المعرفات، الروابط، عدد المتابعين، أو أضف منصات جديدة واحذف ما لا تريده.
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
          <div className="space-y-4">
            {items.map((acc, index) => (
              <div
                key={acc.id || index}
                className={`p-4 rounded-xl border space-y-3 relative group ${
                  isLight
                    ? 'bg-blue-50/40 border-blue-100'
                    : 'bg-[#050505] border-blue-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: acc.color }}
                    />
                    <input
                      type="text"
                      value={acc.arabicName}
                      onChange={(e) => handleFieldChange(index, 'arabicName', e.target.value)}
                      placeholder="اسم المنصة بالعربي"
                      className={`font-bold text-xs px-2 py-1 rounded border focus:outline-none ${
                        isLight
                          ? 'bg-white border-blue-200 text-slate-900'
                          : 'bg-[#0f0f0f] border-blue-950 text-white'
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="حذف هذا الحساب"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      المعرف / اليوزر (Handle)
                    </label>
                    <input
                      type="text"
                      value={acc.handle}
                      onChange={(e) => handleFieldChange(index, 'handle', e.target.value)}
                      required
                      className={`w-full px-3 py-1.5 text-xs rounded-lg border dir-ltr font-mono focus:border-blue-500 focus:outline-none ${
                        isLight
                          ? 'bg-white border-blue-200 text-slate-900'
                          : 'bg-[#0f0f0f] border-blue-950 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      الرابط المباشر (URL)
                    </label>
                    <input
                      type="url"
                      value={acc.url}
                      onChange={(e) => handleFieldChange(index, 'url', e.target.value)}
                      required
                      className={`w-full px-3 py-1.5 text-xs rounded-lg border dir-ltr font-mono focus:border-blue-500 focus:outline-none ${
                        isLight
                          ? 'bg-white border-blue-200 text-slate-900'
                          : 'bg-[#0f0f0f] border-blue-950 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      عدد المتابعين التقديري / الإحصائية
                    </label>
                    <input
                      type="text"
                      value={acc.statsValue}
                      onChange={(e) => handleFieldChange(index, 'statsValue', e.target.value)}
                      className={`w-full px-3 py-1.5 text-xs rounded-lg border focus:border-blue-500 focus:outline-none ${
                        isLight
                          ? 'bg-white border-blue-200 text-slate-900'
                          : 'bg-[#0f0f0f] border-blue-950 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      نص الإحصائية (مثال: المتابعون، المشاهدات)
                    </label>
                    <input
                      type="text"
                      value={acc.statsLabel}
                      onChange={(e) => handleFieldChange(index, 'statsLabel', e.target.value)}
                      className={`w-full px-3 py-1.5 text-xs rounded-lg border focus:border-blue-500 focus:outline-none ${
                        isLight
                          ? 'bg-white border-blue-200 text-slate-900'
                          : 'bg-[#0f0f0f] border-blue-950 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    الوصف المختصر للحساب
                  </label>
                  <input
                    type="text"
                    value={acc.description}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-lg border focus:border-blue-500 focus:outline-none ${
                      isLight
                        ? 'bg-white border-blue-200 text-slate-900'
                        : 'bg-[#0f0f0f] border-blue-950 text-white'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddNew}
            className={`w-full py-2.5 rounded-xl border border-dashed text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              isLight
                ? 'border-blue-300 text-blue-600 hover:bg-blue-50'
                : 'border-blue-900/60 text-blue-400 hover:bg-blue-950/20'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منصة أو حساب جديد</span>
          </button>

          <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-blue-100' : 'border-blue-950'}`}>
            <button
              type="button"
              onClick={() => {
                setItems(DEFAULT_SOCIALS);
                onReset();
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة الحسابات الافتراضية</span>
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
