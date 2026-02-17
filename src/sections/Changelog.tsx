"use client";

import { motion } from "framer-motion";
import { Clock, Zap, Shield, Sparkles, GitCommit } from "lucide-react";

const changelog = [
  {
    version: "v2.0.1",
    date: "Feb 15, 2026",
    type: "bugfix",
    title: "Hotfix Release",
    description: "Fixed minor UI issues and improved startup performance.",
    icon: Zap,
  },
  {
    version: "v2.0.0",
    date: "Feb 10, 2026",
    type: "major",
    title: "Major Update",
    description: "Complete UI redesign, new features, and enhanced security protocols.",
    icon: Sparkles,
  },
  {
    version: "v1.9.5",
    date: "Jan 28, 2026",
    type: "feature",
    title: "New Features",
    description: "Added custom configuration options and improved API stability.",
    icon: GitCommit,
  },
  {
    version: "v1.9.0",
    date: "Jan 15, 2026",
    type: "security",
    title: "Security Update",
    description: "Enhanced anti-detection measures and improved encryption.",
    icon: Shield,
  },
];

export function Changelog() {
  return (
    <section id="changelog" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Latest <span className="gradient-text">Updates</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Stay up to date with the latest features, improvements, and fixes
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-transparent" />

          {/* Changelog Items */}
          <div className="space-y-8">
            {changelog.map((item, index) => (
              <motion.div
                key={item.version}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start space-x-6"
              >
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      item.type === "major"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                        : item.type === "security"
                        ? "bg-emerald-500/20"
                        : "bg-white/10"
                    }`}
                  >
                    <item.icon
                      className={`w-7 h-7 ${
                        item.type === "major"
                          ? "text-white"
                          : item.type === "security"
                          ? "text-emerald-400"
                          : "text-blue-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-white">{item.version}</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                      {item.title}
                    </span>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
