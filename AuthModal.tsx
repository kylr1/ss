import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, X, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { ThemeMode } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  masterPin: string;
  onUpdatePin: (newPin: string) => void;
  onShowToast: (msg: string) => void;
  theme: ThemeMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isUnlocked,
  onUnlock,
  onLock,
  masterPin,
  onUpdatePin,
  onShowToast,
  theme,
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Changing PIN sub-state
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [currentPinCheck, setCurrentPinCheck] = useState('');
  const [newPinInput, setNewPinInput] = useState('');

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === masterPin) {
      onUnlock();
      setErrorMsg(null);
      setPinInput('');
      onShowToast('تم تفعيل وضع التعديل لهذا الجهاز بنجاح! 🔓');
      onClose();
    } else {
      setErrorMsg('الرمز السري غير صحيح! يرجى المحاولة مجدداً.');
    }
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPinCheck.trim() !== masterPin) {
      setErrorMsg('الرمز السري الحالي غير صحيح.');
      return;
    }
    if (newPinInput.trim().length < 4) {
      setErrorMsg('الرمز الجديد يجب أن يتكون من 4 أرقام/حروف على الأقل.');
      return;
    }
    onUpdatePin(newPinInput.trim());
    setIsChangingPin(false);
    setCurrentPinCheck('');
    setNewPinInput('');
    setErrorMsg(null);
    onShowToast('تم تحديث الرمز السري بنجاح! 🔐');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
          isLight
            ? 'bg-white border-blue-200 text-slate-800'
            : 'bg-[#0a0a0a] border-blue-950 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 p-2 rounded-lg transition-colors ${
            isLight
              ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-blue-950/50'
          }`}
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
              isUnlocked
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-blue-600/10 border-blue-600/30 text-blue-600'
            }`}
          >
            {isUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <h3 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isUnlocked ? 'وضع المالك والتعديل مفعّل' : 'الرمز السري للتحكم والتعديل'}
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {isUnlocked
                ? 'هذا الجهاز مصرح له بتعديل كل القوائم والمعلومات.'
                : 'أدخل الرمز السري الخاص بك لتعديل أي قائمة في الموقع.'}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-500 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isUnlocked ? (
          <div className="space-y-4 pt-2">
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-emerald-950/20 border-emerald-900/40'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>أنت مسجل كمالك الموقع</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                أزرار "تعديل هذا القسم ✏️" ظاهرة الآن في كل قائمة ويمكنك تغيير أي نص أو رابط أو مواصفة.
              </p>
            </div>

            {!isChangingPin ? (
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setIsChangingPin(true)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors ${
                    isLight
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-[#0f0f0f] hover:bg-[#1a1a1a] text-blue-300 border-blue-950'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>تغيير الرمز السري الحالي</span>
                </button>

                <button
                  onClick={() => {
                    onLock();
                    onShowToast('تم قفل التعديل وتسجيل الخروج.');
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>قفل التعديل على هذا الجهاز (وضع الزائر)</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleChangePinSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs mb-1 font-semibold text-slate-400">
                    الرمز السري الحالي
                  </label>
                  <input
                    type="password"
                    value={currentPinCheck}
                    onChange={(e) => setCurrentPinCheck(e.target.value)}
                    placeholder="أدخل رمزك الحالي"
                    required
                    className={`w-full px-3 py-2 rounded-xl text-xs border focus:border-blue-500 focus:outline-none ${
                      isLight
                        ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                        : 'bg-[#0f0f0f] border-blue-950 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1 font-semibold text-slate-400">
                    الرمز السري الجديد
                  </label>
                  <input
                    type="text"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="أدخل رمزك الجديد (مثال: 1200 أو كود خاص)"
                    required
                    className={`w-full px-3 py-2 rounded-xl text-xs border focus:border-blue-500 focus:outline-none ${
                      isLight
                        ? 'bg-blue-50/30 border-blue-200 text-slate-900'
                        : 'bg-[#0f0f0f] border-blue-950 text-white'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsChangingPin(false)}
                    className="flex-1 py-2 rounded-xl text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-md"
                  >
                    حفظ الرمز الجديد
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={handleVerifyPin} className="space-y-4 pt-2">
            <div>
              <label
                className={`block text-xs mb-1 font-semibold ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                أدخل الرمز السري:
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="أدخل الرمز السري (الافتراضي: 1200)"
                autoFocus
                required
                className={`w-full px-4 py-3 rounded-xl text-sm border font-mono tracking-widest text-center focus:border-blue-500 focus:outline-none ${
                  isLight
                    ? 'bg-blue-50/40 border-blue-200 text-slate-900 placeholder:text-slate-400 placeholder:font-sans placeholder:tracking-normal'
                    : 'bg-[#0f0f0f] border-blue-950 text-white placeholder:text-slate-600 placeholder:font-sans placeholder:tracking-normal'
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                💡 الرمز السري الحالي هو: <strong className="text-blue-500 font-mono">1200</strong> (ويمكنك تغييره بعد الدخول).
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all"
              >
                <Unlock className="w-4 h-4" />
                <span>تأكيد والفتح</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
