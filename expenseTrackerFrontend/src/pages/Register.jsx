import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const { register, loading } = useStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, username, email, phoneNo, password);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-12">
            <GlassCard className="p-10 border-primary/20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold mb-2">Join Us</h1>
                    <p className="text-text-muted">Start tracking your financial journey beautifully.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <Input
                        label="Username"
                        type="text"
                        placeholder="johndoe123"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        required
                        autoComplete="tel"
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full mt-2 py-3"
                    >
                        Create Account <UserPlus className="w-4 h-4 ml-2" />
                    </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-text-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};

export default Register;
