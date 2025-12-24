import React, { useEffect, useMemo, useRef, useState } from 'react';

interface OtpScreenProps {
  phone: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({ phone, onVerify, onResend }) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const maskedPhone = useMemo(() => {
    if (!phone) return '';
    const last = phone.slice(-4);
    return `${phone.slice(0, 2)}•••-${last}`;
  }, [phone]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
    if (next.every((c) => c.length === 1)) {
      onVerify?.(next.join(''));
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    onResend?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-sm text-gray-600">Code sent to {maskedPhone}</p>
        </div>
        <div className="flex gap-3 justify-between" role="group" aria-label="OTP inputs">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputs.current[idx] = el;
              }}
              value={digit}
              maxLength={1}
              inputMode="numeric"
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-12 h-12 text-center text-lg rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Digit ${idx + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onVerify?.(code.join(''))}
          className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Verify
        </button>
        <button
          type="button"
          onClick={handleResend}
          className="w-full py-3 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition disabled:opacity-50"
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default OtpScreen;
