"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, Headphones, ArrowRight } from "lucide-react";

export function Discord() {
  return (
    <section id="discord" className="py-20 lg:py-32 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5865F2]/20 to-[#5865F2]/5 border border-[#5865F2]/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(88, 101, 242, 0.3) 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 px-6 py-16 lg:px-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20 mb-6">
                  <MessageCircle className="w-4 h-4 text-[#5865F2]" />
                  <span className="text-[#5865F2] text-sm font-medium">Discord Community</span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Join Our <span className="text-[#5865F2]">Discord</span> Server
                </h2>

                <p className="text-slate-400 text-lg mb-8">
                  Connect with thousands of users, get instant support, and stay updated with the latest news and announcements.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="https://discord.gg/horizon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#5865F2] rounded-xl hover:bg-[#4752C4] transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Discord
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="glass rounded-2xl p-6 text-center">
                  <Users className="w-8 h-8 text-[#5865F2] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">15,000+</div>
                  <div className="text-slate-400 text-sm">Members</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <Headphones className="w-8 h-8 text-[#5865F2] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-slate-400 text-sm">Support</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-[#5865F2] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-slate-400 text-sm">Daily Messages</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">Online</div>
                  <div className="text-slate-400 text-sm">Active Now</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
