import { useState, useRef } from 'react';
import { Upload, X, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import BulkUploadResultsModal from './BulkUploadResultsModal';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
        } else {
            toast.error('Please select a valid CSV file');
        }
    };

    const reset = () => {
        setFile(null);
        setShowResults(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <>
            <GlassCard className="border-primary/20 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-text">Bulk Upload</h3>
                        <p className="text-xs text-text-muted">Fast batch processing via CSV</p>
                    </div>
                    {file && (
                        <button onClick={reset} className="text-text-muted hover:text-red-400 transition-colors">
                            <X size={18} />
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="group relative border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-2xl p-8 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                        <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                <Upload size={24} />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-text">
                                    {file ? file.name : 'Select or drop CSV file'}
                                </p>
                                <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">Max 5MB</p>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => setShowResults(true)}
                        disabled={!file}
                        className="w-full py-3"
                    >
                        Upload CSV <ChevronRight size={18} className="ml-1" />
                    </Button>
                </div>
            </GlassCard>

            {showResults && (
                <BulkUploadResultsModal
                    file={file}
                    onClose={reset}
                />
            )}
        </>
    );
};

export default BulkUpload;
