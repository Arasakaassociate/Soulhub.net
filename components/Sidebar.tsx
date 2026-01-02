"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Compass, Image as ImageIcon, LogOut, Settings } from "lucide-react";
import clsx from "clsx";

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Chat", href: "/chat", icon: MessageCircle },
        { name: "Discover", href: "/discover", icon: Compass },
        { name: "Gallery", href: "/gallery", icon: ImageIcon },
    ];

    // Hide sidebar on login page
    if (pathname === "/login") return null;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-20 flex flex-col items-center justify-between border-r border-[#1F1F1F] bg-pepsi-surface py-6">
            <div className="flex flex-col items-center gap-8">
                {/* Logo Placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pepsi-blue font-bold text-white shadow-[0_0_15px_rgba(0,112,255,0.5)]">
                    S
                </div>

                {/* Navigation */}
                <nav className="flex flex-col items-center gap-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                                    isActive
                                        ? "bg-[#252525] text-pepsi-blue shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                {isActive && (
                                    <div className="absolute -right-1 top-2 h-1.5 w-1.5 rounded-full bg-pepsi-blue shadow-[0_0_8px_#0070FF]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="flex flex-col items-center gap-6">
                <button className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-colors hover:text-white">
                    <Settings className="h-5 w-5" />
                </button>
                <Link href="/login" className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-colors hover:text-red-400">
                    <LogOut className="h-5 w-5" />
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
