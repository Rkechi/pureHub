"use client";

import { Scan, Database, CheckCircle, Clock } from "lucide-react";

export default function Solution() {
    const features = [
        {
            icon: Scan,
            title: "Capture as you go",
            description: "Capture evidence during day-to-day service delivery.",
        },
        {
            icon: Database,
            title: "Automated structuring",
            description: "Automatically structure records for audits and procurement.",
        },
        {
            icon: CheckCircle,
            title: "Aligned outputs",
            description: "Align outputs with social value, ESG, and compliance expectations.",
        },
        {
            icon: Clock,
            title: "Reduce admin",
            description: "Reduce admin effort without hiring compliance staff.",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">The Solution</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                            How PureHive works
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            PureHive embeds evidence capture into normal cleaning operations, turning routine activity into structured compliance records.
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-blue-600">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-10 p-4 bg-blue-100/50 rounded-xl border border-blue-200 text-blue-800 font-medium inline-block">
                            PureHive makes compliance operational, not administrative.
                        </div>
                    </div>

                    <div className="relative">
                        {/* Placeholder for an abstract visual or illustration of the process if needed, 
                            But for now we can rely on the text content or a simple graphic representation */}
                        <div className="bg-white rounded-3xl p-8 shadow-2xl relative z-10 border border-gray-100">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">1</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Cleaner scans NFC tag</p>
                                        <p className="text-sm text-gray-500">Lobby Area • 08:30 AM</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="h-8 w-0.5 bg-gray-200"></div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">2</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Evidence Logged</p>
                                        <p className="text-sm text-gray-500">Automated blockchain record created</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="h-8 w-0.5 bg-gray-200"></div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-green-800">Audit Ready</p>
                                        <p className="text-sm text-green-600">Available in dashboard instantly</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-10 -right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
