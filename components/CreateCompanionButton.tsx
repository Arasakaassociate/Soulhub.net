"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CreateCompanionModal from "./CreateCompanionModal";

export default function CreateCompanionButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-pepsi-blue px-4 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(0,112,255,0.4)] hover:shadow-[0_0_25px_rgba(0,112,255,0.6)] hover:bg-[#0060df] transition-all"
            >
                <Plus className="h-5 w-5" />
                <span className="hidden md:inline">Create Soul</span>
            </button>
            <CreateCompanionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
