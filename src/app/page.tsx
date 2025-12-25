'use client';

import { Button } from '@/src/components/ui/button';
import { Sparkles, ArrowRight, Zap, Globe, Repeat, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

// Add these new imports
import { Award, Users, Lightbulb, ArrowUpRight, CheckCircle } from "lucide-react";

export default function LandingPage() {
  const { data: session } = useSession();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Enhanced Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                RePurposeX
              </Link>
              
              {/* Primary Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <div className="relative group">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                    Products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </span>
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <Link href="/repurpose" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Content Generator</Link>
                      <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Analytics</Link>
                      <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Post Scheduler</Link>
                    </div>
                  </div>
                </div>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Templates</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
              </div>
            </div>

            {/* Right Side Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</Link>
              {session ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                  <Button 
                    onClick={() => signOut()}
                    {/* variant="outline" */}
                    className="border-gray-700 hover:bg-gray-800 text-gray-300"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => signIn()}
                    // variant="outline"
                    className="border border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => signIn()}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-gray-200"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col gap-4">
                <Link href="/content-generator" className="text-gray-300 hover:text-white transition-colors">Content Generator</Link>
                <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</Link>
                <Link href="/scheduler" className="text-gray-300 hover:text-white transition-colors">Post Scheduler</Link>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
                <Link href="/templates" className="text-gray-300 hover:text-white transition-colors">Templates</Link>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
                <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">Documentation</Link>
                {session ? (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                    <Button 
                      onClick={() => signOut()}
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-800 w-full"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => signIn()}
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-800 w-full"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => signIn()}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 w-full"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        
        {/* Animated Gradient Orb */}
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-cyan-600/30 blur-3xl"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6 min-h-screen pt-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.h1 
            className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-transparent bg-clip-text relative"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              backgroundPosition: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            RePurposeX
          </motion.h1>
        </motion.div>

        <motion.p 
          className="mt-8 text-xl md:text-2xl max-w-2xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transform your <span className="text-purple-400">single piece of content</span> into 
          <motion.span
            className="text-cyan-400 mx-2"
            animate={{ 
              opacity: [1, 0.7, 1],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            multiple engaging posts
          </motion.span>
          across all social platforms using our <span className="text-purple-400">advanced AI technology</span>.
        </motion.p>

        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/repurpose">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-6 text-lg font-semibold rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105">
                <Sparkles className="mr-2 h-5 w-5" /> Start Creating
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/pricing">
              <Button variant="outline" className="px-8 py-5 text-lg font-semibold rounded-full border-2 border-purple-500 text-purple-600 bg-gray shadow-sm hover:bg-purple-50 hover:shadow-md hover:scale-105 transition-all duration-200">
                View Pricing
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
           { number: "🔍", text: "Smart Content Repurposing\nPaste any text or URL – instantly transform it into platform-ready content with AI." },
           { number: "🌐", text: "Platform-Tailored Output\nAutomatically adjusts tone, length, and style for Twitter, LinkedIn, Instagram, and more." },
           { number: "⚙️", text: "Built for Efficiency\nDesigned to reduce time spent reformatting and rewriting content – publish faster, smarter." }
         ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-b from-purple-900/20 to-transparent border border-purple-500/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.h3
                className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400 mt-2">{stat.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Add Features Section after Stats */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text inline-block mb-6">
              Powerful Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to transform your content strategy and maximize your social media presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-Powered Optimization",
                description: "Our advanced AI analyzes your content and optimizes it for each platform's unique requirements.",
                icon: <Lightbulb className="h-8 w-8 text-purple-400" />,
              },
              {
                title: "Multi-Platform Support",
                description: "Generate content for all major social platforms with platform-specific formatting and style.",
                icon: <Users className="h-8 w-8 text-cyan-400" />,
              },
              {
                title: "Smart Analytics",
                description: "Track performance metrics and get AI-powered suggestions for improvement.",
                icon: <Award className="h-8 w-8 text-pink-400" />,
              },
              {
                title: "Automated Scheduling",
                description: "Schedule your posts for optimal engagement times across all platforms.",
                icon: <ArrowUpRight className="h-8 w-8 text-purple-400" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-3 rounded-xl w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Pricing Section before CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text inline-block mb-6">
              Simple Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your content creation needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for trying out RePurposeX",
                features: ["5 posts per month", "Basic AI optimization", "2 social platforms"],
              },
              {
                name: "Pro",
                price: "Coming Soon",
                description: "Best for content creators",
                features: ["Unlimited posts", "Advanced AI features", "All social platforms", "Analytics dashboard", "Priority support"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For teams and agencies",
                features: ["Custom post volume", "API access", "Dedicated support", "Custom integrations"],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gradient-to-br from-gray-900 to-black border ${
                  plan.popular ? 'border-purple-500' : 'border-gray-800'
                } rounded-2xl p-8 ${
                  plan.popular ? 'shadow-xl shadow-purple-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">{plan.price}</div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-purple-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing CTA and Footer sections remain same ... */}
      <motion.section 
        className="relative z-10 py-20 px-6 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-3xl p-12 border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
            Ready to <span className="text-purple-400">revolutionize</span> your content strategy?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative">
            Join thousands of creators and marketers who are saving time and increasing engagement.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/repurpose">
              <Button
                className="relative px-8 py-6 text-lg font-semibold rounded-full 
                          bg-gradient-to-r from-purple-600 to-cyan-600 
                          hover:from-purple-700 hover:to-cyan-700 
                          shadow-lg shadow-purple-500/20 
                          transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <Sparkles className="mr-3 h-5 w-5 animate-pulse" />
                Start Repurposing Now
              </Button>
            </Link>
            
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center text-gray-400 text-sm border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <p>© {new Date().getFullYear()} RePurposeX • Built with ❤️</p>
        </div>
      </footer>
    </main>
  );
}
