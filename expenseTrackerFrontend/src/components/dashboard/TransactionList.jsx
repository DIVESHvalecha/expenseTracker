import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, TrendingDown, TrendingUp, Calendar, Pencil } from 'lucide-react';
import useStore from '../../store/useStore';
import GlassCard from '../ui/GlassCard';
import EditTransactionModal from './EditTransactionModal';

const TransactionList = () => {
    const { transactions, categories, deleteTransaction } = useStore();
    const [editingId, setEditingId] = useState(null);

    const getCategoryColor = (id) => categories.find(c => c.id == id)?.color || '#AAB7A1';

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-xl font-bold">Recent History</h3>
                <span className="text-xs text-text-muted">{transactions.length} total entries</span>
            </div>

            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {transactions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-10"
                        >
                            <p className="text-text-muted italic">No transactions found.</p>
                        </motion.div>
                    ) : (
                        transactions.map((t) => (
                            <motion.div
                                key={t.transactionId}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="group"
                            >
                                <GlassCard className="!p-4 hover:border-white/20 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-xl border ${t.categoryType?.toUpperCase() === 'INCOME' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-red-500/10 border-red-500/20 text-red-400'
                                                }`}>
                                                {t.categoryType?.toUpperCase() === 'INCOME' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-text">{t.note}</h4>
                                                <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} /> {t.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(t.CategoryId) }} />
                                                        {(t.categoryName)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`text-lg font-bold font-serif ${t.categoryType?.toUpperCase() === 'INCOME' ? 'text-primary' : 'text-red-400'
                                                }`}>
                                                {t.categoryType?.toUpperCase() === 'INCOME' ? '+' : '-'}${Number(t.amount || 0).toFixed(2)}
                                            </span>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all relative z-10">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setEditingId(t.transactionId);
                                                    }}
                                                    className="p-2 text-text-muted hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        deleteTransaction(t.transactionId);
                                                    }}
                                                    className="p-2 text-text-muted hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {editingId && (
                <EditTransactionModal
                    transactionId={editingId}
                    onClose={() => setEditingId(null)}
                />
            )}
        </div>
    );
};

export default TransactionList;
