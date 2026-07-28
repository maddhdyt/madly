import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Hexagon, Loader2, Star } from 'lucide-react';

export default function Login() {
    const { props } = usePage();
    const settings = props.global_settings || {};
    const companyName = settings.company_name || 'MADLY';

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 lg:p-8 font-sans">
            <Head title="Log in" />

            <div className="max-w-6xl w-full p-8 lg:p-16 flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
                
                {/* Left Side (Branding & Trust) */}
                <div className="flex-1 space-y-8 w-full">
                    {/* Logo */}
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <Hexagon className="w-8 h-8 text-black fill-black" />
                    </div>
                    
                    {/* Welcome Text */}
                    <div>
                        <h1 className="text-4xl lg:text-[44px] font-black text-gray-900 tracking-tight leading-[1.1]">
                            Welcome back to<br/>{companyName}!
                        </h1>
                        <p className="text-gray-500 mt-5 text-[15px] font-medium max-w-md leading-relaxed">
                            Thank you for continuing your experience with us and always trusting the expertise of our team.
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="pt-2">
                        <p className="text-[13px] font-bold text-gray-900 mb-2">Rate your experience</p>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-5 h-5 text-gray-900 fill-gray-900" />
                            ))}
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="pt-6 border-t border-gray-100 max-w-sm flex items-center gap-4">
                        <div className="flex -space-x-3">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 object-cover" />
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 object-cover" />
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=John&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 object-cover" />
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 object-cover" />
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 text-white text-[11px] font-bold flex items-center justify-center">
                                +15
                            </div>
                        </div>
                        <p className="text-[11px] font-medium text-gray-500 leading-tight">
                            Join our growing network of<br/>professionals today.
                        </p>
                    </div>
                </div>

                {/* Right Side (Login Form) */}
                <div className="w-full lg:w-[460px] shrink-0 bg-white p-10 lg:p-12 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    <div className="mb-10 text-left">
                        <h2 className="text-[26px] font-black text-gray-900 tracking-tight">Log In</h2>
                        <p className="text-[14px] font-medium text-gray-500 mt-1.5">Please enter your details to access your dashboard.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-[12px] font-bold text-gray-700 mb-2">Enter your email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => {
                                    setData('email', e.target.value);
                                    clearErrors('email');
                                }}
                                className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-gray-300 focus:ring-0 rounded-2xl px-5 py-3 text-[13px] font-semibold text-gray-900 placeholder-gray-400 transition-all outline-none"
                                placeholder="Ex: admin@madly.com"
                                required
                                autoFocus
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[12px] font-bold text-gray-700">Password</label>
                                <a href="#" onClick={e => e.preventDefault()} className="text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => {
                                    setData('password', e.target.value);
                                    clearErrors('password');
                                }}
                                className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-gray-300 focus:ring-0 rounded-2xl px-5 py-3 text-[13px] font-semibold text-gray-900 placeholder-gray-400 transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{errors.password}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white py-3 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-black/10"
                            >
                                {processing ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Log In'
                                )}
                            </button>
                        </div>
                        
                        <div className="pt-4">
                            <p className="text-[12px] font-medium text-gray-500 text-center">
                                New to the platform? <a href="#" onClick={(e) => {e.preventDefault(); alert('Please ask your Manager to create an account for you.')}} className="text-gray-900 font-bold hover:underline transition-all">Create an account</a>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
