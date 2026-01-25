import { useEffect } from 'react';
import useStore from '../store/useStore';
import CategoryManager from '../components/dashboard/CategoryManager';
import AddTransaction from '../components/dashboard/AddTransaction';
import TransactionList from '../components/dashboard/TransactionList';
import GlassCard from '../components/ui/GlassCard';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const Dashboard = () => {
    const { user, transactions, fetchCategories, fetchTransactions } = useStore();

    useEffect(() => {
        fetchCategories();
        fetchTransactions();
    }, []);

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpenses;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-10">
                <h1 className="text-4xl font-serif font-bold mb-2">Welcome back, {user?.name}</h1>
                <p className="text-text-muted">Here's your financial overview for today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    title="Total Balance"
                    amount={balance}
                    icon={<DollarSign size={24} className="text-primary" />}
                    isBalance
                />
                <StatCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={<TrendingUp size={24} className="text-primary" />}
                />
                <StatCard
                    title="Total Expenses"
                    amount={totalExpenses}
                    icon={<TrendingDown size={24} className="text-red-400" />}
                    isExpense
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <CategoryManager />
                    <AddTransaction />
                </div>
                <div className="lg:col-span-8">
                    <TransactionList />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, amount, icon, isBalance, isExpense }) => (
    <GlassCard className={`relative overflow-hidden ${isBalance ? 'border-primary/30' : ''}`}>
        <div className="flex items-center justify-between relative z-10">
            <div>
                <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
                <p className={`text-3xl font-serif font-bold ${isExpense ? 'text-red-400' : 'text-text'} ${isBalance ? 'text-primary' : ''}`}>
                    ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                {icon}
            </div>
        </div>
    </GlassCard>
);

export default Dashboard;
