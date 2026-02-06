"use client";

import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-8 border border-blue-100">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Audit-ready compliance for cleaning SMEs
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
                    Turn everyday service delivery into
                    <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        structured, audit-ready evidence
                    </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                    PureHive helps cleaning SMEs align with UK procurement, social value, and ESG requirements — without adding admin burden.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/register"
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl transition-all flex items-center justify-center gap-2 group text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                        Request Research Demo
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                        className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 text-base hover:bg-blue-50"
                    >
                        <FileText className="w-5 h-5" />
                        Download 1-page Explainer
                    </button>
                </div>
            </div>

            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
                <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>
        </section>
    );
}
