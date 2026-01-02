"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    Squares2X2Icon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function MobileNav({ isAuthenticated }: { isAuthenticated: boolean }) {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[#333] bg-pepsi-surface/95 backdrop-blur-lg px-2 py-3 md:hidden">
            <MobileNavItem href="/dashboard" icon={<HomeIcon className="w-6 h-6" />} label="Home" active={pathname === "/dashboard"} />
            <MobileNavItem href="#" icon={<Squares2X2Icon className="w-6 h-6" />} label="Explore" />
            <MobileNavItem href="#" icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />} label="Chat" />

            {isAuthenticated ? (
                <MobileNavItem href="#" icon={<UserIcon className="w-6 h-6" />} label="Profile" />
            ) : (
                <Link
                    href="/login"
                    className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-gray-400 hover:text-pepsi-blue"
                >
                    <div className="rounded-full bg-pepsi-blue/10 p-1.5 text-pepsi-blue">
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    </div>
                    <span>Sign In</span>
                </Link>
            )}
        </nav>
    );
}

function MobileNavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${active ? "text-pepsi-blue" : "text-gray-400 hover:text-white"
                }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
