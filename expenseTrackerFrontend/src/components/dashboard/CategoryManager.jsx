import { useState } from 'react';
import { Plus, Trash2, Tag, Image as ImageIcon, FileText } from 'lucide-react';
import { toast } from 'sonner';
import useStore from '../../store/useStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import GlassCard from '../ui/GlassCard';

const CategoryManager = () => {
    const { categories, addCategory, deleteCategory } = useStore();
    const [name, setName] = useState('');
    const [type, setType] = useState('expense');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await addCategory({
                name,
                type,
                description: description.trim(),
                image: image.trim()
            });
            setName('');
            setType('expense');
            setDescription('');
            setImage('');
            setIsAdding(false);
            toast.success('Category added successfully');
        } catch (error) {
            toast.error('Failed to add category');
        }
    };

    return (
        <GlassCard className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Tag size={20} className="text-primary" />
                    Categories
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAdding(!isAdding)}
                    className="!py-1.5"
                >
                    {isAdding ? 'Cancel' : <Plus size={18} />}
                </Button>
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Name"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-text-muted ml-1">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            >
                                <option value="expense" className="bg-[#1A1A1A]">Expense</option>
                                <option value="income" className="bg-[#1A1A1A]">Income</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Description"
                        placeholder="What's this category for?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        icon={<FileText size={16} />}
                    />

                    <Input
                        label="Image URL"
                        placeholder="https://images.unsplash.com/..."
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        icon={<ImageIcon size={16} />}
                    />

                    <Button type="submit" className="w-full mt-2">
                        Add Category
                    </Button>
                </form>
            )}

            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {categories.length === 0 ? (
                    <div className="text-center py-10 opacity-50">
                        <Tag size={40} className="mx-auto mb-3 opacity-20" />
                        <p className="text-sm italic">No categories yet. Add one to get started.</p>
                    </div>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-start gap-4 p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10 transition-all overflow-hidden"
                        >
                            {category.image ? (
                                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-crop"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full items-center justify-center bg-primary/20 text-primary">
                                        <Tag size={20} />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 bg-primary/10 text-primary"
                                >
                                    <Tag size={20} />
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <h4 className="font-semibold text-sm truncate">{category.name}</h4>
                                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border ${category.type === 'income'
                                        ? 'bg-green-400/10 text-green-400 border-green-400/20'
                                        : 'bg-red-400/10 text-red-400 border-red-400/20'
                                        }`}>
                                        {category.type}
                                    </span>
                                </div>
                                {category.description && (
                                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                                        {category.description}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() => deleteCategory(category.id)}
                                className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
                                title="Delete category"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
};

export default CategoryManager;
