"use client";
import { useState } from 'react';
import {
  Shield,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  Clock,
  Target,
  Rocket,
  Heart,
  Star,
  Calendar,
  ArrowRight,
  Gift,
  Zap,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

export default function PilotProgrammePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employees: '',
    currentClients: '',
    message: ''
  });

  const benefits = [
    {
      icon: Gift,
      title: '50% Discount',
      description: 'First 6 months at just £150/month instead of £300',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'One-on-one onboarding and training from our team',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Rocket,
      title: 'Early Access',
      description: 'Be first to test blockchain and AI features',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Free ESG Certification',
      description: '£2,000 value certification package included',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const timeline = [
    {
      phase: 'Month 1',
      title: 'Onboarding & Setup',
      activities: [
        'Platform training (2 hours)',
        'IoT sensor installation',
        'Dashboard customization',
        'Initial data migration'
      ],
      icon: Rocket
    },
    {
      phase: 'Months 2-3',
      title: 'Active Testing',
      activities: [
        'Daily cleaning log tracking',
        'Real-time monitoring',
        'Feedback sessions',
        'Feature refinement'
      ],
      icon: Target
    },
    {
      phase: 'Months 4-6',
      title: 'Full Integration',
      activities: [
        'ESG report generation',
        'Tender preparation support',
        'Blockchain verification',
        'Case study documentation'
      ],
      icon: TrendingUp
    }
  ];

  const requirements = [
    'Active cleaning SME based in Birmingham or West Midlands',
    '5-50 employees with at least 10 cleaning staff',
    'Currently bidding for or interested in NHS/council contracts',
    'Willing to provide monthly feedback and testimonials',
    'Commitment to 6-month pilot programme'
  ];

  const whatYouGet = [
    { icon: CheckCircle, text: 'Full platform access with IoT sensors' },
    { icon: CheckCircle, text: '2x IoT devices (£100/month value) included' },
    { icon: CheckCircle, text: 'Unlimited ESG reports and dashboards' },
    { icon: CheckCircle, text: 'Blockchain-verified audit trails' },
    { icon: CheckCircle, text: 'Priority customer support' },
    { icon: CheckCircle, text: 'Tender preparation assistance' }
  ];

  const testimonials = [
    {
      name: 'Adewale Johnson',
      company: 'CleanPro Services Ltd',
      role: 'Managing Director',
      quote: 'PureHive helped us win our first NHS contract. The ESG reports made all the difference.',
      avatar: 'AJ',
      rating: 5
    },
    {
      name: 'Sarah Okonkwo',
      company: 'Sparkle Cleaning Solutions',
      role: 'Operations Manager',
      quote: 'The IoT sensors give us real proof of our work. Clients love the transparency.',
      avatar: 'SO',
      rating: 5
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pilot application:', formData);
    alert('Thank you for your interest! We will contact you within 48 hours.');
  };

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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Rocket className="w-4 h-4" />
              Limited Spots Available
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pilot Programme
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Be among the first 20-30 cleaning SMEs to transform your business with PureHive—at 50% off for 6 months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#apply"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#details"
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-purple-600 hover:text-purple-600 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-6 h-6" />
              <span className="text-2xl font-bold">Only 30 Spots Available</span>
            </div>
            <p className="text-orange-100">Applications close when pilot slots are filled. Apply today!</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="details" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Exclusive Pilot Benefits
            </h2>
            <p className="text-xl text-gray-600">
              Get premium features at startup prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Value Proposition */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl font-bold mb-2">£2,900</div>
                <p className="text-purple-100">Total Value Saved</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50%</div>
                <p className="text-purple-100">Discount for 6 Months</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">£150</div>
                <p className="text-purple-100">Per Month (Pilot Price)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your 6-Month Journey
            </h2>
            <p className="text-xl text-gray-600">
              What to expect from the pilot programme
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((phase, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg relative">
                {/* Connector Line (desktop only) */}
                {i < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 z-10"></div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm font-bold text-purple-600 bg-purple-100 px-4 py-2 rounded-lg">
                    {phase.phase}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{phase.title}</h3>

                <div className="space-y-3">
                  {phase.activities.map((activity, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What's Included
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Everything you need to prove ESG compliance and win contracts
              </p>
              <div className="space-y-4">
                {whatYouGet.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <item.icon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Requirements
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                To ensure programme success, we're looking for SMEs that meet:
              </p>
              <div className="space-y-4">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Early Adopter Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from SMEs already using PureHive
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600 font-semibold">{testimonial.company}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apply for the Pilot Programme
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 48 hours
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+44 XXXX XXXXXX"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <select
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select range...</option>
                    <option value="5-10">5-10</option>
                    <option value="11-20">11-20</option>
                    <option value="21-50">21-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Client Types
                  </label>
                  <select
                    value={formData.currentClients}
                    onChange={(e) => setFormData({ ...formData, currentClients: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select type...</option>
                    <option value="private">Private Sector Only</option>
                    <option value="public">Public Sector Only</option>
                    <option value="both">Both Private & Public</option>
                    <option value="seeking">Seeking Public Contracts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to join the pilot?
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Tell us about your ESG compliance needs and goals..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
              >
                Submit Application
                <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-sm text-gray-600 text-center">
                By submitting, you agree to be contacted by PureHive. We'll respond within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'What happens after the 6-month pilot?',
                a: 'You can continue at the standard rate (£300/month) or cancel anytime. No long-term contracts required.'
              },
              {
                q: 'Do I need technical expertise to use PureHive?',
                a: 'No! We provide full training and ongoing support. The platform is designed to be user-friendly for cleaning professionals.'
              },
              {
                q: 'Can I use PureHive for council tender applications?',
                a: 'Absolutely! Our ESG reports are specifically designed for NHS and council procurement requirements.'
              },
              {
                q: 'What if I\'m not in Birmingham?',
                a: 'While we prioritize Birmingham/West Midlands for Year 1, we accept strong applications from across the UK.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Don't Miss This Opportunity
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Only 30 pilot spots available. Apply today and transform your cleaning business.
          </p>
          <a
            href="#apply"
            className="inline-block px-12 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Apply Now – Limited Spots
          </a>
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
                  <a href="/features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/how-it-works" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-white">
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