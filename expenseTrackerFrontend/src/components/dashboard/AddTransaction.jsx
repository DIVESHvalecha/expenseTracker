import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import useStore from '../../store/useStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import GlassCard from '../ui/GlassCard';

const AddTransaction = () => {
    const { categories, addTransaction } = useStore();
    const [type, setType] = useState('expense');
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        categoryId: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.categoryId) {
            toast.error('Please select a category');
            return;
        }

        try {
            await addTransaction({
                ...formData,
                amount: parseFloat(formData.amount),
                type
            });
            setFormData({
                title: '',
                amount: '',
                categoryId: '',
                date: new Date().toISOString().split('T')[0]
            });
            toast.success(`${type === 'income' ? 'Income' : 'Expense'} added!`);
        } catch (error) {
            toast.error('Failed to add transaction');
        }
    };

    return (
        <GlassCard className="border-primary/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">New Entry</h3>
                <div className="flex bg-background-darker/50 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setType('expense')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${type === 'expense' ? 'bg-primary text-background-darker' : 'text-text-muted hover:text-text'
                            }`}
                    >
                        Expense
                    </button>
                    <button
                        onClick={() => setType('income')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${type === 'income' ? 'bg-primary text-background-darker shadow-glow' : 'text-text-muted hover:text-text'
                            }`}
                    >
                        Income
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <Input
                    label="Title"
                    placeholder="e.g. Rent, Freelancing"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <Input
                    label="Amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                />
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted ml-1">Category</label>
                    <select
                        className="glass-input h-10 appearance-none bg-background-lighter"
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <Input
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />

                <Button type="submit" className="sm:col-span-2 mt-2 py-3">
                    Add {type === 'income' ? 'Income' : 'Expense'} <PlusCircle size={18} className="ml-1" />
                </Button>
            </form>
        </GlassCard>
    );
};

export default AddTransaction;
