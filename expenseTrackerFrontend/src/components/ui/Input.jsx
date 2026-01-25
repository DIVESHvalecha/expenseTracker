const Input = ({ label, error, className = "", ...props }) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-text-muted ml-1">
                    {label}
                </label>
            )}
            <input
                className={`glass-input ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}`}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 ml-1 mt-0.5">{error}</span>
            )}
        </div>
    );
};

export default Input;
