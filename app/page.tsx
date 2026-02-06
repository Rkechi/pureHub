"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustContext from "@/components/landing/TrustContext";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Difference from "@/components/landing/Difference";
import WhoItsFor from "@/components/landing/WhoItsFor";
import DemoVisual from "@/components/landing/DemoVisual";
import WhyMatters from "@/components/landing/WhyMatters";
import CTA from "@/components/landing/CTA";
import { Shield, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustContext />
      <Problem />
      <Solution />
      <Difference />
      <WhoItsFor />
      <DemoVisual />
      <WhyMatters />
      <CTA />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold text-white">PureHive</span>
              </div>
              <p className="text-sm">
                Transforming cleaning operations with IoT, AI, and blockchain technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 PureHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
