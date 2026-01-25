import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword, validateToken, loading } = useStore();

    const [isValidating, setIsValidating] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                await validateToken(token);
                setIsValidating(false);
            } catch (error) {
                toast.error(error.message || 'The reset link is invalid or has expired.');
                navigate('/login');
            }
        };
        checkToken();
    }, [token, validateToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        try {
            await resetPassword(token, password);
            setIsSuccess(true);
            toast.success('Password reset successfully!');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            toast.error(error.message || 'Failed to reset password');
        }
    };

    if (isValidating) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="max-w-md mx-auto px-6 py-12">
                <GlassCard className="p-10 border-primary/20 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary/20 p-4 rounded-full">
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-serif font-bold mb-4">Reset Complete</h1>
                    <p className="text-text-muted mb-8">Your password has been successfully updated. Redirecting you to login...</p>
                    <Button onClick={() => navigate('/login')} className="w-full">
                        Go to Login
                    </Button>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto px-6 py-12">
            <GlassCard className="p-10 border-primary/20">
                <div className="text-center mb-10">
                    <Link to="/login" className="inline-flex items-center text-xs text-text-muted hover:text-primary transition-colors mb-4">
                        <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                    </Link>
                    <h1 className="text-4xl font-serif font-bold mb-2">New Password</h1>
                    <p className="text-text-muted">Please enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full mt-2 py-3"
                    >
                        Update Password
                    </Button>
                </form>
            </GlassCard>
        </div>
    );
};

export default ResetPassword;
