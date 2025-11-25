"use client";

import { useState } from "react";
import {
  Shield,
  Activity,
  Brain,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Droplets,
  Wind,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Activity,
      title: "Smart Cleaning Proof",
      description:
        "IoT sensors automatically track cleaning frequency, VOC levels, water and chemical usage in real-time.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "AI-Optimized Workflows",
      description:
        "AI suggests optimal cleaning routes and resources allocation to reduce waste and improve efficiency.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Lock,
      title: "Blockchain Logging",
      description:
        "Tamper-proof cleaning records stored on Hyperledger/AWS QLDB for transparency and compliance.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "ESG Dashboard",
      description:
        "Automated compliance reports for tenders and audits. Prove your ESG credentials instantly.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Data Accuracy" },
    { value: "40%", label: "Cost Reduction" },
    { value: "100%", label: "Verifiable Proof" },
    { value: "24/7", label: "Real-Time Monitoring" },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sensor Capture Data",
      description:
        "IoT devices automatically record cleaning activities, air quality, and resource usage.",
      icon: Activity,
    },
    {
      step: "2",
      title: "AI Optimizes Operations",
      description:
        "Machine learning suggests efficient routes and resource allocation in real-time.",
      icon: Brain,
    },
    {
      step: "3",
      title: "Blockchain Secures Records",
      description:
        "Every action is logged to an immutable ledger for complete transparency.",
      icon: Shield,
    },
    {
      step: "4",
      title: "Dashboard Shows Proof",
      description: "View comprehensive ESG reports and compliance data instantly.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/50 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-[320px]:px-2">
          <div className="flex justify-between items-center h-16 max-[320px]:h-14">
            {/* Logo */}
            <div className="flex items-center gap-3 max-[320px]:gap-2">
              <div className="w-10 h-10 max-[320px]:w-8 max-[320px]:h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <a href="/">
                  <Shield className="w-5 h-5 text-white" />
                </a>
              </div>

              <a href="/">
                <span className="text-2xl max-[320px]:text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  PureHive
                </span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>

              <a
                href="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </a>

              <a
                href="/register"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4 max-[320px]:px-3 max-[320px]:py-4">
              <a
                href="#features"
                className="block text-gray-700 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-blue-600"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-blue-600"
              >
                About
              </a>
              <a
                href="/login"
                className="block text-gray-700 hover:text-blue-600"
              >
                Login
              </a>
              <a
                href="/register"
                className="block px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-[320px]:pt-24 max-[320px]:pb-12 max-[320px]:px-3">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-[320px]:gap-6">
            <div className="space-y-8 max-[320px]:space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 max-[320px]:px-3 max-[320px]:py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                <Activity className="w-4 h-4" />
                IoT-Powered ESG Compliance
              </div>

              <h1 className="text-5xl max-[320px]:text-3xl font-bold text-gray-900 leading-tight">
                Turn Invisible Cleaning into
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Verifiable Proof
                </span>
              </h1>

              <p className="text-xl max-[320px]:text-base text-gray-600 leading-relaxed">
                Smart sensors, AI optimization, and blockchain security. Prove
                your cleaning happened with real-time data, timestamps, and
                tamper-proof records.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-[320px]:gap-2">
                <a
                  href="/register"
                  className="px-8 py-4 max-[320px]:px-5 max-[320px]:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl transition-all flex items-center justify-center gap-2 group text-sm"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 max-[320px]:px-5 max-[320px]:py-3 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  See How it Works
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 max-[320px]:gap-2">
                {[Wind, Droplets, Shield, CheckCircle].map((Icon, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-gray-600 text-xs"
                  >
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span>Verified</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 max-[320px]:p-4 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 max-[320px]:p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
                  <div className="space-y-3 py-3">
                    {["Lobby", "Restroom", "Kitchen"].map((area, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-100 rounded-lg text-gray-700 text-sm max-[320px]:p-2 max-[320px]:text-xs"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">{area}</span>
                        <span className="text-gray-500">VOC:0.{3 + i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-[320px]:px-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-[320px]:gap-4">
            {stats.map((stat, i) => (
              <div className="text-center" key={i}>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 bg-clip-text text-transparent mb-2 max-[320px]:text-2xl">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm max-[320px]:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        id="features"
      >
        <div className="max-w-7xl mx-auto max-[320px]:px-3">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 max-[320px]:text-2xl">
              Complete ESG Compliance Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto max-[320px]:text-sm">
              Everything you need to prove, optimize, and report that your
              cleaning operations are effective, sustainable, and verifiable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-[320px]:gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group max-[320px]:p-4"
                  key={i}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 max-[320px]:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-[320px]:text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        className="py-20 bg-white px-4 sm:px-6 lg:px-8"
        id="how-it-works"
      >
        <div className="max-w-7xl mx-auto max-[320px]:px-3">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 max-[320px]:text-2xl">
              How PureHive Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto max-[320px]:text-sm">
              Four simple steps to transform your cleaning operations
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-[320px]:gap-4">
            {howItWorks.map((item, i) => {
              const Icon = item.icon;
              return (
                <div className="relative" key={i}>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 text-center group hover:shadow-lg transition-all max-[320px]:p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold max-[320px]:w-12 max-[320px]:h-12">
                      {item.step}
                    </div>
                    <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4 max-[320px]:w-8 max-[320px]:h-8" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3 max-[320px]:text-sm">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm max-[320px]:text-xs">
                      {item.description}
                    </p>
                  </div>

                  {i < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-[320px]:px-3">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl max-[320px]:p-6">
            <h2 className="text-4xl font-bold text-white mb-6 max-[320px]:text-2xl">
              Ready to Prove Your Cleaning Excellence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto max-[320px]:text-sm">
              Join leading cleaning companies using PureHive to win more tenders
              and build client trust
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-[320px]:gap-3">
              <a
                href="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 max-[320px]:px-6 max-[320px]:py-3"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/features"
                className="px-8 py-4 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all max-[320px]:px-6 max-[320px]:py-3"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto max-[320px]:px-3">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold text-white">PureHive</span>
              </div>
              <p className="text-sm max-[320px]:text-xs">
                Transforming cleaning operations with IoT, AI, and blockchain
                technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
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
