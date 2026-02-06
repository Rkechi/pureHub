"use client";

import Image from "next/image";

export default function DemoVisual() {
    return (
        <section className="py-10 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-8">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Live Evidence
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                        See it in action
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Illustrative demo showing how operational activity is converted into audit-ready evidence.
                    </p>
                </div>

                <div className="relative mx-auto max-w-5xl rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                    <div className="aspect-[16/10] w-full relative bg-slate-100">
                        <Image
                            src="/images/demo-dashboard.svg"
                            alt="PureHive Compliance Dashboard"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>

                    {/* Mock browser chrome if desired, or just the image */}
                </div>

                <div className="mt-4 text-sm text-gray-400 italic">
                    Demo interface for illustrative purposes only.
                </div>
            </div>
        </section>
    );
}
