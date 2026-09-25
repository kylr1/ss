import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Hash, Volume2 } from 'lucide-react';
import { DiscordServerConfig, DiscordChannel, DiscordRole, ThemeMode } from '../types';
import { DEFAULT_DISCORD_CONFIG } from '../data/defaultData';
import { DiscordLogo } from './DiscordLogo';

interface EditDiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DiscordServerConfig;
  onSave: (updated: DiscordServerConfig) => void;
  onReset: () => void;
  theme: ThemeMode;
}

export const EditDiscordModal: React.FC<EditDiscordModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
  theme,
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const [formData, setFormData] = useState<DiscordServerConfig>(config);
  const [activeTab, setActiveTab] = useState<'info' | 'channels' | 'roles'>('info');

  const handleInfoChange = (field: keyof DiscordServerConfig, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChannelChange = (idx: number, field: keyof DiscordChannel, value: any) => {
    const updated = [...formData.channels];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, channels: updated }));
  };

  const handleAddChannel = () => {
    const newChan: DiscordChannel = {
      id: `chan_${Date.now()}`,
      name: 'روم-جديد',
      type: 'text',
    };
    setFormData((prev) => ({ ...prev, channels: [...prev.channels, newChan] }));
  };

  const handleDeleteChannel = (idx: number) => {
    const updated = formData.channels.filter((_, i) => i !== idx);
    setFormData((prev) => ({ ...prev, channels: updated }));
  };

  const handleRoleChange = (idx: number, field: keyof DiscordRole, value: any) => {
    const updated = [...formData.roles];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, roles: updated }));
  };

  const handleAddRole = () => {
    const newRole: DiscordRole = {
      name: 'رتبة جديدة',
      color: '#3b82f6',
      count: 10,
    };
    setFormData((prev) => ({ ...prev, roles: [...prev.roles, newRole] }));
  };

  const handleDeleteRole = (idx: number) => {
    const updated = formData.roles.filter((_, i) => i !== idx);
    setFormData((prev) => ({ ...prev, roles: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
            <div className="p-2 rounded-xl bg-[#5865F2]/10 text-[#5865F2]">
              <DiscordLogo className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                تعديل قائمة وبيانات سيرفر ديسكورد
              </h3>
              <p className="text-xs text-slate-500">
                عدّل معلومات السيرفر، روابط الدعوة، الرومات، والرتب الرسمية.
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
            onClick={() => setActiveTab('info')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'info'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            المعلومات والروابط
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('channels')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'channels'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            القنوات والرومات ({formData.channels.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('roles')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'roles'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            رتب وأدوار السيرفر ({formData.roles.length})
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {activeTab === 'info' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  اسم السيرفر *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInfoChange('name', e.target.value)}
                  required
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                    isLight
                      ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                      : 'bg-[#0f0f0f] border-blue-950 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    كود الدعوة المخصص (Invite Code)
                  </label>
                  <input
                    type="text"
                    value={formData.inviteCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      handleInfoChange('inviteCode', code);
                      handleInfoChange('inviteUrl', `https://discord.gg/${code}`);
                    }}
                    required
                    className={`w-full px-3 py-2 text-xs rounded-xl border dir-ltr font-mono focus:border-blue-500 focus:outline-none ${
                      isLight
                        ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                        : 'bg-[#0f0f0f] border-blue-950 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    رابط الدعوة المباشر الكامل
                  </label>
                  <input
                    type="url"
                    value={formData.inviteUrl}
                    onChange={(e) => handleInfoChange('inviteUrl', e.target.value)}
                    required
                    className={`w-full px-3 py-2 text-xs rounded-xl border dir-ltr font-mono focus:border-blue-500 focus:outline-none ${
                      isLight
                        ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                        : 'bg-[#0f0f0f] border-blue-950 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    إجمالي أعضاء السيرفر
                  </label>
                  <input
                    type="number"
                    value={formData.totalMembers}
                    onChange={(e) => handleInfoChange('totalMembers', Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                      isLight
                        ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                        : 'bg-[#0f0f0f] border-blue-950 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    المتصلين الآن (Online)
                  </label>
                  <input
                    type="number"
                    value={formData.onlineMembers}
                    onChange={(e) => handleInfoChange('onlineMembers', Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                      isLight
                        ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                        : 'bg-[#0f0f0f] border-blue-950 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  إعلان أو تنبيه السيرفر (شريط التنبيهات)
                </label>
                <input
                  type="text"
                  value={formData.announcementText}
                  onChange={(e) => handleInfoChange('announcementText', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none ${
                    isLight
                      ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                      : 'bg-[#0f0f0f] border-blue-950 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  وصف السيرفر
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInfoChange('description', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:border-blue-500 focus:outline-none resize-none ${
                    isLight
                      ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                      : 'bg-[#0f0f0f] border-blue-950 text-white'
                  }`}
                />
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="space-y-3">
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {formData.channels.map((chan, idx) => (
                  <div
                    key={chan.id || idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isLight ? 'bg-blue-50/30 border-blue-100' : 'bg-[#050505] border-blue-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <select
                        value={chan.type}
                        onChange={(e) => handleChannelChange(idx, 'type', e.target.value)}
                        className={`text-xs px-2 py-1 rounded border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      >
                        <option value="text">شات كتابي (#)</option>
                        <option value="voice">روم صوتي (🎙️)</option>
                      </select>

                      <input
                        type="text"
                        value={chan.name}
                        onChange={(e) => handleChannelChange(idx, 'name', e.target.value)}
                        className={`text-xs px-3 py-1 flex-1 rounded border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteChannel(idx)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddChannel}
                className="w-full py-2 rounded-xl border border-dashed border-blue-900/60 text-xs font-semibold text-blue-500 hover:bg-blue-950/20 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة قناة أو روم جديد</span>
              </button>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-3">
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {formData.roles.map((role, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isLight ? 'bg-blue-50/30 border-blue-100' : 'bg-[#050505] border-blue-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="color"
                        value={role.color}
                        onChange={(e) => handleRoleChange(idx, 'color', e.target.value)}
                        className="w-7 h-7 rounded border border-white/10 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={role.name}
                        onChange={(e) => handleRoleChange(idx, 'name', e.target.value)}
                        className={`text-xs px-3 py-1 flex-1 rounded border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                      />
                      <input
                        type="number"
                        value={role.count}
                        onChange={(e) => handleRoleChange(idx, 'count', Number(e.target.value))}
                        className={`text-xs w-20 px-2 py-1 rounded border focus:outline-none ${
                          isLight
                            ? 'bg-white border-blue-200 text-slate-900'
                            : 'bg-[#0f0f0f] border-blue-950 text-white'
                        }`}
                        title="عدد الأعضاء في هذه الرتبة"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteRole(idx)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddRole}
                className="w-full py-2 rounded-xl border border-dashed border-blue-900/60 text-xs font-semibold text-blue-500 hover:bg-blue-950/20 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة رتبة جديدة</span>
              </button>
            </div>
          )}

          <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-blue-100' : 'border-blue-950'}`}>
            <button
              type="button"
              onClick={() => {
                setFormData(DEFAULT_DISCORD_CONFIG);
                onReset();
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة إعدادات ديسكورد الافتراضية</span>
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
