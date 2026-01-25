import { useState, useEffect } from 'react';
import {
    PieChart as RePieChart, Pie, Cell,
    BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart as ReLineChart, Line, Legend,
    AreaChart, Area
} from 'recharts';
import { PieChart, BarChart3, TrendingUp, Info } from 'lucide-react';
import api from '../services/api';
import GlassCard from '../components/ui/GlassCard';

const COLORS = ['#88B857', '#9ED36A', '#AAB7A1', '#4d6433', '#1a241a'];

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const overview = await api.analytics.getOverview();
                setData(overview);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-10">
                <h1 className="text-4xl font-serif font-bold mb-2">Analytics Dashboard</h1>
                <p className="text-text-muted">Deep dive into your financial habits and trends.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Distribution */}
                <GlassCard className="h-[450px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <PieChart size={20} className="text-primary" />
                            Category Distribution
                        </h3>
                        <div className="p-2 hover:bg-white/5 rounded-full cursor-help group relative">
                            <Info size={16} className="text-text-muted" />
                            <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-background-lighter border border-white/10 rounded-lg text-xs invisible group-hover:visible z-20">
                                Shows how much you spend in each category.
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={data.categoryDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#151B15', border: '1px solid rgba(136, 184, 87, 0.2)', borderRadius: '12px' }}
                                />
                                <Legend />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Monthly Expenses */}
                <GlassCard className="h-[450px] flex flex-col">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                        <BarChart3 size={20} className="text-primary" />
                        Monthly Comparison
                    </h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={data.monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a362a" vertical={false} />
                                <XAxis dataKey="month" stroke="#AAB7A1" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#AAB7A1" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#151B15', border: '1px solid rgba(136, 184, 87, 0.2)', borderRadius: '12px' }}
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                />
                                <Legend iconType="circle" />
                                <Bar dataKey="income" fill="#88B857" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Wealth Trend */}
                <GlassCard className="lg:col-span-2 h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                        <TrendingUp size={20} className="text-primary" />
                        Income vs Expense Trend
                    </h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.monthlyData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#88B857" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#88B857" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a362a" vertical={false} />
                                <XAxis dataKey="month" stroke="#AAB7A1" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#AAB7A1" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#151B15', border: '1px solid rgba(136, 184, 87, 0.2)', borderRadius: '12px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#88B857"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorIncome)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#ff6b6b"
                                    strokeWidth={3}
                                    fill="transparent"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Analytics;
