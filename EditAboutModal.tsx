import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Cpu, Gamepad2, HelpCircle } from 'lucide-react';
import { SetupSpecItem, FavoriteGameItem, FaqItem, ThemeMode } from '../types';
import {
  DEFAULT_GAMING_SETUP,
  DEFAULT_FAVORITE_GAMES,
  DEFAULT_FAQS,
} from '../data/defaultData';

interface EditAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  specs: SetupSpecItem[];
  games: FavoriteGameItem[];
  faqs: FaqItem[];
  onSave: (specs: SetupSpecItem[], games: FavoriteGameItem[], faqs: FaqItem[]) => void;
  onReset: () => void;
  theme: ThemeMode;
}

export const EditAboutModal: React.FC<EditAboutModalProps> = ({
  isOpen,
  onClose,
  specs,
  games,
  faqs,
  onSave,
  onReset,
  theme,
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'specs' | 'games' | 'faqs'>('specs');
  const [formSpecs, setFormSpecs] = useState<SetupSpecItem[]>(specs);
  const [formGames, setFormGames] = useState<FavoriteGameItem[]>(games);
  const [formFaqs, setFormFaqs] = useState<FaqItem[]>(faqs);

  // Specs handlers
  const handleSpecChange = (idx: number, field: keyof SetupSpecItem, value: string) => {
    const updated = [...formSpecs];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormSpecs(updated);
  };
  const handleAddSpec = () => {
    setFormSpecs([
      ...formSpecs,
      { id: `spec_${Date.now()}`, title: 'قطعة جديدة', spec: 'المواصفة...' },
    ]);
  };
  const handleDeleteSpec = (idx: number) => {
    setFormSpecs(formSpecs.filter((_, i) => i !== idx));
  };

  // Games handlers
  const handleGameChange = (idx: number, field: keyof FavoriteGameItem, value: string) => {
    const updated = [...formGames];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormGames(updated);
  };
  const handleAddGame = () => {
    setFormGames([
      ...formGames,
      { id: `game_${Date.now()}`, name: 'لعبة جديدة', genre: 'Genre', role: 'الرانك / التخصص' },
    ]);
  };
  const handleDeleteGame = (idx: number) => {
    setFormGames(formGames.filter((_, i) => i !== idx));
  };

  // Faqs handlers
  const handleFaqChange = (idx: number, field: keyof FaqItem, value: string) => {
    const updated = [...formFaqs];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormFaqs(updated);
  };
  const handleAddFaq = () => {
    setFormFaqs([
      ...formFaqs,
      { id: `faq_${Date.now()}`, q: 'سؤال جديد؟', a: 'الإجابة هنا...' },
    ]);
  };
  const handleDeleteFaq = (idx: number) => {
    setFormFaqs(formFaqs.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formSpecs, formGames, formFaqs);
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
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                تعديل قائمة السيت أب والألعاب والأسئلة الشائعة
              </h3>
              <p className="text-xs text-slate-500">
                عدّل مواصفات البي سي، الألعاب المفضلة وتخصصات البث، وأسئلة المتابعين.
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

        {/* Tab switcher */}
        <div className="flex items-center gap-2 pt-4 border-b border-blue-950/60 pb-3 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'specs'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>مواصفات السيت أب ({formSpecs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'games'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>الألعاب المفضلة ({formGames.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'faqs'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الأسئلة الشائعة ({formFaqs.length})</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {activeTab === 'specs' && (
            <div className="space-y-3">
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {formSpecs.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isLight ? 'bg-blue-50/30 border-blue-100' : 'bg-[#050505] border-blue-950'
                    }`}
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleSpecChange(idx, 'title', e.target.value)}
                        placeholder="اسم القطعة (كارت شاشة، معالج...)"
                        className={`text-xs px-3 py-1.5 rounded-lg border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                      <input
                        type="text"
                        value={item.spec}
                        onChange={(e) => handleSpecChange(idx, 'spec', e.target.value)}
                        placeholder="الموديل والمواصفة الدقيقة"
                        className={`text-xs px-3 py-1.5 rounded-lg border dir-ltr font-mono focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteSpec(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddSpec}
                className="w-full py-2 rounded-xl border border-dashed border-blue-900/60 text-xs font-semibold text-blue-500 hover:bg-blue-950/20 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة قطعة عتاد جديدة</span>
              </button>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="space-y-3">
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {formGames.map((game, idx) => (
                  <div
                    key={game.id || idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isLight ? 'bg-blue-50/30 border-blue-100' : 'bg-[#050505] border-blue-950'
                    }`}
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={game.name}
                        onChange={(e) => handleGameChange(idx, 'name', e.target.value)}
                        placeholder="اسم اللعبة"
                        className={`text-xs px-3 py-1.5 rounded-lg border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                      <input
                        type="text"
                        value={game.genre}
                        onChange={(e) => handleGameChange(idx, 'genre', e.target.value)}
                        placeholder="النوع (FPS, Sports...)"
                        className={`text-xs px-3 py-1.5 rounded-lg border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                      <input
                        type="text"
                        value={game.role}
                        onChange={(e) => handleGameChange(idx, 'role', e.target.value)}
                        placeholder="الرانك أو الدور"
                        className={`text-xs px-3 py-1.5 rounded-lg border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteGame(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddGame}
                className="w-full py-2 rounded-xl border border-dashed border-blue-900/60 text-xs font-semibold text-blue-500 hover:bg-blue-950/20 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة لعبة جديدة</span>
              </button>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3">
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {formFaqs.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className={`p-3.5 rounded-xl border space-y-2 ${
                      isLight ? 'bg-blue-50/30 border-blue-100' : 'bg-[#050505] border-blue-950'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                        placeholder="نص السؤال..."
                        className={`text-xs font-bold px-3 py-1.5 flex-1 rounded-lg border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                      placeholder="نص الإجابة..."
                      className={`w-full text-xs px-3 py-1.5 rounded-lg border focus:outline-none resize-none ${
                        isLight
                          ? 'bg-white border-blue-200 text-slate-900'
                          : 'bg-[#0f0f0f] border-blue-950 text-white'
                      }`}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="w-full py-2 rounded-xl border border-dashed border-blue-900/60 text-xs font-semibold text-blue-500 hover:bg-blue-950/20 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة سؤال وجواب جديد</span>
              </button>
            </div>
          )}

          <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-blue-100' : 'border-blue-950'}`}>
            <button
              type="button"
              onClick={() => {
                setFormSpecs(DEFAULT_GAMING_SETUP);
                setFormGames(DEFAULT_FAVORITE_GAMES);
                setFormFaqs(DEFAULT_FAQS);
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
