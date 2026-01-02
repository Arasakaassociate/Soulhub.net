import DashboardGrid from "@/components/DashboardGrid";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CreateCompanionButton from "@/components/CreateCompanionButton";

export default async function DashboardPage() {
    const supabase = createClient();

    // Check Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Mock Data Implementation (Premium "Pepsi" Tier)
    const getMockCompanions = () => [
        {
            id: '1',
            name: 'Elara',
            description: 'The Muse. Ultra-realistic 8K HD portrait of a sophisticated woman in a emerald green couture gown. She inspires your deepest creativity.',
            avatar_url: 'https://images.unsplash.com/photo-1642396974246-9524fa9c9c34?q=80&w=600&auto=format&fit=crop',
            is_online: true,
            tags: ['Creative', 'Luxury', 'Artistic']
        },
        {
            id: '2',
            name: 'Atlas',
            description: 'The Visionary. Dynamic, hyper-realistic portrait in a futuristic luxury outfit with neon accents. Logic and code are his playground.',
            avatar_url: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=600&auto=format&fit=crop',
            is_online: false,
            tags: ['Technical', 'Logic', 'Futuristic']
        },
        {
            id: '3',
            name: 'Kaori',
            description: 'The Zen Guide. Intimate close-up in a cream-colored cashmere turtleneck. She brings understated luxury and mindfulness to your day.',
            avatar_url: 'https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?q=80&w=600&auto=format&fit=crop',
            is_online: true,
            tags: ['Wellness', 'Calm', 'Mindfulness']
        },
        {
            id: '4',
            name: 'Liam',
            description: 'The Elite Coach. Golden hour glow on a luxury yacht deck. He pushes you to achieve your peak physical and mental form.',
            avatar_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa928d33?q=80&w=600&auto=format&fit=crop',
            is_online: false,
            tags: ['Fitness', 'Energy', 'Elite']
        }
    ];

    let companions = [];
    let fetchError = null;

    try {
        const { data, error } = await supabase
            .from('companions')
            .select('*');

        if (error) throw error;
        companions = data || [];
    } catch (e) {
        console.error("Database connection failed or empty, using mock data:", e);
        fetchError = e;
    }

    // Fallback if DB is empty or failed
    if (!companions || companions.length === 0) {
        companions = getMockCompanions();
    }

    return (
        <div className="min-h-screen p-8 pt-12">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold text-white">Explore AI Characters</h1>
                <div className="flex items-center gap-4">
                    <CreateCompanionButton />
                    {/* Filter Chips Placeholder */}
                    <div className="hidden md:flex gap-2">
                        {['All', 'Realistic', 'Anime', 'Roleplay'].map((filter) => (
                            <button key={filter} className="rounded-full bg-pepsi-surface border border-transparent px-4 py-1.5 text-sm text-gray-300 hover:border-pepsi-blue hover:text-white transition-all">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <DashboardGrid companions={companions || []} />
        </div>
    );
}
