"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
                        Interested in a research discussion or pilot?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
                        We&apos;re currently engaging with cleaning SMEs and industry bodies as part
                        of structured research.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                        >
                            Request Research Demo
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
