export default function Card({ children, className = '', ...props }) {
    return (
        <div className={`rounded-md border border-line bg-card p-4 ${className}`} {...props}>
            {children}
        </div>
    );
}
