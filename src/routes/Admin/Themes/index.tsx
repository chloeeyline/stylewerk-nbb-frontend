export default function AdminThemesList() {
    return (
        <div>
            <h1>Admin - ThemesList</h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum veniam ipsa
                provident debitis doloremque repellat rerum labore illum aliquid earum dolores esse
                harum doloribus inventore dolorem assumenda aliquam, magni perferendis.
            </p>
            <h2>Buttons:</h2>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(7, 1fr)" }}>
                <button className="btn">Default</button>
                {["primary", "accent", "info", "success", "warning", "error"].map((color) => (
                    <button key={color} className={`btn btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                ))}
                <button className="btn btn-active">Default active</button>
                {["primary", "accent", "info", "success", "warning", "error"].map((color) => (
                    <button key={color} className={`btn btn-active btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} active
                    </button>
                ))}
                <button disabled className="btn">
                    Default disabled
                </button>
                {["primary", "accent", "info", "success", "warning", "error"].map((color) => (
                    <button key={color} disabled className={`btn btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} disabled
                    </button>
                ))}
                <button className="btn btn-loader">Default loader</button>
                {["primary", "accent", "info", "success", "warning", "error"].map((color) => (
                    <button key={color} className={`btn btn-loader btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} loader
                    </button>
                ))}
            </div>
            <h2>Links:</h2>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(7, 1fr)" }}>
                <a href="#" className="btn">
                    Default
                </a>
                {["primary", "accent", "info", "success", "warning", "error"].map((color) => (
                    <a key={color} href="#" className={`btn btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </a>
                ))}
                <a href="#" className="btn btn-active">
                    Default active
                </a>
                {["primary", "accent", "info", "success", "warning", "error"].map((color) => (
                    <a href="#" key={color} className={`btn btn-active btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} active
                    </a>
                ))}
                <a href="#" className="btn btn-disabled">
                    Default disabled
                </a>
                {["primary", "accent", "info", "success", "warning", "error"].map((color) => (
                    <a href="#" key={color} className={`btn btn-disabled btn-${color}`}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} disabled
                    </a>
                ))}
            </div>
        </div>
    );
}
