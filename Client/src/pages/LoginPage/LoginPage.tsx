import React from "react";
import { User, KeyRound } from 'lucide-react';
const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex bg-slate-100">
      {/* Left: image */}
      <div className="hidden md:block md:flex-1 overflow-hidden">
        <img
          src="../../public/img/loginbg.jpg"
          alt="Jewelry"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-10 lg:px-16 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl px-8 py-8 md:px-10 md:py-10 space-y-6">
          <h2 className="text-3xl font-bold text-center text-slate-900">
            Login
          </h2>

          {/* Username */}
          <div className="space-y-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-full border border-slate-300/80 bg-white/80 px-4 py-3 pr-11 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-lg text-slate-500/80">
                <User/>
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-full border border-slate-300/80 bg-white/80 px-4 py-3 pr-11 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-lg text-slate-500/80">
                <KeyRound/>
              </span>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-[13px] text-slate-600">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border border-slate-400 text-sky-600 focus:ring-0"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="text-slate-700 hover:text-sky-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="button"
            className="mt-1 w-full rounded-full bg-slate-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-600"
          >
            Login
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="h-px flex-1 bg-slate-300/70" />
            <span>Or</span>
            <div className="h-px flex-1 bg-slate-300/70" />
          </div>

          {/* Google button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-200 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-300"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[14px] font-bold text-red-500">
              <img
                src = "../../../public/img/google.png"
                alt="Google Logo"
                className="h-full w-full object-cover"
              />
            </span>
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
