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
            <div className="group relative overflow-hidden rounded-2xl bg-pepsi-surface border border-[#333] hover:border-pepsi-blue/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,112,255,0.2)]">
                {/* Card Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
                    <Image
                        src={companion.avatar_url}
                        alt={companion.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white">
                                {companion.name}
                            </h3>
                            {companion.is_online && (
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
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
                                    className="px-2 py-0.5 rounded-full bg-pepsi-blue/20 text-pepsi-blue text-xs font-medium border border-pepsi-blue/30"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={handleChatClick}
                            className="w-full rounded-xl bg-pepsi-blue px-4 py-3 font-bold text-white shadow-[0_0_15px_rgba(0,112,255,0.3)] hover:bg-[#005ccc] hover:shadow-[0_0_20px_rgba(0,112,255,0.5)] transition-all"
                        >
                            {isAuthenticated ? 'Chat Now' : 'Sign In to Chat'}
                        </button>
                    </div>

                    {/* Hover Highlight */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-pepsi-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
