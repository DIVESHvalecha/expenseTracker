import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import useStore from '../../store/useStore';
import Button from '../ui/Button';

const BulkUploadResultsModal = ({ file, onClose }) => {
    const { bulkUploadTransactions } = useStore();
    const [processedResults, setProcessedResults] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const handleUpload = async () => {
            try {
                // 1. Parse CSV locally to get display data
                const localData = await new Promise((resolve) => {
                    Papa.parse(file, {
                        header: true,
                        skipEmptyLines: true,
                        complete: (results) => resolve(results.data)
                    });
                });

                // 2. Send to backend
                const response = await bulkUploadTransactions(file);
                const backendErrors = response.body || [];

                // 3. Map status to local data based on index
                const merged = localData.map((row, index) => {
                    const rowErrors = backendErrors[index] || [];
                    return {
                        ...row,
                        status: rowErrors.length === 0 ? 'success' : 'error',
                        errors: rowErrors
                    };
                });

                setProcessedResults(merged);
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                setIsProcessing(false);
            }
        };

        handleUpload();
    }, [file, bulkUploadTransactions]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-background-darker/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-background-lighter border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <div>
                        <h2 className="text-2xl font-bold">Upload Status</h2>
                        <p className="text-sm text-text-muted mt-1">{file?.name}</p>
                    </div>
                    {!isProcessing && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-xl transition-all text-text-muted hover:text-text"
                        >
                            <X size={24} />
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {isProcessing ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <div className="text-center">
                                <p className="text-lg font-medium">Processing Batch...</p>
                                <p className="text-sm text-text-muted">Waiting for server response</p>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="text-left text-xs font-bold uppercase tracking-widest text-text-muted">
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Note</th>
                                        <th className="px-4 py-2 text-right">Amount</th>
                                        <th className="px-4 py-2">Category</th>
                                        <th className="px-4 py-2">Type</th>
                                        <th className="px-4 py-2 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processedResults?.map((res, i) => (
                                        <tr key={i} className="group bg-white/5 hover:bg-white/10 transition-colors rounded-xl overflow-hidden">
                                            <td className="px-4 py-3 first:rounded-l-xl">
                                                <div className="flex items-center gap-2">
                                                    {res.status === 'success' ? (
                                                        <div className="text-primary flex items-center gap-1.5">
                                                            <CheckCircle2 size={16} />
                                                            <span className="text-[10px] font-bold uppercase tracking-wider">Success</span>
                                                        </div>
                                                    ) : (
                                                        <div className="text-red-400 flex items-center gap-1.5 relative group/tooltip cursor-help">
                                                            <AlertCircle size={16} />
                                                            <span className="text-[10px] font-bold uppercase tracking-wider">Error</span>
                                                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover/tooltip:block z-[110] pointer-events-none">
                                                                <div className="bg-background-darker border border-red-500/20 px-3 py-2 rounded-xl shadow-2xl backdrop-blur-md min-w-[220px]">
                                                                    <p className="text-xs font-bold text-red-400 mb-1 leading-none uppercase tracking-widest">Server Errors</p>
                                                                    <ul className="text-[11px] text-text list-disc list-inside space-y-0.5">
                                                                        {res.errors?.map((err, j) => (
                                                                            <li key={j}>{err}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium">{res.note}</td>
                                            <td className="px-4 py-3 text-sm font-bold text-right">
                                                {res.amount ? `$${parseFloat(res.amount).toFixed(2)}` : '—'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-text-muted">{res.category || '—'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border ${res.type?.toLowerCase() === 'income'
                                                    ? 'bg-primary/10 text-primary border-primary/20'
                                                    : 'bg-red-400/10 text-red-400 border-red-400/20'
                                                    }`}>
                                                    {res.type || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right text-xs text-text-muted last:rounded-r-xl">{res.date || '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/5 bg-white/5">
                    <Button onClick={onClose} variant="outline" className="w-full" disabled={isProcessing}>
                        Close
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default BulkUploadResultsModal;
