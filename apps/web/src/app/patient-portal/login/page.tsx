'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export default function PatientLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement authentication
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[rgba(233,30,99,0.03)] to-white flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <img src="/skinluxe-logo-dark.png" alt="SkinLuxe" className="h-16 mx-auto mb-4" />
                    </Link>
                    <h2 className="font-serif text-3xl text-[#000000] mb-2">
                        {isLogin ? 'Patient Portal' : 'Create Account'}
                    </h2>
                    <p className="text-gray-600">
                        {isLogin ? 'Access your appointments and records' : 'Join SkinLuxe today'}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#E91E63]/20 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-serif text-[#000000] mb-2">
                                    Full Name *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required={!isLogin}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-serif text-[#000000] mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-serif text-[#000000] mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required={!isLogin}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-serif text-[#000000] mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E91E63]"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-[#E91E63] rounded" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <Link href="/patient-portal/forgot-password" className="text-[#E91E63] hover:text-[#C2185B]">
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#E91E63] text-white font-serif text-lg rounded-xl hover:bg-[#C2185B] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gray-600 hover:text-[#E91E63]"
                        >
                            {isLogin ? (
                                <>
                                    Don't have an account?{' '}
                                    <span className="text-[#E91E63] font-semibold">Sign up</span>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <span className="text-[#E91E63] font-semibold">Sign in</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-gray-600 hover:text-[#E91E63]">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
