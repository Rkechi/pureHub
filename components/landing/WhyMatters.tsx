"use client";

import { TrendingUp, ShieldCheck, Clock, Award } from "lucide-react";

export default function WhyMatters() {
    const outcomes = [
        {
            icon: TrendingUp,
            title: "Improved competitiveness",
            description: "Win more tenders with evidence-backed bids.",
        },
        {
            icon: ShieldCheck,
            title: "Reduced audit stress",
            description: "Always be ready for inspections, no scrambling.",
        },
        {
            icon: Award,
            title: "Social value proof",
            description: "Clear evidence of your impact and compliance.",
        },
        {
            icon: Clock,
            title: "Time saved",
            description: "More time spent running the business, less on admin.",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                        Why this matters
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                        The outcome for cleaning SMEs
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        PureHive supports SMEs to stay compliant, credible, and competitive
                        as procurement expectations evolve.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {outcomes.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="group hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
