import DashboardGrid from "@/components/DashboardGrid";
import Link from "next/link";
import { Sparkles, Users, Shield } from "lucide-react";

export default function HomePage() {
  // Mock companions for public preview
  const mockCompanions = [
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

  return (
    <div className="min-h-screen bg-pepsi-dark">
      {/* Navigation */}
      <nav className="border-b border-[#333] bg-pepsi-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="bg-gradient-to-r from-pepsi-blue to-white bg-clip-text text-2xl font-black text-transparent italic">
              SoulHub
            </h1>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="px-6 py-2 rounded-xl bg-pepsi-blue text-white text-sm font-bold shadow-[0_0_20px_rgba(0,112,255,0.3)] hover:bg-[#005ccc] hover:shadow-[0_0_25px_rgba(0,112,255,0.5)] transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pepsi-blue/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your AI Companions,
              <span className="bg-gradient-to-r from-pepsi-blue to-cyan-400 bg-clip-text text-transparent"> Reimagined</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Connect with hyper-realistic AI personalities. Chat, create, and explore a new dimension of digital companionship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl bg-pepsi-blue text-white font-bold shadow-[0_0_30px_rgba(0,112,255,0.4)] hover:bg-[#005ccc] hover:shadow-[0_0_40px_rgba(0,112,255,0.6)] transition-all"
              >
                Explore Companions
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 rounded-xl border-2 border-pepsi-blue/30 text-pepsi-blue font-bold hover:bg-pepsi-blue/10 transition-all"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="AI-Generated Avatars"
            description="Create stunning, hyper-realistic companions with our advanced AI image generation."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Personalized Conversations"
            description="Each companion has unique personality traits and conversational styles."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Private & Secure"
            description="Your conversations are protected with enterprise-grade security."
          />
        </div>
      </section>

      {/* Preview Companions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Featured Companions</h3>
          <p className="text-gray-400">Discover your perfect AI companion</p>
        </div>
        <DashboardGrid companions={mockCompanions} />
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#333] bg-pepsi-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Begin?</h3>
          <p className="text-xl text-gray-400 mb-8">Join thousands experiencing the future of AI companionship</p>
          <Link
            href="/login"
            className="inline-block px-10 py-4 rounded-xl bg-pepsi-blue text-white font-bold text-lg shadow-[0_0_30px_rgba(0,112,255,0.4)] hover:bg-[#005ccc] hover:shadow-[0_0_40px_rgba(0,112,255,0.6)] transition-all"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-pepsi-surface border border-[#333] rounded-2xl p-6 hover:border-pepsi-blue/30 transition-all">
      <div className="text-pepsi-blue mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
