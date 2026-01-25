import { motion } from 'framer-motion';

const Button = ({ children, variant = "primary", className = "", loading, ...props }) => {
    const variants = {
        primary: "btn-primary",
        outline: "btn-outline",
        ghost: "text-text hover:bg-white/5 px-4 py-2 rounded-xl transition-all"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
            {...props}
        >
            {loading ? (
                <div className="w-5 h-5 border-2 border-background-darker border-t-transparent rounded-full animate-spin" />
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;
