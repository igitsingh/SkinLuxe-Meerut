'use client';

import { useState } from 'react';
import { User, Mail, Lock, Phone, Calendar, LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        phone: '',
        date_of_birth: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                // Login logic
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // Store token/session
                    localStorage.setItem('patient_token', data.token);
                    localStorage.setItem('patient_id', data.patient.id);
                    localStorage.setItem('patient_name', data.patient.full_name);

                    // Redirect to home page
                    router.push('/');
                } else {
                    setError(data.error || 'Login failed');
                }
            } else {
                // Register logic
                const response = await fetch('/api/patients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        full_name: formData.full_name,
                        phone: formData.phone,
                        date_of_birth: formData.date_of_birth || null,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // Auto-login after registration
                    setIsLogin(true);
                    setError('');
                    alert('Account created successfully! Please login.');
                } else {
                    setError(data.error || 'Registration failed');
                }
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image - Collage of Indian Faces */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/indian-faces-background.jpg)',
                    filter: 'brightness(0.7)',
                }}
            />

            {/* Pink Tint Overlay */}
            <div className="absolute inset-0 bg-[#E91E63] opacity-40" />

            {/* Gradient Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E91E63]/30 via-transparent to-[#C2185B]/30" />

            {/* Content */}
            <div className="relative z-10 min-h-screen py-20">
                <div className="container max-w-md mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="font-serif text-4xl text-white mb-2 drop-shadow-lg">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-white/90 drop-shadow-md">
                            {isLogin ? 'Login to manage your appointments' : 'Join SkinLuxe today'}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-3xl p-8 border-2 border-[#E91E63]/20 shadow-2xl">
                        {/* Toggle Tabs */}
                        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(true);
                                    setError('');
                                }}
                                className={`flex-1 py-3 rounded-full font-serif transition-all ${isLogin
                                    ? 'bg-[#E91E63] text-white shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <LogIn className="w-5 h-5 inline mr-2" />
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(false);
                                    setError('');
                                }}
                                className={`flex-1 py-3 rounded-full font-serif transition-all ${!isLogin
                                    ? 'bg-[#E91E63] text-white shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <UserPlus className="w-5 h-5 inline mr-2" />
                                Register
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Register-only fields */}
                            {!isLogin && (
                                <>
                                    <div>
                                        <label className="block text-sm font-serif text-gray-700 mb-2">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.full_name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, full_name: e.target.value })
                                            }
                                            required={!isLogin}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-serif text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            required={!isLogin}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-serif text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            Date of Birth (Optional)
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date_of_birth}
                                            onChange={(e) =>
                                                setFormData({ ...formData, date_of_birth: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Common fields */}
                            <div>
                                <label className="block text-sm font-serif text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-serif text-gray-700 mb-2">
                                    <Lock className="w-4 h-4 inline mr-2" />
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E91E63] focus:outline-none"
                                    placeholder="Enter your password"
                                    minLength={6}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[#E91E63] text-white font-serif rounded-full hover:bg-[#C2185B] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading
                                    ? 'Please wait...'
                                    : isLogin
                                        ? 'Login to Account'
                                        : 'Create Account'}
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-6 text-center text-sm text-gray-600">
                            {isLogin ? (
                                <p>
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(false)}
                                        className="text-[#E91E63] font-medium hover:underline"
                                    >
                                        Register here
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(true)}
                                        className="text-[#E91E63] font-medium hover:underline"
                                    >
                                        Login here
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
