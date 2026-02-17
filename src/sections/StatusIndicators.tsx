"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

const stats = [
  {
    value: 50000,
    suffix: "+",
    label: "Active Users",
    icon: CheckCircle,
  },
  {
    value: 100000,
    suffix: "+",
    label: "Total Downloads",
    icon: CheckCircle,
  },
  {
    value: 99,
    suffix: "%",
    label: "Uptime",
    icon: CheckCircle,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support",
    icon: CheckCircle,
  },
];

export function StatusIndicators() {
  return (
    <section className="py-20 lg:py-32 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Status Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Detection Status</h3>
                    <p className="text-slate-400 text-sm">Current security status</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 font-medium text-sm">Undetected</span>
                </div>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                />
              </div>
              <p className="mt-4 text-slate-400 text-sm">
                Our advanced security protocols ensure complete protection. Last verified: Just now
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">System Status</h3>
                    <p className="text-slate-400 text-sm">All services operational</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-blue-400 font-medium text-sm">Online</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["API", "Auth", "Downloads"].map((service, i) => (
                  <div key={service} className="text-center p-3 rounded-xl bg-white/5">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-400 text-xs">99.9%</span>
                    </div>
                    <span className="text-slate-400 text-xs">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Statistics */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Trusted by <span className="gradient-text">Thousands</span>
              </h2>
              <p className="text-slate-400">
                Join our growing community of satisfied users who trust Horizon for their software needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 text-center hover:border-blue-500/20 transition-colors"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    <CountUp end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
