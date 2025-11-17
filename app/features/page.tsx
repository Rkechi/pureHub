"use client";
import { useState } from 'react';
import { 
  Activity, 
  Brain, 
  Lock, 
  BarChart3, 
  Wifi, 
  Shield,
  CheckCircle,
  Zap,
  Cloud,
  TrendingUp,
  Users,
  FileText,
  Droplets,
  Wind,
  Calendar,
  Bell,
  Database,
  ArrowRight
} from 'lucide-react';

interface Feature {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  gradient: string;
  image: string;
}

interface AdditionalFeature {
  icon: any;
  title: string;
  description: string;
}

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<string>('sensors');

  const mainFeatures: Feature[] = [
    {
      id: 'sensors',
      icon: Activity,
      title: "Smart IoT Sensors",
      subtitle: "Automated Data Collection",
      description: "Deploy cutting-edge IoT sensors that automatically track cleaning activities, air quality, water usage, and chemical consumption. No manual logging required - everything is captured in real-time.",
      benefits: [
        "Real-time VOC and air quality monitoring",
        "Automatic water and chemical usage tracking",
        "Temperature and humidity sensors",
        "Integration with Tork Vision Hygiene & uHoo"
      ],
      gradient: "from-blue-500 to-cyan-500",
      image: "📡"
    },
    {
      id: 'ai',
      icon: Brain,
      title: "AI-Powered Optimization",
      subtitle: "Smart Route Planning",
      description: "Our AI algorithms analyze patterns and suggest optimal cleaning routes, resource allocation, and scheduling to minimize waste and maximize efficiency.",
      benefits: [
        "Intelligent route optimization",
        "Predictive maintenance scheduling",
        "Resource allocation recommendations",
        "Cost reduction insights"
      ],
      gradient: "from-purple-500 to-pink-500",
      image: "🤖"
    },
    {
      id: 'blockchain',
      icon: Lock,
      title: "Blockchain Security",
      subtitle: "Tamper-Proof Records",
      description: "Every cleaning event is logged to an immutable blockchain ledger (Hyperledger/AWS QLDB), creating permanent, verifiable proof that can never be altered or deleted.",
      benefits: [
        "Immutable audit trails",
        "Cryptographic verification",
        "Transparent record keeping",
        "Compliance-ready documentation"
      ],
      gradient: "from-green-500 to-emerald-500",
      image: "🔒"
    },
    {
      id: 'dashboard',
      icon: BarChart3,
      title: "ESG Dashboard",
      subtitle: "Instant Compliance Reports",
      description: "Beautiful, comprehensive dashboard that visualizes all your ESG metrics. Generate compliance reports for tenders and audits with a single click.",
      benefits: [
        "Real-time performance metrics",
        "Automated ESG reporting",
        "Customizable dashboards",
        "Export-ready compliance documents"
      ],
      gradient: "from-orange-500 to-red-500",
      image: "📊"
    }
  ];

  const additionalFeatures: AdditionalFeature[] = [
    { icon: Wifi, title: "Cloud Integration", description: "Seamless AWS cloud infrastructure for scalability" },
    { icon: Bell, title: "Smart Alerts", description: "Instant notifications for high VOC levels or issues" },
    { icon: Users, title: "Team Management", description: "Assign tasks and track team performance" },
    { icon: Calendar, title: "Smart Scheduling", description: "Automated scheduling based on AI predictions" },
    { icon: FileText, title: "Digital Logs", description: "Complete digital record of all cleaning activities" },
    { icon: Database, title: "Data Analytics", description: "Deep insights into cleaning patterns and efficiency" },
    { icon: Wifi, title: "Third-Party Integration", description: "Connect with your existing tools and systems" },
    { icon: Shield, title: "Enterprise Security", description: "Bank-level security for your sensitive data" },
  ];

  const activeFeatureData = mainFeatures.find(f => f.id === activeFeature) || mainFeatures[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                PureHive
              </span>
            </div>
            <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            Complete Feature Suite
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Prove Excellence
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform combining IoT sensors, AI optimization, blockchain security, and beautiful analytics to revolutionize commercial cleaning operations.
          </p>
        </div>
      </section>

      {/* Interactive Feature Showcase */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-4 mb-8">
            {mainFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`p-6 rounded-2xl text-left transition-all ${
                  activeFeature === feature.id
                    ? `bg-gradient-to-br ${feature.gradient} text-white shadow-2xl transform scale-105`
                    : 'bg-white text-gray-700 hover:shadow-lg'
                }`}
              >
                <feature.icon className={`w-8 h-8 mb-3 ${
                  activeFeature === feature.id ? 'text-white' : 'text-gray-600'
                }`} />
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className={`text-sm ${
                  activeFeature === feature.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {feature.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Active Feature Detail */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${activeFeatureData.gradient} rounded-2xl mb-6`}>
                  <activeFeatureData.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeFeatureData.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {activeFeatureData.description}
                </p>
                <div className="space-y-3">
                  {activeFeatureData.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href="/register"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className={`bg-gradient-to-br ${activeFeatureData.gradient} flex items-center justify-center p-12`}>
                <div className="text-9xl">{activeFeatureData.image}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Plus Many More Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for complete operational excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-gray-600">
              Industries that benefit from PureHive
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Commercial Cleaning", icon: "🏢", description: "Office buildings, corporate campuses, and business facilities" },
              { title: "Healthcare Facilities", icon: "🏥", description: "Hospitals, clinics, and medical centers requiring strict compliance" },
              { title: "Hospitality", icon: "🏨", description: "Hotels, resorts, and accommodation providers" },
              { title: "Education", icon: "🎓", description: "Schools, universities, and educational institutions" },
              { title: "Retail & Malls", icon: "🛍️", description: "Shopping centers and retail establishments" },
              { title: "Industrial", icon: "🏭", description: "Warehouses, factories, and industrial complexes" },
            ].map((useCase, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the future of commercial cleaning with PureHive
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Start Free Trial
              </a>
              <a 
                href="/how-it-works"
                className="px-8 py-4 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}