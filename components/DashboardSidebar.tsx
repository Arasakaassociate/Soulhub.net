"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    Squares2X2Icon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { signOut } from "@/app/dashboard/auth-actions";

interface DashboardSidebarProps {
    isAuthenticated: boolean;
}

export default function DashboardSidebar({ isAuthenticated }: DashboardSidebarProps) {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);

    const navItems = [
        { href: "/dashboard", icon: HomeIcon, label: "Home" },
        { href: "#", icon: Squares2X2Icon, label: "Explore" },
        { href: "#", icon: ChatBubbleLeftRightIcon, label: "Chat" },
    ];

    const userItems = isAuthenticated ? [
        { href: "#", icon: UserIcon, label: "Profile" },
        { href: "#", icon: Cog6ToothIcon, label: "Settings" },
    ] : [];

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <aside
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={`fixed left-0 top-0 h-screen border-r border-[#333] bg-pepsi-surface p-4 hidden md:flex md:flex-col transition-all duration-300 z-40 ${isExpanded ? 'w-64' : 'w-20'
                }`}
        >
            {/* Logo */}
            <div className="mb-8 px-2 py-2 overflow-hidden">
                <Link href="/">
                    {isExpanded ? (
                        <h1 className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-2xl font-black text-transparent italic whitespace-nowrap">
                            SoulHub
                        </h1>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 font-bold text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                            S
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.href}
                        href={item.href}
                        icon={<item.icon className="w-5 h-5" />}
                        label={item.label}
                        active={pathname === item.href}
                        isExpanded={isExpanded}
                    />
                ))}
                {userItems.map((item) => (
                    <NavItem
                        key={item.href}
                        href={item.href}
                        icon={<item.icon className="w-5 h-5" />}
                        label={item.label}
                        active={pathname === item.href}
                        isExpanded={isExpanded}
                    />
                ))}
            </nav>

            {/* Sign In/Out */}
            <div className="border-t border-[#333] pt-4">
                {isAuthenticated ? (
                    <button
                        onClick={handleSignOut}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 hover:bg-[#252525] hover:text-white transition-all ${!isExpanded && 'justify-center'
                            }`}
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
                        {isExpanded && <span>Sign Out</span>}
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium bg-pepsi-blue text-white hover:bg-[#005ccc] transition-all ${!isExpanded && 'justify-center'
                            }`}
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
                        {isExpanded && <span>Sign In</span>}
                    </Link>
                )}
            </div>
        </aside>
    );
}

function NavItem({ href, icon, label, active = false, isExpanded }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    isExpanded: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${active
                ? "bg-pepsi-blue text-white shadow-[0_0_15px_rgba(0,112,255,0.4)]"
                : "text-gray-400 hover:bg-[#252525] hover:text-white"
                } ${!isExpanded && 'justify-center'}`}
        >
            <span className="flex-shrink-0">{icon}</span>
            {isExpanded && <span className="whitespace-nowrap">{label}</span>}
        </Link>
    );
}

