'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-pepsi-dark p-4">
            <div className="w-full max-w-md rounded-2xl bg-pepsi-surface p-8 shadow-2xl border border-[#333]">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
                    <p className="text-gray-400">Enter your new password below</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-[#333] bg-[#0F0F0F] px-4 py-3 text-white placeholder-gray-500 focus:border-pepsi-blue focus:outline-none focus:ring-1 focus:ring-pepsi-blue transition-all"
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    {error && (
                        <div className="p-4 rounded-lg bg-red-500/10 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-pepsi-blue py-3.5 font-bold text-white shadow-[0_0_20px_rgba(0,112,255,0.3)] hover:bg-[#005ccc] hover:shadow-[0_0_25px_rgba(0,112,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
