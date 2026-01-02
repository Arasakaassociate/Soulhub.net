"use client";

import { useState } from "react";
import CharacterCard from "./CharacterCard";
import ChatOverlay from "./ChatOverlay";

interface Companion {
    id: string;
    name: string;
    description: string;
    avatar_url: string;
    is_online: boolean;
}

interface DashboardGridProps {
    companions: Companion[];
}

export default function DashboardGrid({ companions }: DashboardGridProps) {
    const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {companions && companions.length > 0 ? (
                    companions.map((char) => (
                        <div key={char.id} onClick={() => setSelectedCompanion(char)} className="cursor-pointer">
                            <CharacterCard
                                name={char.name}
                                age={25} // Placeholder or from DB
                                description={char.description}
                                imageUrl={char.avatar_url}
                                isOnline={char.is_online}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 mt-12">
                        <p className="text-xl">No characters found.</p>
                        <p className="text-sm">Be the first to create one!</p>
                    </div>
                )}
            </div>

            {selectedCompanion && (
                <ChatOverlay
                    companion={{
                        id: selectedCompanion.id,
                        name: selectedCompanion.name,
                        description: selectedCompanion.description,
                        imageUrl: selectedCompanion.avatar_url
                    }}
                    onClose={() => setSelectedCompanion(null)}
                />
            )}
        </>
    );
}
