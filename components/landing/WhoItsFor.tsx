"use client";

import { Check } from "lucide-react";

export default function WhoItsFor() {
    const targets = [
        "Cleaning SMEs",
        "Multi-site service providers",
        "Public-sector and regulated contracts",
        "Operators without dedicated compliance teams",
    ];

    return (
        <section className="py-20 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                            Who it&apos;s for
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                            Designed for cleaning leaders
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            PureHive is built for those who need to prove their quality without
                            getting bogged down in paperwork.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {targets.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-gray-900">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Who it&apos;s NOT for</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-500 line-through decoration-gray-400">
                                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                <span>Sole traders with residential clients</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 line-through decoration-gray-400">
                                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                <span>Enterprise FM companies with in-house dev teams</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 line-through decoration-gray-400">
                                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                <span>Companies who don&apos;t care about compliance</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
