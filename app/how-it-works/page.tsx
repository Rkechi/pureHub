"use client";
import { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Brain, 
  Lock, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Smartphone,
  Cloud,
  Wifi,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Deploy IoT Sensors",
      subtitle: "Install and Connect",
      description: "Our team helps you install IoT sensors in your facilities. These sensors automatically track cleaning activities, air quality (VOC levels), water usage, chemical consumption, temperature, and humidity in real-time.",
      icon: Activity,
      gradient: "from-blue-500 to-cyan-500",
      details: [
        "Quick 24-hour installation",
        "Wireless connectivity via AWS IoT",
        "Integration with Tork Vision & uHoo",
        "No disruption to operations"
      ],
      image: "📡"
    },
    {
      number: "02",
      title: "AI Analyzes & Optimizes",
      subtitle: "Smart Decision Making",
      description: "Our AI engine continuously analyzes data patterns to suggest optimal cleaning routes, predict maintenance needs, and recommend resource allocation. Like having a smart assistant that learns your facility.",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      details: [
        "Machine learning algorithms",
        "Route optimization in real-time",
        "Predictive maintenance alerts",
        "Resource waste reduction"
      ],
      image: "🤖"
    },
    {
      number: "03",
      title: "Blockchain Secures Records",
      subtitle: "Immutable Proof",
      description: "Every cleaning event is automatically logged to a blockchain ledger (Hyperledger/AWS QLDB). This creates tamper-proof records that can be verified by anyone, ensuring complete transparency and trust.",
      icon: Lock,
      gradient: "from-green-500 to-emerald-500",
      details: [
        "Cryptographic verification",
        "Permanent audit trail",
        "Cannot be altered or deleted",
        "Compliance-ready documentation"
      ],
      image: "🔒"
    },
    {
      number: "04",
      title: "View Dashboard & Reports",
      subtitle: "Instant Insights",
      description: "Access your beautiful, real-time dashboard from anywhere. Generate compliance reports for tenders and audits with one click. Show clients exactly when, how, and under what conditions cleaning occurred.",
      icon: BarChart3,
      gradient: "from-orange-500 to-red-500",
      details: [
        "Real-time monitoring",
        "Automated ESG reports",
        "Mobile & web access",
        "Export-ready documents"
      ],
      image: "📊"
    }
  ];

  const workflow = [
    { icon: Smartphone, label: "Cleaner starts task" },
    { icon: Activity, label: "Sensors capture data" },
    { icon: Cloud, label: "Data sent to cloud" },
    { icon: Brain, label: "AI processes info" },
    { icon: Lock, label: "Blockchain logs event" },
    { icon: BarChart3, label: "Dashboard updates" },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "40% Cost Reduction",
      description: "Optimize resources and reduce waste with AI-powered insights"
    },
    {
      icon: TrendingUp,
      title: "99.9% Data Accuracy",
      description: "Automated tracking eliminates human error and fraud"
    },
    {
      icon: Shield,
      title: "100% Verifiable Proof",
      description: "Blockchain-backed records that clients can trust"
    },
    {
      icon: Users,
      title: "Better Team Performance",
      description: "Clear accountability and performance metrics"
    }
  ];

  const currentStep = steps[activeStep];

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
            <Play className="w-4 h-4" />
            Simple 4-Step Process
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              PureHive Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From installation to insights in four simple steps. Transform your cleaning operations with technology that just works.
          </p>
        </div>
      </section>

      {/* Visual Workflow */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              The Complete Workflow
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {workflow.map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 text-center font-medium">{item.label}</p>
                  </div>
                  {i < workflow.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Step Navigation */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`p-6 rounded-2xl text-left transition-all ${
                  activeStep === i
                    ? `bg-gradient-to-br ${step.gradient} text-white shadow-2xl transform scale-105`
                    : 'bg-white text-gray-700 hover:shadow-lg'
                }`}
              >
                <div className="text-3xl font-bold mb-2 opacity-50">
                  {step.number}
                </div>
                <step.icon className={`w-8 h-8 mb-3 ${
                  activeStep === i ? 'text-white' : 'text-gray-600'
                }`} />
                <h3 className="font-bold text-lg">{step.title}</h3>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="text-4xl font-bold text-gray-200 mb-4">
                  {currentStep.number}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentStep.title}
                </h2>
                <p className="text-blue-600 font-semibold mb-6">
                  {currentStep.subtitle}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {currentStep.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  {currentStep.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                  {activeStep > 0 && (
                    <button
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
                    >
                      Previous Step
                    </button>
                  )}
                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      Next Step
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <a
                      href="/register"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className={`bg-gradient-to-br ${currentStep.gradient} flex items-center justify-center p-12 lg:p-16`}>
                <div className="text-9xl animate-pulse">{currentStep.image}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why It Works So Well
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built on Enterprise Technology
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading tools and platforms
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "AWS Cloud", description: "Scalable, secure cloud infrastructure", icon: "☁️" },
              { name: "Hyperledger Blockchain", description: "Enterprise-grade blockchain ledger", icon: "🔗" },
              { name: "IoT Sensors", description: "Tork Vision, uHoo & custom devices", icon: "📡" },
              { name: "React Dashboard", description: "Beautiful, responsive web interface", icon: "💻" },
              { name: "AI/ML Algorithms", description: "Open-source machine learning", icon: "🤖" },
              { name: "MongoDB Database", description: "Flexible, scalable data storage", icon: "🗄️" },
            ].map((tech, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How long does installation take?",
                a: "Typically 24-48 hours for a medium-sized facility. We work around your schedule with minimal disruption."
              },
              {
                q: "Do I need special training?",
                a: "No! The system is designed to be intuitive. We provide 1-hour training, and most teams are comfortable within a day."
              },
              {
                q: "Can it integrate with existing systems?",
                a: "Yes! PureHive integrates with most facility management, HR, and accounting systems via our API."
              },
              {
                q: "What if sensors stop working?",
                a: "We monitor all sensors 24/7 and provide instant alerts. Most issues are resolved remotely within hours."
              },
              {
                q: "Is the data secure?",
                a: "Absolutely. We use bank-level encryption, AWS security, and blockchain immutability for maximum protection."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
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
              Ready to See It in Action?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/features"
                className="px-8 py-4 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all"
              >
                View All Features
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}