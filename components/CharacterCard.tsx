"use client";

import { useState } from "react";
import ChatOverlay from "./ChatOverlay";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CharacterCardProps {
    companion: {
        id: number | string;
        name: string;
        description: string;
        avatar_url: string;
        is_online: boolean;
        tags: string[];
    };
    isAuthenticated?: boolean;
}

export default function CharacterCard({ companion, isAuthenticated = false }: CharacterCardProps) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const router = useRouter();

    const handleChatClick = () => {
        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            router.push('/login');
            return;
        }
        setIsChatOpen(true);
    };

    return (
        <>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pepsi-surface/80 to-pepsi-surface/40 backdrop-blur-xl border border-[#333] hover:border-pepsi-blue/70 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,112,255,0.3)] hover:-translate-y-2">
                {/* Card Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
                    <Image
                        src={companion.avatar_url}
                        alt={companion.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent group-hover:from-black/80 transition-all duration-500" />

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pepsi-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-pepsi-blue transition-colors duration-300">
                                {companion.name}
                            </h3>
                            {companion.is_online && (
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e] animate-pulse" />
                            )}
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-300 font-light leading-relaxed">
                            {companion.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {companion.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-full bg-pepsi-blue/20 text-pepsi-blue text-xs font-medium border border-pepsi-blue/30 backdrop-blur-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={handleChatClick}
                            className="w-full rounded-xl bg-gradient-to-r from-pepsi-blue to-cyan-500 px-4 py-3 font-bold text-white shadow-[0_0_20px_rgba(0,112,255,0.4)] hover:shadow-[0_0_30px_rgba(0,112,255,0.7)] hover:scale-105 transition-all duration-300"
                        >
                            {isAuthenticated ? 'Chat Now' : 'Sign In to Chat'}
                        </button>
                    </div>

                    {/* Animated bottom accent */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-pepsi-blue to-cyan-500 transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(0,112,255,0.8)]" />
                </div>
            </div>

            {isChatOpen && isAuthenticated && (
                <ChatOverlay
                    companion={{
                        id: companion.id,
                        name: companion.name,
                        description: companion.description,
                        imageUrl: companion.avatar_url
                    }}
                    onClose={() => setIsChatOpen(false)}
                />
            )}
        </>
    );
}
