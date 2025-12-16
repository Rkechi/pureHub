"use client";
import { useState } from 'react';
import {
    Shield,
    CheckCircle,
    TrendingUp,
    FileText,
    Award,
    Building2,
    Leaf,
    Users,
    Target,
    ArrowRight,
    Download,
    Clock,
    BarChart3,
    Lock
} from 'lucide-react';

export default function ESGProcurementPage() {
    const [activeTab, setActiveTab] = useState('nhs');

    const procurementBodies = [
        {
            id: 'nhs',
            name: 'NHS Net Zero',
            logo: '🏥',
            requirements: [
                'Supply chain decarbonisation evidence',
                'Carbon footprint reporting',
                'Sustainable chemical usage tracking',
                'Waste reduction metrics',
                'Energy efficiency documentation'
            ],
            howWeHelp: [
                'Real-time VOC monitoring aligned with NHS air quality standards',
                'Automated carbon footprint calculations per cleaning session',
                'Chemical usage tracking with eco-certification verification',
                'Blockchain-verified sustainability claims',
                'Tender-ready ESG reports in NHS-approved format'
            ],
            stats: {
                budget: '£300M',
                description: 'Annual NHS facilities management spend'
            }
        },
        {
            id: 'council',
            name: 'Local Councils',
            logo: '🏤',
            requirements: [
                'Social Value Act Compliance',
                'Local employment evidence',
                'Environment impact reporting',
                'Living wage certification',
                'Community benefit tracking'
            ],
            howWeHelp: [
                'Automated Social Value scoring aligned with council frameworks',
                'Local workforce tracking and reporting',
                'Environmental KPI dashboards (water, chemicals, waste)',
                'Integration with council procurment portals',
                'Compliance certificates for tender submissions'
            ],
            stats: {
                budget: '£1B+',
                description: 'Annual council procurement spend'
            }
        },
        {
            id: 'corporate',
            name: 'Coporate ESG',
            logo: '🏢',
            requirements: [
                'Scope 3 emissions reporting',
                'ESG disclosure compliance',
                'Sustainablity certifications',
                'Audit trail documentation',
                'Stakeholder transparency'
            ],
            howWeHelp: [
                'Scope 3 emissions data for corporate ESG reports',
                'Integration with ESG reporting frameworks (GRI, SASB)',
                'Blockchain-secured audits trails for stakeholder trust',
                'Real-time sustainability dashboards',
                'Export-ready compliance documentation'
            ],
            stats: {
                budget: '£5B+',
                description: 'Private sector FM services'
            }
        }
    ];

    const sdgAlignment = [
        {
            number: 12,
            title: 'Responsible Consumption',
            icon: '♻',
            impact: 'Chemical traceability and waste minimisation through IoT monitoring',
            gradient: 'from-green-300 to-emerald-600'
        },
        {
            number: 13,
            title: 'Climate Action',
            icon: '🌏',
            impact: 'Supporting UK Net Zero through verified decarbonization data'
        },
        {
            number: 8,
            title: 'Decent Work',
            icon: '💼',
            impact: 'Enabling SME growth and job creation through ESG compliance'
        }
    ];

    const complianceFeatures = [
        {
            icon: FileText,
            title: 'Automated ESG Reports',
            description: 'Generate tender-ready compliance reports in minutes, not days',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Lock,
            title: 'Blockchain Verification',
            description: 'Tamper-proof audit trails that procurement teams can trust',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: BarChart3,
            title: 'Real-time Dashboards',
            description: 'Live ESG metrics aligned with NHS and council frameworks',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: Award,
            title: 'Certification Support',
            description: '£2,000 annual ESG certification package included',
            gradient: 'from-orange-500 to-red-500'
        }
    ];
    const activeBody = procurementBodies.find(b => b.id === activeTab) || procurementBodies[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                            <Leaf className='w-4 h-4' />
                            ESG Compliance Made Simple
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Win More Contracts with
                            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Verified ESG Compliance
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            PureHive aligns with NHS Net Zero, council procurment standards, and corporate ESG requirements- making it easy for SMEs to compete and win.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">
                                £8.8B
                            </div>
                            <p className="text-gray-600">
                                UK Commercial Cleaning Market
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                200,000+
                            </div>
                            <p className="text-gray-600">
                                SMEs Seeking ESG Compliance
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                £300/mo
                            </div>
                            <p className="text-gray-600">
                                Affordable vs £5k+ Competitors
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Procurement Requirements Section*/}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Meeting UK Procurement Standards
                        </h2>
                        <p className="text-xl text-gray-600">
                            Designed specifically to NHS, council, and corporate ESG requirements.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mb-8">
                        {procurementBodies.map((body) => (
                            <button
                                key={body.id}
                                onClick={() => setActiveTab(body.id)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === body.id ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <span className="mr-2">
                                    {body.logo}
                                </span>
                                {body.name}
                            </button>
                        ))}
                    </div>

                    {/* Active Tab Content */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Requirements */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Target className='w-6 h-6 text-red-600' />
                                    Their Requirements
                                </h3>
                                <div className="space-y-3">
                                    {activeBody.requirements.map((req, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                                            <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0 5">
                                                <span className="text-red-600 font-bold text-sm">
                                                    {i + 1}
                                                </span>
                                            </div>
                                            <span className="text-gray-700">
                                                {req}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How We Help */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <CheckCircle className='w-6 h-6 text-green-600 flex-shrink-0 mt-0.5' />
                                    How We Help
                                </h3>
                                <div className="space-y-3">
                                    {activeBody.howWeHelp.map((help, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                                            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className='w-4 h-4 text-green-600' />
                                            </div>
                                            <span className="text-gray-700">
                                                {help}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Market Size */}
                        <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white text-center">
                            <div className="text-4xl font-bold mb-2">
                                {activeBody.stats.budget}
                            </div>
                            <p className="text-green-100">{activeBody.stats.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance Features♂ */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            ESG Compliance Features
                        </h2>
                        <p className="text-xl text-gray-600">
                            Everything you need to win contracts and prove sustainability
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {complianceFeatures.map((feature, i) => (
                            <div
                                key={i}
                                className='bg-white rounded-2xl p-8 shadow-xl transition-all'
                            >
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}
                                >
                                    <feature.icon className='w-8 h-8 text-white' />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* UN SDG Alignment */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Aligned with UN Sustainable Development Goals
                        </h2>
                        <p className="text-xl text-gray-600">
                            Contributing to global sustainability targets through responsible procurement
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {sdgAlignment.map((sdg, i) => (
                            <div
                                key={i}
                                className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center'
                            >
                                <div className="text-6xl mb-4">
                                    {sdg.icon === '♻' ? (
                                        <span
                                            className={`bg-gradient-to-br ${sdg.gradient} bg-clip-text text-transparent`}
                                            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                        >
                                            {sdg.icon}
                                        </span>
                                    ) : (
                                        sdg.icon
                                    )}
                                </div>
                                <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-full font-bold mb-4">
                                    SDG {sdg.number}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {sdg.title}
                                </h3>
                                <p className="text-gray-700">
                                    {sdg.impact}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Competitive Advantage */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-white">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-6">
                                    Why SMEs Choose PureHive for ESG Compliance
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        'First blockchain-verified ESG compliance platform tailored for cleaning SMEs',
                                        'Affordable pricing starting at £300/month vs £5,000+ competitors',
                                        'Automated reports aligned with NHS Net Zero and council procurement standards',
                                        'IoT sensors for real-time environmental monitoring, data accuracy, and compliance',
                                        'Dedicated support to help SMEs win more contracts through verified sustainability',
                                        'Blockchain-secured audit trails for procurement trust and transparency'
                                    ].map((point, i) => (
                                        <div
                                            key={i}
                                            className='flex items-center gap-3'
                                        >
                                            <CheckCircle className='w-6 h-6 text-cyan-200 flex-shrink-0' />
                                            <span className="text-lg">
                                                {point}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='bg-white/10 backdrop-blur rounded-2xl p-8'>
                                <div className="text-center space-y-6">
                                    <div>
                                        <div className="text-5xl font-bold mb-2">40%</div>
                                        <p className="text-cyan-100">Faster Tender Prep</p>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-bold mb-2">100%</div>
                                        <p className="text-cyan-100">Verifiable Proof</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                        Ready to Win More Contracts?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join SME's using PureHive to meet NHS council, and corporate ESG requirements with ease.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/register" className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            Start Free Trail
                            <ArrowRight className='w-5 h-5' />
                        </a>
                        <a href="/pilot-programme" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                            Join Pilot Programme
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
