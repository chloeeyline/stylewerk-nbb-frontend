export default function AdminThemesList() {
    const buttonTypes = ["primary", "accent", "info", "success", "warning", "error"];

    return (
        <div>
            <h1>Admin - ThemesList</h1>
            <h2>Buttons:</h2>
            <div className="d-grid gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                <button className="btn">Default</button>
                {buttonTypes.map((color) => (
                    <button key={color} className={`btn btn-${color} shadow-high`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                ))}
                <button className="btn btn-active">Default active</button>
                {buttonTypes.map((color) => (
                    <button key={color} className={`btn btn-active btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} active
                    </button>
                ))}
                <button disabled className="btn">
                    Default disabled
                </button>
                {buttonTypes.map((color) => (
                    <button key={color} disabled className={`btn btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} disabled
                    </button>
                ))}
                <button className="btn btn-loader">Default loader</button>
                {buttonTypes.map((color) => (
                    <button key={color} className={`btn btn-loader btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} loader
                    </button>
                ))}
            </div>
            <h2>Links:</h2>
            <div className="d-grid gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                <a href="#" className="btn">
                    Default
                </a>
                {buttonTypes.map((color) => (
                    <a key={color} href="#" className={`btn btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </a>
                ))}
                <a href="#" className="btn btn-active">
                    Default active
                </a>
                {buttonTypes.map((color) => (
                    <a href="#" key={color} className={`btn btn-active btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} active
                    </a>
                ))}
                <a href="#" className="btn btn-disabled">
                    Default disabled
                </a>
                {buttonTypes.map((color) => (
                    <a href="#" key={color} className={`btn btn-disabled btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} disabled
                    </a>
                ))}
            </div>
        </div>
    );
}
