"use client";

import { AlertTriangle, FileSpreadsheet, Gavel, Scale } from "lucide-react";

export default function Problem() {
    const problems = [
        {
            icon: Scale,
            title: "Tenders are changing",
            description: "Social value and ESG are now scored in tenders.",
            color: "text-purple-600 bg-purple-50",
        },
        {
            icon: AlertTriangle,
            title: "Evidence is demanded",
            description: "Evidence is required throughout contract delivery, not just at bid stage.",
            color: "text-orange-600 bg-orange-50",
        },
        {
            icon: FileSpreadsheet,
            title: "Manual chaos",
            description: "SMEs rely on spreadsheets, folders, WhatsApp photos, and manual logs.",
            color: "text-blue-600 bg-blue-50",
        },
        {
            icon: Gavel,
            title: "Audit risk",
            description: "Audits, inspections, and contract reviews create admin burden and risk.",
            color: "text-red-600 bg-red-50",
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">The Problem</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                        Why cleaning SMEs are under pressure
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Cleaning SMEs are facing increasing procurement and compliance requirements, but lack the tools to evidence delivery consistently.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((problem, idx) => {
                        const Icon = problem.icon;
                        return (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${problem.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                                <p className="text-gray-600">{problem.description}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12 text-center">
                    <blockquote className="text-2xl font-medium text-gray-700 italic">
                        &ldquo;We&rsquo;re doing the work — proving it is the hard part.&rdquo;
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
