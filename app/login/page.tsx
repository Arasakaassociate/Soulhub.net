'use client';

import Link from "next/link";
import { login, signup } from "./actions";
import { useState } from "react";
// import { useFormState } from "react-dom"; // Available in newer Next.js versions, but for stability with 14.2 I'll use simple transition or just event handlers wrapping the action if needed, or better: use useTransition with the action.

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(formData: FormData) {
        setLoading(true);
        setError(null);

        const response = await login(formData);
        if (response?.error) {
            setError(response.error);
            setLoading(false);
        }
    }

    async function handleSignup(formData: FormData) {
        setLoading(true);
        setError(null);

        const response = await signup(formData);
        if (response?.error) {
            setError(response.error);
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-pepsi-dark bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#121212] to-[#0a0a0a] p-4">
            <div className="w-full max-w-md rounded-2xl bg-pepsi-surface p-8 shadow-2xl border border-[#333]">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue your journey</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="w-full rounded-xl border border-[#333] bg-[#0F0F0F] px-4 py-3 text-white placeholder-gray-500 focus:border-pepsi-blue focus:outline-none focus:ring-1 focus:ring-pepsi-blue transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="w-full rounded-xl border border-[#333] bg-[#0F0F0F] px-4 py-3 text-white placeholder-gray-500 focus:border-pepsi-blue focus:outline-none focus:ring-1 focus:ring-pepsi-blue transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        formAction={handleLogin}
                        disabled={loading}
                        className="w-full rounded-xl bg-pepsi-blue py-3.5 font-bold text-white shadow-[0_0_20px_rgba(0,112,255,0.3)] hover:bg-[#005ccc] hover:shadow-[0_0_25px_rgba(0,112,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Sign In'}
                    </button>

                    <button
                        formAction={handleSignup}
                        disabled={loading}
                        className="w-full rounded-xl border border-pepsi-blue/30 py-3.5 font-bold text-pepsi-blue hover:bg-pepsi-blue/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
                </div>
            </div>
        </div>
    );
}
