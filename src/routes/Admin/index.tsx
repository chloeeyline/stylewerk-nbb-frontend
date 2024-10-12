import { Link } from "react-router-dom";
import Routes from "#/routes";

export default function Admin() {
    return (
        <div>
            <h1>Admin</h1>
            <Link to={Routes.Admin.Translations.Manage}>Manage</Link>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum veniam ipsa
                provident debitis doloremque repellat rerum labore illum aliquid earum dolores esse
                harum doloribus inventore dolorem assumenda aliquam, magni perferendis.
            </p>
        </div>
    );
}
