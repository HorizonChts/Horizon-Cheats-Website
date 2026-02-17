"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is Horizon safe to use?",
    answer:
      "Yes, Horizon is completely safe. We employ advanced security measures including encryption, anti-detection protocols, and regular security audits. Our software is continuously updated to maintain the highest safety standards.",
  },
  {
    question: "How do I install Horizon?",
    answer:
      "Installation is simple. Download the appropriate version for your OS, run the installer, and follow the on-screen instructions. We also provide detailed documentation and video guides for all platforms.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "Horizon supports Windows 10/11, macOS 12+, and Ubuntu 20.04+ (Linux). We recommend keeping your OS updated for the best experience.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with Horizon for any reason, contact our support team within 30 days of purchase for a full refund.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Absolutely! We offer 24/7 support through Discord and email. Pro and Lifetime users get priority support with faster response times.",
  },
  {
    question: "How often are updates released?",
    answer:
      "We release regular updates to ensure compatibility and add new features. Basic users get monthly updates, Pro users get weekly updates, and Lifetime users get immediate access to all updates including beta features.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div
      className={`rounded-xl overflow-hidden transition-colors duration-200 ${
        isOpen ? "bg-white/10 border border-white/10" : "bg-white/5 border border-white/5 hover:bg-white/[0.07]"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-6 text-slate-400 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400">
            Everything you need to know about Horizon
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
