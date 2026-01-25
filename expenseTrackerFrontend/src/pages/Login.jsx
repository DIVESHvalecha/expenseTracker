import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock, LogIn } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-12">
            <GlassCard className="p-10 border-primary/20 relative">
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold mb-2">Welcome Back</h1>
                    <p className="text-text-muted">Enter your details to track your growth.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="demo@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <div className="flex flex-col gap-1">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <Link
                            to="/forgot-password"
                            className="text-xs text-primary/80 hover:text-primary transition-colors text-right mt-1"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full mt-2 py-3"
                    >
                        Sign In <LogIn className="w-4 h-4 ml-2" />
                    </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-text-muted">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline font-medium">
                            Create Account
                        </Link>
                    </p>
                </div>
            </GlassCard>

            <div className="mt-6 text-center">
                <p className="text-xs text-text-muted opacity-50">
                    Demo: demo@example.com / password
                </p>
            </div>
        </div>
    );
};

export default Login;
