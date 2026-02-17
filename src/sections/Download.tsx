"use client";

import { motion } from "framer-motion";
import { Download, FileArchive, Calendar, HardDrive, ArrowRight } from "lucide-react";

const downloads = [
  {
    name: "Horizon Windows",
    version: "v2.0.1",
    size: "45.2 MB",
    date: "Feb 15, 2026",
    icon: FileArchive,
    url: "#",
    platform: "Windows 10/11",
  },
  {
    name: "Horizon macOS",
    version: "v2.0.0",
    size: "52.8 MB",
    date: "Feb 14, 2026",
    icon: FileArchive,
    url: "#",
    platform: "macOS 12+",
  },
  {
    name: "Horizon Linux",
    version: "v2.0.0",
    size: "38.5 MB",
    date: "Feb 14, 2026",
    icon: FileArchive,
    url: "#",
    platform: "Ubuntu 20.04+",
  },
];

export function DownloadSection() {
  return (
    <section id="download" className="py-20 lg:py-32 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Download <span className="gradient-text">Horizon</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Get started with Horizon today. Choose your platform and download the latest version.
          </p>
        </motion.div>

        {/* Download Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {downloads.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-blue-500/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-blue-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                  {item.version}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{item.platform}</p>

              <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
                <div className="flex items-center space-x-1">
                  <HardDrive className="w-4 h-4" />
                  <span>{item.size}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
              </div>

              <motion.a
                href={item.url}
                className="flex items-center justify-center w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition-opacity group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 glass rounded-2xl p-6 lg:p-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">System Requirements</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Windows</h4>
              <ul className="text-slate-400 space-y-1">
                <li>Windows 10 or 11 (64-bit)</li>
                <li>4 GB RAM minimum</li>
                <li>100 MB disk space</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">macOS</h4>
              <ul className="text-slate-400 space-y-1">
                <li>macOS 12.0 or later</li>
                <li>4 GB RAM minimum</li>
                <li>100 MB disk space</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Linux</h4>
              <ul className="text-slate-400 space-y-1">
                <li>Ubuntu 20.04 or later</li>
                <li>4 GB RAM minimum</li>
                <li>100 MB disk space</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
