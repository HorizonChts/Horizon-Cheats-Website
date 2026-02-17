"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const products = [
  {
    name: "Horizon Basic",
    description: "Perfect for getting started",
    price: "$9.99",
    period: "/month",
    features: [
      "Core features access",
      "Standard support",
      "1 device license",
      "Monthly updates",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Horizon Pro",
    description: "Most popular choice",
    price: "$19.99",
    period: "/month",
    features: [
      "All Basic features",
      "Priority support",
      "3 device licenses",
      "Weekly updates",
      "Advanced settings",
      "Beta access",
    ],
    popular: true,
    cta: "Get Pro",
  },
  {
    name: "Horizon Lifetime",
    description: "One-time purchase",
    price: "$99.99",
    period: "",
    features: [
      "All Pro features",
      "Lifetime updates",
      "Unlimited devices",
      "24/7 VIP support",
      "Custom configurations",
      "Source code access",
    ],
    popular: false,
    cta: "Get Lifetime",
  },
];

export function Shop() {
  return (
    <section id="shop" className="py-20 lg:py-32">
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
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans include our core features with varying levels of support and access.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                product.popular
                  ? "bg-gradient-to-b from-blue-500/20 to-cyan-500/10 border-2 border-blue-500/30"
                  : "glass border border-white/5"
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center space-x-1 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-slate-400 text-sm">{product.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{product.price}</span>
                <span className="text-slate-400">{product.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                  product.popular
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {product.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>30-Day Refund</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
