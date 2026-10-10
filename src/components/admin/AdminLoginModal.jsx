import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Lock, ShieldCheck, KeyRound, Phone, AlertCircle, CheckCircle, Smartphone, ArrowRight, RefreshCw, Send } from 'lucide-react';

export const AdminLoginModal = () => {
  const { 
    isAdminLoginOpen, 
    setIsAdminLoginOpen, 
    requestOwnerOtp, 
    verifyOwnerOtp, 
    otpNotice, 
    setOtpNotice,
    settings,
    language 
  } = useStore();

  const isHindi = language === 'hi';

  const [step, setStep] = useState(1); // 1: Phone/ID Input, 2: OTP Entry
  const [phoneOrId, setPhoneOrId] = useState('9315250405');
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isAdminLoginOpen) return null;

  const handleRequestOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = requestOwnerOtp(phoneOrId);
      setIsLoading(false);
      if (res.success) {
        setStep(2);
        setCountdown(60);
      } else {
        setErrorMsg(res.message || "अनधिकृत क्रेडेंशियल! केवल पंजीकृत मालिक ही प्रवेश कर सकते हैं।");
      }
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const ok = verifyOwnerOtp(otp);
    if (!ok) {
      setErrorMsg(isHindi ? "गलत OTP या पिन दर्ज किया गया। कृपया पुनः प्रयास करें।" : "Invalid OTP or Security PIN. Try again.");
    } else {
      setStep(1);
      setOtp('');
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    const res = requestOwnerOtp(phoneOrId);
    if (res.success) {
      setCountdown(60);
      setErrorMsg('');
    }
  };

  const handleQuickBypass = () => {
    // Quick owner access for demo
    verifyOwnerOtp('784512');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Live Simulated OTP Notification Banner Toast */}
      {otpNotice && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 w-full max-w-md p-4 bg-stone-900 border-2 border-amber-500 rounded-2xl shadow-2xl shadow-amber-500/20 animate-bounce">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  SMS / WhatsApp to {otpNotice.phone}
                </span>
                <p className="text-xs font-bold text-white mt-0.5">
                  Your SK Enterprises Admin Secure OTP is: <span className="text-amber-400 font-mono text-base font-black tracking-widest">{otpNotice.otp}</span>
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">Valid for 10 minutes. Do not share.</p>
              </div>
            </div>
            <button
              onClick={() => setOtpNotice(null)}
              className="text-stone-500 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div 
        className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAdminLoginOpen(false);
            setStep(1);
            setErrorMsg('');
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-red-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-900/40">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            {isHindi ? "सुरक्षित मालिक पोर्टल" : "Restricted Owner Gate"}
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            {step === 1 ? (isHindi ? "मालिक सत्यापन" : "Owner Verification") : (isHindi ? "सुरक्षा OTP दर्ज करें" : "Enter Secure OTP")}
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            {step === 1 
              ? (isHindi ? "केवल शिवम कुमार के पंजीकृत मोबाइल पर OTP भेजा जाएगा।" : "Authorized strictly for Shivam Kumar (Director).")
              : (isHindi ? `6-अंकों का OTP ${phoneOrId} पर भेजा गया है।` : `6-digit security code sent to ${phoneOrId}`)}
          </p>
        </div>

        {/* Step 1: Registered Phone or Secret ID */}
        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-300 block mb-1.5 flex items-center justify-between">
                <span>{isHindi ? "पंजीकृत मोबाइल या मालिक ID" : "Registered Phone or Owner ID"}</span>
                <span className="text-[10px] text-amber-400 font-mono">9315250405 / 9304822631</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. 9315250405 or SHIVAM_SK"
                  value={phoneOrId}
                  onChange={(e) => setPhoneOrId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-stone-950 font-black text-sm shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? (isHindi ? "सत्यापन जारी है..." : "Sending OTP...") : (isHindi ? "सुरक्षा OTP भेजें" : "Send Security OTP")}</span>
            </button>

            {/* Quick Demo Bypass */}
            <button
              type="button"
              onClick={handleQuickBypass}
              className="w-full py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-400 font-bold text-xs border border-stone-700 transition-colors"
            >
              ⚡ {isHindi ? "1-क्लिक मालिक बाईपास (Direct Demo)" : "1-Click Direct Owner Entry (Master Key)"}
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-300 block mb-1.5 flex items-center justify-between">
                <span>{isHindi ? "6-अंकों का OTP कोड" : "6-Digit Security OTP"}</span>
                <span className="text-[10px] text-amber-400">Master PIN: 784512</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-center font-mono tracking-widest text-xl font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white font-black text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isHindi ? "OTP सत्यापित करें व डैशबोर्ड खोलें" : "Verify OTP & Open Dashboard"}</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-stone-400 hover:text-white"
              >
                ← {isHindi ? "नंबर बदलें" : "Change Number"}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className={`flex items-center gap-1 ${
                  countdown > 0 ? 'text-stone-500 cursor-not-allowed' : 'text-amber-400 hover:underline'
                }`}
              >
                <RefreshCw className="w-3 h-3" />
                <span>{countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}</span>
              </button>
            </div>
          </form>
        )}

        {/* Security Warning */}
        <div className="mt-6 pt-4 border-t border-stone-800 text-center text-[10px] text-stone-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Multi-factor authentication for SK Enterprises Owner</span>
        </div>

      </div>
    </div>
  );
};
