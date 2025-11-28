"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import ButtonLoader from '@/components/loaders/ButtonLoader';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: any) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            // Registration successful - send welcome email
            try {
                await fetch("/api/send-mail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to: form.email,
                        subject: "Welcome to PureHive! 🎉",
                        message: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #0ea5e9;">Welcome to PureHive, ${form.name}!</h2>
                                <p>Your account has been successfully created.</p>
                                <p>You can now log in and start managing your cleaning operations with our smart IoT-powered dashboard.</p>
                                <p style="margin-top: 20px;">If you have any questions, feel free to reach out to our support team.</p>
                                <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">Best regards,<br/>The PureHive Team</p>
                            </div>
                        `,
                    }),
                });
            } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // Don't block registration if email fails
            }

            router.push("/login");

        } catch (error) {
            console.error("Registration failed:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>

            <div className="relative">
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 border border-white/50">
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mb-2 shadow-lg">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <p className="text-gray-600 text-sm">Join us today and get started</p>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                            <input
                                type="text"
                                required
                                className="w-full bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder:text-gray-400 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder:text-gray-400 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder:text-gray-400 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                placeholder="Password (min. 6 characters)"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl shadow-blue-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && <ButtonLoader size="md" color="white" />}
                        {isLoading ? 'Creating account...' : (
                            <>
                                <span>Register</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}