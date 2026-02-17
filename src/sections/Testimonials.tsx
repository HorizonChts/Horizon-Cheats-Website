"use client";

import { motion } from "framer-motion";
import { Quote, Star, MessageCircle } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Pro User",
    content:
      "Horizon has completely transformed my workflow. The performance is unmatched and the support team is incredibly responsive. Best investment I've made this year.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Lifetime Member",
    content:
      "I've been using Horizon for over a year now. The regular updates and new features keep making it better. The lifetime license was definitely worth it.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Basic User",
    content:
      "Even the basic plan has everything I need. Easy to set up, works flawlessly, and the Discord community is super helpful. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Pro User",
    content:
      "Switched from another tool to Horizon and never looked back. The undetected status gives me peace of mind. Great software, fair pricing.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Lifetime Member",
    content:
      "The beta access alone is worth the lifetime price. Getting to test new features before everyone else is amazing. Horizon team really listens to feedback.",
    rating: 5,
  },
  {
    name: "Jessica Taylor",
    role: "Pro User",
    content:
      "From installation to daily use, everything about Horizon is smooth. The UI is clean, features work as advertised. 10/10 would recommend.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 hover:border-blue-500/20 transition-all"
    >
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <div className="relative mb-4">
        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-blue-500/20" />
        <p className="text-slate-300 leading-relaxed pl-4">{testimonial.content}</p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {testimonial.name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
          <p className="text-slate-500 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust Horizon for their software needs
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
