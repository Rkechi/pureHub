"use client";

import { Shield, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white/50 backdrop-blur-lg border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                            <Link href="/">
                                <Shield className="w-5 h-5 text-white" />
                            </Link>
                        </div>

                        <Link href="/">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                PureHive
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</Link>
                        <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                        <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Login</Link>
                        <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                            Request Demo
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-800" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-6 space-y-4">
                        <Link href="/features" className="block text-gray-700 hover:text-blue-600">Features</Link>
                        <Link href="/how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</Link>
                        <Link href="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
                        <Link href="/login" className="block text-gray-700 hover:text-blue-600">Login</Link>
                        <Link href="/register" className="block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center rounded-lg hover:shadow-lg transition-all font-medium">
                            Request Demo
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
