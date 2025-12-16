"use client";

import { Shield, Lock, Eye, Server, Bell, FileCheck, Users, CheckCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
    const measures = [
        {
            icon: Lock,
            title: 'Data Encryption',
            description: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your sensitive information is protected with industry-leading encryption standards.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Shield,
            title: 'Blockchain Security',
            description: 'We use Hyperledger Fabric and AWS QLDB to create tamper-proof, immutable audit trails. Once logged, cleaning records cannot be altered or deleted.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Server,
            title: 'Secure Infrastructure',
            description: 'Our platform runs on AWS with multi-region redundancy, DDoS protection, and 99.9% uptime SLA. All servers are located in UK data centers.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: Eye,
            title: 'Access Controls',
            description: 'Role-based access control (RBAC) ensures users only see data they\'re authorized to access. Multi-factor authentication (MFA) available for all accounts.',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: FileCheck,
            title: 'Regular Audits',
            description: 'We conduct quarterly security audits and annual penetration testing by certified third-party security firms. SOC 2 Type II certification in progress.',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            icon: Bell,
            title: 'Incident Response',
            description: '24/7 security monitoring with automated threat detection. We have a documented incident response plan and will notify you within 72 hours of any breach.',
            color: 'from-pink-500 to-rose-500'
        }
    ];

    const certifications = [
        'ISO 27001 (in progress)',
        'SOC 2 Type II (in progress)',
        'GDPR Compliant',
        'UK Cyber Essentials',
        'PCI DSS (via Stripe)',
        'AWS Well-Architected'
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
                        <Shield className="w-4 h-4" />
                        Security & Compliance
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Your Data is
                        <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            Fortress-Protected
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We take security seriously. From encryption to blockchain immutability,
                        every layer is designed to protect your business-critical data.
                    </p>
                </div>
            </section>

            {/* Security Measures */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Security Measures</h2>
                        <p className="text-xl text-gray-600">Multiple layers of protection for your peace of mind</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {measures.map((measure, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                                <div className={`w-14 h-14 bg-gradient-to-br ${measure.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <measure.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{measure.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{measure.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Sections */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Infrastructure */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Infrastructure Security</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                <strong>Cloud Provider:</strong> We host all infrastructure on Amazon Web Services (AWS), a leader in cloud security with industry certifications
                                including ISO 27001, SOC 1/2/3, and PCI DSS Level 1.
                            </p>
                            <p>
                                <strong>Network Security:</strong> All services run in private Virtual Private Clouds (VPCs) with network segmentation,
                                Web Application Firewall (WAF), and DDoS protection via AWS Shield.
                            </p>
                            <p>
                                <strong>Data Residency:</strong> All customer data is stored in UK-based AWS regions (London eu-west-2) to comply with data sovereignty requirements.
                            </p>
                        </div>
                    </div>

                    {/* Application Security */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Security</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                <strong>Secure Development:</strong> We follow secure coding practices (OWASP Top 10) and conduct regular code reviews.
                                All code changes undergo automated security scanning before deployment.
                            </p>
                            <p>
                                <strong>Dependency Management:</strong> We use automated tools (Dependabot, Snyk) to monitor and update third-party libraries,
                                ensuring no known vulnerabilities exist in our dependencies.
                            </p>
                            <p>
                                <strong>Authentication:</strong> We use industry-standard OAuth 2.0 and JWT tokens. Passwords are hashed with bcrypt (cost factor 12).
                                MFA is available via TOTP or SMS.
                            </p>
                        </div>
                    </div>

                    {/* Data Protection */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                <strong>Encryption at Rest:</strong> All databases use AES-256 encryption. Encryption keys are managed via AWS KMS
                                with automatic rotation every 90 days.
                            </p>
                            <p>
                                <strong>Encryption in Transit:</strong> All connections use TLS 1.3 with perfect forward secrecy.
                                We enforce HTTPS everywhere and use HSTS headers.
                            </p>
                            <p>
                                <strong>Backups:</strong> Automated daily backups with point-in-time recovery. Backups are encrypted and stored in separate regions
                                for disaster recovery.
                            </p>
                        </div>
                    </div>

                    {/* Blockchain Immutability */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Blockchain Immutability</h2>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                <strong>Tamper-Proof Records:</strong> All cleaning logs are written to Hyperledger Fabric or AWS QLDB,
                                creating cryptographically verifiable audit trails that cannot be altered retroactively.
                            </p>
                            <p>
                                <strong>Audit Trail:</strong> Every modification to cleaning records is logged with timestamps, user IDs, and cryptographic hashes.
                                This ensures complete transparency and accountability.
                            </p>
                            <p>
                                <strong>Verification:</strong> Clients and auditors can independently verify the integrity of any cleaning record
                                by checking its blockchain entry.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
                        <p className="text-xl text-gray-600">Industry-recognized standards we meet or are working towards</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {certifications.map((cert, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                <p className="text-gray-900 font-semibold">{cert}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Responsible Disclosure */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <Users className="w-12 h-12 text-red-600 flex-shrink-0" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Researchers</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We welcome responsible disclosure of security vulnerabilities. If you discover a potential issue, please email us at{' '}
                                    <a href="mailto:security@purehive.com" className="text-blue-600 hover:underline font-semibold">security@purehive.com</a>.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    We commit to acknowledging your report within 48 hours and providing a detailed response within 7 days.
                                    We do not currently offer a bug bounty program but may provide recognition for significant findings.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-12 text-center shadow-2xl">
                        <Mail className="w-16 h-16 text-white mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Security Questions or Concerns?
                        </h2>
                        <p className="text-xl text-red-100 mb-8">
                            Our security team is available to answer your questions.
                        </p>
                        <a
                            href="mailto:security@purehive.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                        >
                            Email Us: security@purehive.com
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
