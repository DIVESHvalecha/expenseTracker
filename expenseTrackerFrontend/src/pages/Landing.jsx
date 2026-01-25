import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
                <div className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight"
                    >
                        Track your money <br />
                        <span className="text-primary">beautifully.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-text-muted max-w-2xl mx-auto mb-10"
                    >
                        Experience the next generation of finance tracking. Minimalist design meets powerful analytics in a premium glassmorphic interface.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            onClick={() => navigate('/register')}
                            className="text-lg py-4 px-10"
                        >
                            Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/login')}
                            className="text-lg py-4 px-10"
                        >
                            Sign In
                        </Button>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <FeatureCard
                        icon={<BarChart3 className="text-primary" />}
                        title="Premium Analytics"
                        description="Visualize your spending patterns with stunning, interactive charts and insights."
                        delay={0.6}
                    />
                    <FeatureCard
                        icon={<Zap className="text-primary" />}
                        title="Real-time Tracking"
                        description="Manage categories and transactions instantly with our high-performance interface."
                        delay={0.7}
                    />
                    <FeatureCard
                        icon={<Shield className="text-primary" />}
                        title="Secure & Private"
                        description="Your financial data is encrypted and kept private with enterprise-grade security."
                        delay={0.8}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10" />
                    <GlassCard className="!p-0 overflow-hidden border-primary/20 aspect-video md:aspect-[21/9] flex items-center justify-center bg-background-darker/50">
                        <div className="text-center">
                            <p className="text-text-muted italic mb-4">"The best looking expense tracker I've ever used."</p>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30" />
                                <span className="text-text font-medium">Fintech Weekly</span>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
    >
        <GlassCard className="h-full hover:border-primary/30 transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">{title}</h3>
            <p className="text-text-muted leading-relaxed">{description}</p>
        </GlassCard>
    </motion.div>
);

export default Landing;
