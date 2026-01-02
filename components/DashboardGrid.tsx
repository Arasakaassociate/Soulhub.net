"use client";

import CharacterCard from "./CharacterCard";

interface Companion {
    id: string | number;
    name: string;
    description: string;
    avatar_url: string;
    is_online: boolean;
    tags: string[];
}

interface DashboardGridProps {
    companions: Companion[];
    isAuthenticated?: boolean;
}

export default function DashboardGrid({ companions, isAuthenticated = false }: DashboardGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {companions && companions.length > 0 ? (
                companions.map((companion) => (
                    <CharacterCard
                        key={companion.id}
                        companion={companion}
                        isAuthenticated={isAuthenticated}
                    />
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500 mt-12">
                    <p className="text-xl">No characters found.</p>
                    <p className="text-sm">Be the first to create one!</p>
                </div>
            )}
        </div>
    );
}
