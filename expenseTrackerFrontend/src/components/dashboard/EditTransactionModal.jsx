import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';
import useStore from '../../store/useStore';
import api from '../../services/api';
import Button from '../ui/Button';
import Input from '../ui/Input';
import GlassCard from '../ui/GlassCard';

const EditTransactionModal = ({ transactionId, onClose }) => {
    const { categories, updateTransaction } = useStore();
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('expense');
    const [formData, setFormData] = useState({
        note: '',
        amount: '',
        categoryId: '',
        date: ''
    });

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await api.transactions.getById(transactionId);
                setFormData({
                    note: data.note || '',
                    amount: data.amount || '',
                    categoryId: data.CategoryId || '',
                    date: data.date ? data.date.split('T')[0] : ''
                });
                if (data.type) {
                    setType(data.type.toLowerCase());
                } else if (data.CategoryId) {
                    const selectedCategory = categories.find(c => c.id == data.CategoryId);
                    if (selectedCategory) {
                        setType(selectedCategory.type.toLowerCase());
                    }
                }
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load transaction details');
                onClose();
            }
        };
        fetchTransaction();
    }, [transactionId, categories, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.categoryId) {
            toast.error('Please select a category');
            return;
        }

        try {
            await updateTransaction(transactionId, {
                ...formData,
                CategoryId: formData.categoryId,
                amount: parseFloat(formData.amount),
                type
            });
            toast.success('Transaction updated!');
            onClose();
        } catch (error) {
            toast.error('Failed to update transaction');
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <GlassCard className="w-full max-w-lg border-primary/20 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
                >
                    <X size={20} />
                </button>

                <h3 className="text-xl font-bold text-text mb-6">Edit Entry</h3>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                    <Input
                        label="Title"
                        placeholder="e.g. Rent, Freelancing"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
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
                            onChange={(e) => {
                                const categoryId = e.target.value;
                                const selectedCategory = categories.find(c => c.id == categoryId);
                                setFormData({ ...formData, categoryId });
                                if (selectedCategory) {
                                    setType(selectedCategory.type.toLowerCase());
                                }
                            }}
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

                    <Button type="submit" className="sm:col-span-2 mt-4 py-3">
                        Save Changes <Save size={18} className="ml-2" />
                    </Button>
                </form>
            </GlassCard>
        </div>
    );
};

export default EditTransactionModal;
