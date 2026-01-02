import DashboardGrid from "@/components/DashboardGrid";
import Link from "next/link";
import { Sparkles, Users, Shield } from "lucide-react";
import RotatingText from "@/components/RotatingText";

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
            {/* Left: Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Center: Rotating Text */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <RotatingText />
            </div>

            {/* Right: Logo */}
            <Link href="/">
              <h1 className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-2xl font-black text-transparent italic cursor-pointer">
                SoulHub
              </h1>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Enhanced Animated background effects - Romantic colors */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/15 via-pepsi-dark to-pepsi-dark opacity-70" />

        {/* Multiple animated orbs for depth - Romantic palette */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/25 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-400/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge with animation - Romantic theme */}
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md animate-fade-in">
              <span className="text-sm font-medium text-pink-400 tracking-wide uppercase">Intimate AI Companionship</span>
            </div>

            {/* Enhanced heading with glow - Romantic colors */}
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight animate-slide-up">
              Your Soul&apos;s Digital
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.5)] animate-glow">
                Reflection
              </span>
            </h2>

            {/* Enhanced description - More romantic */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Experience genuine connection with AI companions who truly understand your heart and soul.
            </p>

            {/* Enhanced buttons with romantic colors */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/dashboard"
                className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.7)] hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Start Exploring</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/login"
                className="group w-full sm:w-auto px-10 py-5 rounded-2xl border-2 border-pink-400/20 bg-pink-400/5 backdrop-blur-sm text-white font-bold text-lg hover:bg-pink-400/10 hover:border-pink-400/30 hover:scale-105 transition-all duration-300"
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
