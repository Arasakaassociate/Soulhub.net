import { createClient } from "@/utils/supabase/server";
import MobileNav from "@/components/MobileNav";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="flex min-h-screen bg-pepsi-dark text-white">
            {/* Collapsible Sidebar (Desktop) */}
            <DashboardSidebar isAuthenticated={!!user} />

            {/* Mobile Nav (Bottom) */}
            <MobileNav isAuthenticated={!!user} />

            {/* Main Content - Dynamic margin based on sidebar state */}
            <main className="flex-1 ml-0 md:ml-20 mb-16 md:mb-0 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
