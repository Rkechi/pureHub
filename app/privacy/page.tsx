"use client";

import { Shield, Lock, Eye, FileText, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    const sections = [
        {
            title: 'Information We Collect',
            icon: FileText,
            content: [
                'Account information (name, email, company details)',
                'Usage data and analytics',
                'IoT sensor data from your cleaning operations',
                'Payment and billing information',
                'Communication preferences and support requests'
            ]
        },
        {
            title: 'How We Use Your Data',
            icon: Eye,
            content: [
                'Provide and improve our ESG compliance platform',
                'Generate cleaning reports and blockchain records',
                'Process payments and manage subscriptions',
                'Send service updates and important notifications',
                'Analyze usage patterns to enhance features'
            ]
        },
        {
            title: 'Data Security',
            icon: Lock,
            content: [
                'End-to-end encryption for sensitive data',
                'Blockchain-based immutable audit trails',
                'Regular security audits and penetration testing',
                'SOC 2 Type II compliance (in progress)',
                'Secure data centers with 99.9% uptime SLA'
            ]
        },
        {
            title: 'Your Rights',
            icon: CheckCircle,
            content: [
                'Access your personal data at any time',
                'Request data portability in standard formats',
                'Delete your account and associated data',
                'Opt-out of marketing communications',
                'Lodge a complaint with the ICO (UK)'
            ]
        }
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
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                        <Lock className="w-4 h-4" />
                        Privacy Policy
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Your Privacy,
                        <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Our Priority
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Last updated: December 16, 2025
                    </p>
                    <p className="text-lg text-gray-600">
                        We're committed to protecting your personal data and being transparent about how we use it.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-8">
                        {sections.map((section, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <section.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                                    </div>
                                </div>
                                <ul className="space-y-3 ml-16">
                                    {section.content.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Additional Sections */}
                    <div className="mt-12 space-y-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We retain your personal data only as long as necessary to provide our services and comply with legal obligations.
                                Cleaning logs and blockchain records are stored indefinitely for audit and compliance purposes.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                When you delete your account, we anonymize or delete your personal data within 30 days, except where retention
                                is required by law or for legitimate business purposes.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use carefully vetted third-party services to operate our platform:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span><strong>AWS:</strong> Cloud infrastructure and database hosting</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span><strong>Stripe:</strong> Payment processing (PCI DSS compliant)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span><strong>Hyperledger/AWS QLDB:</strong> Blockchain ledger services</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span><strong>SendGrid:</strong> Transactional email delivery</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use essential cookies to keep you logged in and remember your preferences. We also use analytics cookies
                                (with your consent) to understand how you use our platform and improve it.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You can manage your cookie preferences in your browser settings or our cookie consent banner.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">GDPR Compliance</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                PureHive is fully compliant with the General Data Protection Regulation (GDPR). As a UK-based company,
                                we adhere to UK GDPR and the Data Protection Act 2018.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We have appointed a Data Protection Officer (DPO) who oversees our data protection practices.
                                You can contact our DPO at <a href="mailto:dpo@purehive.com" className="text-blue-600 hover:underline">dpo@purehive.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl">
                        <Mail className="w-16 h-16 text-white mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Questions About Your Privacy?
                        </h2>
                        <p className="text-xl text-green-100 mb-8">
                            We're here to help. Contact our privacy team anytime.
                        </p>
                        <a
                            href="mailto:privacy@purehive.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                        >
                            Email Us: privacy@purehive.com
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
