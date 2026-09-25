import React from 'react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { SocialAccount, ThemeMode } from '../types';

interface QrCodeModalProps {
  account: SocialAccount | null;
  onClose: () => void;
  onCopy: (text: string) => void;
  copiedText: string | null;
  theme: ThemeMode;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  account,
  onClose,
  onCopy,
  copiedText,
  theme,
}) => {
  if (!account) return null;

  const isLight = theme === 'light';
  const isCopied = copiedText === account.handle;

  // Generate an SVG-based simulated QR code pattern that looks sharp and authentic
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    account.url
  )}&bgcolor=${isLight ? 'ffffff' : '050505'}&color=2563eb&margin=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${
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

        <div className="text-center mt-2">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-3 ${
              isLight
                ? 'bg-blue-50 border-blue-200'
                : 'bg-blue-950/80 border-blue-800/60'
            }`}
          >
            <span className="text-xl font-bold" style={{ color: account.color }}>
              #
            </span>
          </div>

          <h3
            className={`text-xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            رمز QR لحساب {account.arabicName}
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-5 font-mono dir-ltr">
            {account.handle}
          </p>

          <div
            className={`relative mx-auto w-56 h-56 p-3 rounded-xl border flex items-center justify-center shadow-inner ${
              isLight
                ? 'bg-slate-50 border-blue-100'
                : 'bg-[#000000] border-blue-950'
            }`}
          >
            <img
              src={qrSvgUrl}
              alt={`QR Code for ${account.name}`}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Fallback pattern if image cannot be loaded */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none -z-10">
              <span className="text-xs text-blue-500 font-medium">امسح الكود لفتح الحساب مباشرة</span>
            </div>
          </div>

          <p
            className={`text-xs mt-4 leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            وجّه كاميرا هاتفك لمسح الكود والانتقال فوراً لصفحة {account.arabicName}.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={() => onCopy(account.handle)}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                isLight
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-blue-950/70 hover:bg-blue-900/80 border-blue-800/40 text-blue-200'
              }`}
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'تم النسخ!' : 'نسخ المعرف'}</span>
            </button>

            <a
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>فتح الحساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
