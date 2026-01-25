import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={onClick ? { scale: 1.02 } : {}}
            onClick={onClick}
            className={`glass-card p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
