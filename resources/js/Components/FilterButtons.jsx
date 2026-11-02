export default function FilterButtons({ options, active, onChange, label }) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className="toggle"
                    data-filter={option.value}
                    aria-pressed={active === option.value}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
