"use client";

import { Shield, Rocket, Heart, Users, Zap, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
    const values = [
        {
            icon: Rocket,
            title: 'Innovation First',
            description: 'We encourage bold ideas and embrace cutting-edge technology to solve real-world problems.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Heart,
            title: 'Impact Driven',
            description: 'Every line of code we write contributes to a cleaner, more sustainable future.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Users,
            title: 'Team Collaboration',
            description: 'We win together. Diverse perspectives make us stronger and more creative.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: Zap,
            title: 'Move Fast',
            description: 'We iterate quickly, learn from mistakes, and continuously improve our products.',
            color: 'from-orange-500 to-red-500'
        }
    ];

    const openings = [
        {
            title: 'Senior Full-Stack Engineer',
            location: 'Remote (UK)',
            type: 'Full-time',
            department: 'Engineering'
        },
        {
            title: 'IoT Hardware Engineer',
            location: 'London, UK',
            type: 'Full-time',
            department: 'Product'
        },
        {
            title: 'Growth Marketing Manager',
            location: 'Remote (UK)',
            type: 'Full-time',
            department: 'Marketing'
        },
        {
            title: 'Customer Success Lead',
            location: 'Manchester, UK',
            type: 'Full-time',
            department: 'Operations'
        }
    ];

    const benefits = [
        'Competitive salary + equity',
        'Flexible remote work',
        '25 days holiday + bank holidays',
        'Learning & development budget',
        'Latest tech equipment',
        'Health & wellness benefits',
        'Team retreats & events',
        'Pension scheme'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                PureHive
                            </span>
                        </Link>
                        <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Globe className="w-4 h-4" />
                        Join Our Mission
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Build the Future of
                        <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Sustainable Cleaning
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        We're a small but mighty team transforming how cleaning SMEs prove their ESG credentials.
                        Join us in making invisible work visible and sustainable.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-xl text-gray-600">What drives us every day</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                                <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <value.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
                        <p className="text-xl text-gray-600">Find your next challenge</p>
                    </div>

                    <div className="space-y-4">
                        {openings.map((job, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                📍 {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                💼 {job.type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                🏢 {job.department}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 group-hover:gap-3">
                                        Apply Now
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">Don't see a perfect fit?</p>
                        <a
                            href="mailto:careers@purehive.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                        >
                            Send us your CV anyway
                        </a>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
                        <p className="text-xl text-gray-600">We take care of our team</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{benefit}</span>
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
                            Ready to Make an Impact?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join us in revolutionizing the cleaning industry with technology that matters.
                        </p>
                        <a
                            href="mailto:careers@purehive.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                        >
                            Get in Touch
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-sm">&copy; 2025 PureHive. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
