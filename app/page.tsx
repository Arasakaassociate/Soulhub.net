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
            <Link href="/">
              <h1 className="bg-gradient-to-r from-pepsi-blue to-white bg-clip-text text-2xl font-black text-transparent italic cursor-pointer">
                SoulHub
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-pepsi-blue text-white text-sm font-bold shadow-[0_0_20px_rgba(0,112,255,0.3)] hover:bg-[#005ccc] hover:shadow-[0_0_25px_rgba(0,112,255,0.5)] transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Enhanced Animated background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pepsi-blue/20 via-pepsi-dark to-pepsi-dark opacity-70" />

        {/* Multiple animated orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pepsi-blue/40 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge with animation */}
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-pepsi-blue/30 bg-pepsi-blue/10 backdrop-blur-md animate-fade-in">
              <span className="text-sm font-medium text-pepsi-blue tracking-wide uppercase">Next Gen AI Companionship</span>
            </div>

            {/* Enhanced heading with glow */}
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight animate-slide-up">
              Your Soul&apos;s Digital
              <br />
              <span className="bg-gradient-to-r from-pepsi-blue via-cyan-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,112,255,0.5)] animate-glow">
                Reflection
              </span>
            </h2>

            {/* Enhanced description */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Connect with hyper-realistic AI personalities that understand, remember, and grow with you.
            </p>

            {/* Enhanced buttons with better hover effects */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/dashboard"
                className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-pepsi-blue to-cyan-500 text-white font-bold text-lg shadow-[0_0_40px_rgba(0,112,255,0.4)] hover:shadow-[0_0_60px_rgba(0,112,255,0.7)] hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Start Exploring</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pepsi-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/login"
                className="group w-full sm:w-auto px-10 py-5 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300"
              >
                Create Account
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              No credit card required · Free tier available
            </p>
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
