"use client";
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function DebugPage() {
    const [config, setConfig] = useState<any>({});
    const [testResult, setTestResult] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setConfig({
            apiUrl: process.env.NEXT_PUBLIC_API_URL,
            token: typeof window !== 'undefined' ? localStorage.getItem('admin_token') : 'N/A'
        });
    }, []);

    const runTest = async () => {
        try {
            setTestResult('Loading...');
            setError(null);
            const res = await api.get('/analytics/stats');
            setTestResult(res.data);
        } catch (err: any) {
            console.error(err);
            setError({
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
                code: err.code
            });
            setTestResult(null);
        }
    };

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Admin Debug Console 🛠️</h1>

            <div className="p-4 bg-slate-100 rounded-lg border">
                <h2 className="font-bold mb-2">Current Configuration</h2>
                <div className="space-y-2 text-sm font-mono">
                    <p><span className="font-semibold">NEXT_PUBLIC_API_URL:</span> {config.apiUrl || 'Undefined'}</p>
                    <p><span className="font-semibold">Token Present:</span> {config.token ? (config.token !== 'N/A' ? 'Yes (Hidden)' : 'No') : 'No'}</p>
                </div>
            </div>

            <div>
                <button
                    onClick={runTest}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Test API Connection
                </button>
            </div>

            {testResult && testResult !== 'Loading...' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h2 className="font-bold text-green-800 mb-2">✅ Success! Data Received:</h2>
                    <pre className="text-xs overflow-auto max-h-60 bg-white p-2 rounded border border-green-100">
                        {JSON.stringify(testResult, null, 2)}
                    </pre>
                </div>
            )}

            {testResult === 'Loading...' && (
                <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
                    Testing connection...
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h2 className="font-bold text-red-800 mb-2">❌ Error Occurred:</h2>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Message:</span> {error.message}</p>
                        {error.status && <p><span className="font-semibold">Status Code:</span> {error.status}</p>}
                        {error.code && <p><span className="font-semibold">Error Code:</span> {error.code}</p>}
                        {error.data && (
                            <div>
                                <span className="font-semibold">Response Data:</span>
                                <pre className="mt-1 bg-white p-2 rounded border border-red-100 text-xs">
                                    {JSON.stringify(error.data, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
