"use client";

import { Shield, FileText, Scale, AlertCircle, CheckCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Scale className="w-4 h-4" />
                        Terms of Service
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Terms of
                        <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Service
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Last updated: December 16, 2025
                    </p>
                    <p className="text-lg text-gray-600">
                        Please read these terms carefully before using PureHive.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Acceptance */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                            </div>
                        </div>
                        <div className="ml-16 text-gray-700 leading-relaxed space-y-4">
                            <p>
                                By accessing or using PureHive's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                                If you do not agree with any of these terms, you are prohibited from using this service.
                            </p>
                            <p>
                                We reserve the right to modify these terms at any time. We will notify you of any changes by updating the "Last updated" date.
                                Your continued use of the platform after changes constitutes acceptance of the modified terms.
                            </p>
                        </div>
                    </div>

                    {/* Service Description */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">2. Service Description</h2>
                            </div>
                        </div>
                        <div className="ml-16 text-gray-700 leading-relaxed space-y-4">
                            <p>
                                PureHive provides an IoT-enabled ESG compliance platform for cleaning service providers. Our services include:
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>IoT sensor integration for real-time cleaning data capture</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Blockchain-based immutable record logging</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>AI-powered route optimization and resource allocation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>ESG compliance reporting and dashboard</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* User Accounts */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                To access our platform, you must create an account. You are responsible for:
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Maintaining the confidentiality of your account credentials</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>All activities that occur under your account</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Notifying us immediately of any unauthorized access</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Providing accurate and current information</span>
                                </li>
                            </ul>
                            <p>
                                We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                            </p>
                        </div>
                    </div>

                    {/* Payment Terms */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment & Billing</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                <strong>Subscription Plans:</strong> PureHive offers monthly and annual subscription plans. All fees are in GBP and exclude VAT unless stated otherwise.
                            </p>
                            <p>
                                <strong>Free Trial:</strong> New users receive a 14-day free trial. No credit card is required during the trial.
                                You can cancel anytime before the trial ends to avoid charges.
                            </p>
                            <p>
                                <strong>Billing:</strong> Subscriptions renew automatically unless cancelled before the renewal date.
                                We charge the payment method on file at the beginning of each billing cycle.
                            </p>
                            <p>
                                <strong>Refunds:</strong> We offer prorated refunds if you downgrade during a billing cycle.
                                Annual subscriptions are non-refundable except as required by law.
                            </p>
                        </div>
                    </div>

                    {/* Acceptable Use */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>You agree NOT to:</p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>Use the service for any illegal or unauthorized purpose</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>Attempt to gain unauthorized access to our systems</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>Interfere with or disrupt the platform's operation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>Share your account credentials with others</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>Reverse engineer or copy any part of the platform</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Intellectual Property */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                All content, features, and functionality of PureHive (including but not limited to software, text, graphics, logos, and trademarks)
                                are owned by PureHive Ltd and protected by UK and international copyright and trademark laws.
                            </p>
                            <p>
                                You retain ownership of data you upload to the platform. By using our service, you grant us a license to process,
                                store, and display your data solely for the purpose of providing our services.
                            </p>
                        </div>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                PureHive is provided "as is" without warranties of any kind. We do not guarantee:
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-500">•</span>
                                    <span>That the service will be uninterrupted or error-free</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-500">•</span>
                                    <span>The accuracy or completeness of IoT sensor data</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-500">•</span>
                                    <span>That defects will be corrected immediately</span>
                                </li>
                            </ul>
                            <p className="font-semibold">
                                To the maximum extent permitted by law, PureHive shall not be liable for any indirect, incidental,
                                or consequential damages arising from your use of the platform.
                            </p>
                        </div>
                    </div>

                    {/* Termination */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                You may cancel your subscription at any time from your account settings. Upon cancellation:
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>You retain access until the end of your current billing period</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>No further charges will be made</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>You can export your data before the termination date</span>
                                </li>
                            </ul>
                            <p>
                                We may terminate or suspend your account immediately if you breach these terms.
                            </p>
                        </div>
                    </div>

                    {/* Governing Law */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive
                                jurisdiction of the courts of England and Wales.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl">
                        <Mail className="w-16 h-16 text-white mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Questions About Our Terms?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Our legal team is here to help clarify anything.
                        </p>
                        <a
                            href="mailto:legal@purehive.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                        >
                            Email Us: legal@purehive.com
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
