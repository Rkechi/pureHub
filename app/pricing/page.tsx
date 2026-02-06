"use client";
import { useState } from 'react';
import {
  Shield,
  Check,
  X,
  Zap,
  Star,
  ArrowRight,
  HelpCircle,
  CheckCircle,
  Sparkles,
  Crown,
  Building2
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 99 : 950,
      description: 'Perfect for small cleaning teams just starting with ESG',
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        { text: 'Up to 5 team members', included: true },
        { text: '1 IoT sensor included', included: true },
        { text: 'Basic ESG dashboard', included: true },
        { text: '50 cleaning logs per month', included: true },
        { text: 'Email support', included: true },
        { text: 'Monthly ESG reports', included: true },
        { text: 'Blockchain verification', included: false },
        { text: 'AI route optimization', included: false },
        { text: 'Tender preparation support', included: false },
        { text: 'Priority support', included: false }
      ],
      cta: 'Start Free Trial',
      savings: billingCycle === 'annual' ? 'Save £238/year' : null
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 300 : 3000,
      description: 'Our most popular plan for growing cleaning SMEs',
      icon: Star,
      gradient: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        { text: 'Up to 20 team members', included: true },
        { text: '3 IoT sensors included', included: true },
        { text: 'Advanced ESG dashboard', included: true },
        { text: 'Unlimited cleaning logs', included: true },
        { text: 'Priority email & phone support', included: true },
        { text: 'Weekly ESG reports', included: true },
        { text: 'Blockchain verification', included: true },
        { text: 'AI route optimization', included: true },
        { text: 'Tender preparation support', included: true },
        { text: 'Priority support', included: true }
      ],
      cta: 'Get Started',
      savings: billingCycle === 'annual' ? 'Save £600/year' : null
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 'Custom' : 'Custom',
      description: 'For large cleaning operations and council contracts',
      icon: Crown,
      gradient: 'from-orange-500 to-red-500',
      popular: false,
      features: [
        { text: 'Unlimited team members', included: true },
        { text: '10+ IoT sensors included', included: true },
        { text: 'Custom ESG dashboard', included: true },
        { text: 'Unlimited everything', included: true },
        { text: '24/7 dedicated support', included: true },
        { text: 'Real-time ESG reports', included: true },
        { text: 'Blockchain verification', included: true },
        { text: 'AI route optimization', included: true },
        { text: 'Full tender preparation', included: true },
        { text: 'Dedicated account manager', included: true }
      ],
      cta: 'Contact Sales',
      savings: 'Volume discounts available'
    }
  ];

  const addons = [
    {
      name: 'Additional IoT Sensor',
      price: '£50/month',
      description: 'Extra sensors for larger facilities'
    },
    {
      name: 'ESG Certification Package',
      price: '£2,000/year',
      description: 'Complete certification support and documentation'
    },
    {
      name: 'Consultancy Referral',
      price: 'Commission',
      description: 'Connect with ESG consultants (we earn commission)'
    },
    {
      name: 'Council Bulk Licensing',
      price: 'Custom',
      description: 'Special pricing for local council deployments'
    }
  ];

  const faqs = [
    {
      q: 'Is there a free trial?',
      a: 'Yes! All plans come with a 14-day free trial. No credit card required.'
    },
    {
      q: 'Can I switch plans later?',
      a: 'Absolutely. You can upgrade or downgrade at any time. Changes take effect immediately.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, debit cards, and bank transfers for annual plans.'
    },
    {
      q: 'Do you offer discounts for charities or social enterprises?',
      a: 'Yes! We offer 20% discounts for registered charities and social enterprises. Contact us for details.'
    },
    {
      q: 'What happens if I exceed my cleaning log limit on Starter?',
      a: 'We\'ll notify you and offer an upgrade to Professional. No logs will be lost.'
    },
    {
      q: 'Are IoT sensors included in the price?',
      a: 'Yes! Each plan includes sensors. Additional sensors are £50/month each.'
    }
  ];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Affordable ESG compliance for SMEs. Start free, scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${billingCycle === 'annual'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Save up to 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all ${plan.popular ? 'ring-4 ring-purple-500 scale-105' : ''
                  }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Details */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  {typeof plan.price === 'number' ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-gray-900">£{plan.price}</span>
                        <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      </div>
                      {plan.savings && (
                        <p className="text-green-600 font-semibold text-sm mt-2">{plan.savings}</p>
                      )}
                    </>
                  ) : (
                    <div className="text-5xl font-bold text-gray-900 mb-2">{plan.price}</div>
                  )}
                </div>

                {/* CTA Button */}
                <a
                  href={
                    plan.name === 'Enterprise'
                      ? '/contact'
                      : '/register'
                  }
                  className={`block w-full text-center px-6 py-4 rounded-xl font-semibold transition-all mb-8 ${plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                >
                  {plan.cta}
                </a>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Optional Add-ons
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your plan with additional services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-all">
                <div className="font-bold text-lg text-gray-900 mb-2">{addon.name}</div>
                <div className="text-2xl font-bold text-blue-600 mb-3">{addon.price}</div>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Programme CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 text-white text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Join Our Pilot Programme
            </h2>
            <p className="text-xl text-green-100 mb-2">
              Get 50% off Professional plan for 6 months
            </p>
            <p className="text-3xl font-bold mb-8">
              Only £150/month (normally £300)
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pilot-programme"
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Learn More About Pilot
              </a>
              <a
                href="/register"
                className="px-8 py-4 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-all"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Start Free Trial
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>
    </div>
  );
}