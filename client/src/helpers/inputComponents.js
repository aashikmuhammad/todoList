export function renderField({ input, label, meta: { touched, error }, placeholder, className, type = 'text', style }) {
    return (
        <div style={{ position: 'relative' }}>
            {touched && error && <span className={"errorMessage"}>{error}</span>}
            {label && <label>{label}</label>}
            <input
                {...input}
                type={type}
                className={className}
                placeholder={placeholder}
                style={style}
            />
        </div>
    )
}

export function renderDateInput({ input, label, meta: { touched, error }, placeholder, className, defaultValue, min }) {
    return (
        <div style={{ position: 'relative' }}>
            {touched && error && <span className={"errorMessage"}>{error}</span>}
            {label && <label>{label}</label>}
            <input
                {...input}
                type="datetime-local"
                className={className}
                placeholder={placeholder}
                min={min}
                defaultValue={defaultValue}
            />
        </div>
    )
}
