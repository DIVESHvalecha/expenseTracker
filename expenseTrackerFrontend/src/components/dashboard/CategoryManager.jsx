import { useState } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import { toast } from 'sonner';
import useStore from '../../store/useStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import GlassCard from '../ui/GlassCard';

const CategoryManager = () => {
    const { categories, addCategory, deleteCategory } = useStore();
    const [name, setName] = useState('');
    const [color, setColor] = useState('#88B857');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await addCategory({ name, color });
            setName('');
            toast.success('Category added');
        } catch (error) {
            toast.error('Failed to add category');
        }
    };

    return (
        <GlassCard>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag size={20} className="text-primary" />
                Categories
            </h3>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <Input
                    placeholder="New Category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1"
                />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-10 bg-transparent border border-white/10 rounded-xl cursor-pointer p-1"
                />
                <Button type="submit" className="!px-3">
                    <Plus size={20} />
                </Button>
            </form>

            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {categories.length === 0 ? (
                    <p className="text-sm text-text-muted italic">No categories yet</p>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-primary/30 transition-all"
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm font-medium">{category.name}</span>
                            <button
                                onClick={() => deleteCategory(category.id)}
                                className="text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
};

export default CategoryManager;
