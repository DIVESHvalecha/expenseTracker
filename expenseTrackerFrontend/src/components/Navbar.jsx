import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, LogOut, LayoutDashboard, PieChart } from 'lucide-react';
import useStore from '../store/useStore';
import Button from './ui/Button';

const Navbar = () => {
    const { user, logout } = useStore();
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass-card !rounded-full py-3 px-8">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-1.5 rounded-lg shadow-glow group-hover:scale-110 transition-transform">
                        <Wallet className="w-6 h-6 text-background-darker" />
                    </div>
                    <span className="text-xl font-serif font-bold text-text">
                        ExpenseTracker
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <div className="flex items-center gap-4">
                                <NavLink to="/dashboard" active={location.pathname === '/dashboard'} icon={<LayoutDashboard size={18} />}>
                                    Dashboard
                                </NavLink>
                                <NavLink to="/analytics" active={location.pathname === '/analytics'} icon={<PieChart size={18} />}>
                                    Analytics
                                </NavLink>
                            </div>
                            <div className="h-6 w-px bg-white/10" />
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-text-muted">
                                    Hi, <span className="text-primary">{user.name}</span>
                                </span>
                                <button
                                    onClick={logout}
                                    className="p-2 hover:bg-white/5 rounded-full text-text-muted hover:text-red-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children, active, icon }) => (
    <Link
        to={to}
        className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all ${active ? 'bg-primary/20 text-primary shadow-glow' : 'text-text-muted hover:text-text hover:bg-white/5'
            }`}
    >
        {icon}
        {children}
    </Link>
);

export default Navbar;
