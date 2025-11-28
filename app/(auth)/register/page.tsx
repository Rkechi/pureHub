"use client";
import { useState } from 'react';
import { User, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import ButtonLoader from '@/components/loaders/ButtonLoader';
import { useAuth } from '@/app/context/AuthContext';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const { register, isLoading } = useAuth();

    async function handleSubmit(e: any) {
        e.preventDefault();
        setError("");

        try {
            await register(form.name, form.email, form.password);

            // Send welcome email after successful registration
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
                                <p>Start managing your cleaning operations with our IoT-powered platform.</p>
                                <p style="margin-top: 30px;">Best regards,<br>The PureHive Team</p>
                            </div>
                        `,
                    }),
                });
            } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // Don't block registration if email fails
            }

            // Redirect handled by AuthContext
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-4">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

            <form onSubmit={handleSubmit} className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 border border-white/20">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-2">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-pink-100 text-sm">Join PureHive and start managing smarter</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                        <input
                            type="text"
                            required
                            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-pink-200 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                        <input
                            type="email"
                            required
                            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-pink-200 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                        <input
                            type="password"
                            required
                            minLength={6}
                            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-pink-200 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            placeholder="Create a password (min. 6 characters)"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3.5 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading && <ButtonLoader size="md" color="white" />}
                    {isLoading ? 'Creating account...' : (
                        <>
                            Create Account
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>

                <div className="text-center">
                    <a href="/login" className="text-pink-100 hover:text-white text-sm transition-colors">
                        Already have an account? Login
                    </a>
                </div>
            </form>
        </div>
    );
}