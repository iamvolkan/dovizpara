interface DataBoxProps {
    title: string;
    value: string | number;
    change?: string | number;
    isPositive?: boolean;
    className?: string;
}

export default function DataBox({ title, value, change, isPositive, className = "" }: DataBoxProps) {
    return (
        <div className={`bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm ${className}`}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change && (
                <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {change}
                </p>
            )}
        </div>
    );
}
