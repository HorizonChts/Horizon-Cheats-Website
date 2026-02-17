"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Need <span className="gradient-text">Help?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions or issues
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Discord Support */}
          <a
            href="#discord"
            className="group glass rounded-2xl p-8 hover:border-[#5865F2]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-[#5865F2]" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#5865F2] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Discord Support</h3>
            <p className="text-slate-400 mb-4">
              Get instant help from our community and support team on Discord
            </p>
            <div className="flex items-center text-sm text-slate-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>Average response: 5 minutes</span>
            </div>
          </a>

          {/* Email Support */}
          <a
            href="mailto:support@horizon.dev"
            className="group glass rounded-2xl p-8 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-7 h-7 text-blue-500" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
            <p className="text-slate-400 mb-4">
              Send us an email for detailed inquiries or billing questions
            </p>
            <div className="flex items-center text-sm text-slate-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>Average response: 24 hours</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
