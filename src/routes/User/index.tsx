import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getUser, selectUser } from "~/redux/features/user/userSlice";

export default function User() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    console.log(user);

    if (user === null) {
        dispatch(getUser("1"));
        return null;
    }

    return (
        <div>
            <h1>User</h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum veniam ipsa
                provident debitis doloremque repellat rerum labore illum aliquid earum dolores esse
                harum doloribus inventore dolorem assumenda aliquam, magni perferendis.
            </p>
        </div>
    );
}
