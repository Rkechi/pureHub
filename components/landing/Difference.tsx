"use client";

import { XCircle, CheckCircle } from "lucide-react";

export default function Difference() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                        What makes this different
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                        Built for SMEs — not enterprise compliance teams
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Unlike traditional compliance or ESG tools, PureHive is designed
                        specifically for small and medium cleaning businesses operating in
                        regulated environments.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Traditional Way */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative overflow-hidden group">
                        <h3 className="text-xl font-bold text-gray-500 mb-6">
                            Traditional ESG Tools
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-500">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                                <span>Complex reporting frameworks</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-500">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                                <span>Consultancy-led onboarding</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-500">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                                <span>Duplication of paperwork</span>
                            </li>
                        </ul>
                    </div>

                    {/* PureHive Way */}
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden transform md:scale-105 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-6">
                            With PureHive
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-cyan-300 shrink-0" />
                                <span className="font-medium">No complex frameworks</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-cyan-300 shrink-0" />
                                <span className="font-medium">Self-serve, instant start</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-cyan-300 shrink-0" />
                                <span className="font-medium">Evidence where the work happens</span>
                            </li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/20 text-center font-bold text-lg text-cyan-100">
                            Only what you need. Nothing you don&apos;t.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
