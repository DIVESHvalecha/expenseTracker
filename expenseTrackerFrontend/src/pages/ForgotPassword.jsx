import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, ArrowLeft } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPassword, loading } = useStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            toast.success('Reset link sent to your email!');
            setEmail('');
        } catch (error) {
            toast.error(error.message || 'Failed to send reset link');
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-12">
            <GlassCard className="p-10 border-primary/20">
                <div className="text-center mb-10">
                    <Link to="/login" className="inline-flex items-center text-xs text-text-muted hover:text-primary transition-colors mb-4">
                        <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                    </Link>
                    <h1 className="text-4xl font-serif font-bold mb-2">Reset Password</h1>
                    <p className="text-text-muted">Enter your email and we'll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full mt-2 py-3"
                    >
                        Send Reset Link
                    </Button>
                </form>
            </GlassCard>
        </div>
    );
};

export default ForgotPassword;
