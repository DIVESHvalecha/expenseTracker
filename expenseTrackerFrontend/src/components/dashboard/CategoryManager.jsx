import { useState, useEffect } from 'react';
import { Plus, Trash2, Tag, Image as ImageIcon, FileText, Edit2, Smile } from 'lucide-react';
import { toast } from 'sonner';
import EmojiPicker from 'emoji-picker-react';
import useStore from '../../store/useStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import GlassCard from '../ui/GlassCard';

const CategoryManager = () => {
    const { categories, addCategory, deleteCategory, updateCategory } = useStore();
    const [name, setName] = useState('');
    const [type, setType] = useState('expense');
    const [description, setDescription] = useState('');
    const [emoji, setEmoji] = useState('💰');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && showEmojiPicker) {
                setShowEmojiPicker(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showEmojiPicker]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            const categoryData = {
                name,
                type,
                description: description.trim(),
                url: emoji
            };

            if (editingCategoryId) {
                await updateCategory(editingCategoryId, categoryData);
                toast.success('Category updated successfully');
            } else {
                await addCategory(categoryData);
                toast.success('Category added successfully');
            }

            resetForm();
        } catch (error) {
            toast.error(editingCategoryId ? 'Failed to update category' : 'Failed to add category');
        }
    };

    const handleEdit = async (category) => {
        try {
            // Optional: Fetch fresh data from backend as per user request
            const freshCategory = await useStore.getState().api.categories.getById(category.id);
            const dataToUse = freshCategory || category;

            setName(dataToUse.name);
            setType(dataToUse.type);
            setDescription(dataToUse.description || '');
            setEmoji(dataToUse.url || '💰');
            setEditingCategoryId(category.id);
            setIsAdding(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            // Fallback to local data if API fails
            setName(category.name);
            setType(category.type);
            setDescription(category.description || '');
            setEmoji(category.url || '💰');
            setEditingCategoryId(category.id);
            setIsAdding(true);
        }
    };

    const resetForm = () => {
        setName('');
        setType('expense');
        setDescription('');
        setEmoji('💰');
        setShowEmojiPicker(false);
        setIsAdding(false);
        setEditingCategoryId(null);
    };

    return (
        <GlassCard className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Tag size={20} className="text-primary" />
                    Categories
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (isAdding) resetForm();
                        else setIsAdding(true);
                    }}
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

                    <div className="flex flex-col gap-1.5 relative">
                        <label className="text-xs font-medium text-text-muted ml-1">Icon / Emoji</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 transition-all text-2xl"
                            >
                                {emoji}
                            </button>
                            <div className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm flex items-center text-text-muted">
                                Click the icon to select an emoji
                            </div>
                        </div>

                        {showEmojiPicker && (
                            <div className="absolute bottom-full left-0 z-50 mb-2 animate-in fade-in zoom-in duration-200">
                                <div className="fixed inset-0" onClick={() => setShowEmojiPicker(false)} />
                                <div className="relative">
                                    <EmojiPicker
                                        onEmojiClick={(emojiData) => {
                                            setEmoji(emojiData.emoji);
                                            setShowEmojiPicker(false);
                                        }}
                                        theme="dark"
                                        searchPlaceholder="Search emoji..."
                                        width={300}
                                        height={400}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full mt-2">
                        {editingCategoryId ? 'Update Category' : 'Add Category'}
                    </Button>
                </form>
            )}

            <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                {categories.length === 0 ? (
                    <div className="text-center py-10 opacity-50">
                        <Tag size={40} className="mx-auto mb-3 opacity-20" />
                        <p className="text-sm italic">No categories yet. Add one to get started.</p>
                    </div>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-start gap-3 p-2 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10 transition-all overflow-hidden"
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10 bg-primary/10 text-xl">
                                {category.url || '💰'}
                            </div>

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

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10"
                                    title="Edit category"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => deleteCategory(category.id)}
                                    className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10"
                                    title="Delete category"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
};

export default CategoryManager;
