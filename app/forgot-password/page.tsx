'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Check your email for the password reset link.' });
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-pepsi-dark p-4">
            <div className="w-full max-w-md rounded-2xl bg-pepsi-surface p-8 shadow-2xl border border-[#333]">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-gray-400">Enter your email to receive a reset link</p>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg mb-6 text-sm text-center ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleReset} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-[#333] bg-[#0F0F0F] px-4 py-3 text-white placeholder-gray-500 focus:border-pepsi-blue focus:outline-none focus:ring-1 focus:ring-pepsi-blue transition-all"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-pepsi-blue py-3.5 font-bold text-white shadow-[0_0_20px_rgba(0,112,255,0.3)] hover:bg-[#005ccc] hover:shadow-[0_0_25px_rgba(0,112,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending Link...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
