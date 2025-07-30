'use client'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            RepurposeX
          </h1>
          <p className="text-2xl mb-8 text-gray-200">
            Transform Your Content Across Platforms with AI-Powered Intelligence
          </p>
          <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
            Get Started Free
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-violet-500/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-violet-400">Smart Repurposing</h3>
            <p className="text-gray-300">
              Automatically transform your content for different platforms while maintaining your message
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-violet-500/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-violet-400">AI-Powered</h3>
            <p className="text-gray-300">
              Advanced AI algorithms ensure high-quality content adaptation
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-violet-500/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-violet-400">Multi-Platform</h3>
            <p className="text-gray-300">
              Support for all major social media platforms and content formats
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 p-16 rounded-3xl text-center border border-violet-500/20 backdrop-blur-sm">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">Ready to Transform Your Content?</h2>
          <p className="text-2xl mb-8 text-gray-200">Join thousands of content creators who trust RepurposeX</p>
          <button className="bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-violet-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
            Start Repurposing Now
          </button>
        </div>
      </section>
    </main>
  )
}
