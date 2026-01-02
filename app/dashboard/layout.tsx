import Link from "next/link";
import {
    HomeIcon,
    Squares2X2Icon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    async function handleSignOut() {
        'use server'
        const supabase = createClient();
        await supabase.auth.signOut();
        redirect('/');
    }

    return (
        <div className="flex min-h-screen bg-pepsi-dark text-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#333] bg-pepsi-surface p-4 hidden md:flex md:flex-col">
                <div className="mb-8 px-4 py-2">
                    <Link href="/">
                        <h1 className="bg-gradient-to-r from-pepsi-blue to-white bg-clip-text text-2xl font-black text-transparent italic cursor-pointer">
                            SoulHub
                        </h1>
                    </Link>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem href="/dashboard" icon={<HomeIcon className="w-5 h-5" />} label="Home" active />
                    <NavItem href="#" icon={<Squares2X2Icon className="w-5 h-5" />} label="Explore" />
                    <NavItem href="#" icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} label="Chat" />
                    {user && <NavItem href="#" icon={<UserIcon className="w-5 h-5" />} label="Profile" />}
                    {user && <NavItem href="#" icon={<Cog6ToothIcon className="w-5 h-5" />} label="Settings" />}
                </nav>

                <div className="border-t border-[#333] pt-4">
                    {user ? (
                        <form action={handleSignOut}>
                            <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 hover:bg-[#252525] hover:text-white transition-all">
                                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                                Sign Out
                            </button>
                        </form>
                    ) : (
                        <Link href="/login" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium bg-pepsi-blue text-white hover:bg-[#005ccc] transition-all">
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            Sign In
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${active
                ? "bg-pepsi-blue text-white shadow-[0_0_15px_rgba(0,112,255,0.4)]"
                : "text-gray-400 hover:bg-[#252525] hover:text-white"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}
