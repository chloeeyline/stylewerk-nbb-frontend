import type React from "react";
import { memo } from "react";
import { Provider } from "react-redux";

import { getUser } from "~/redux/features/user/user-slice";
import { useAppDispatch } from "~/redux/hooks";
import { store } from "~/redux/store";

const UserCaller = memo(({ children }: React.PropsWithChildren) => {
    const dispatch = useAppDispatch();

    dispatch(getUser());
    return <>{children}</>;
});

export default function ReduxProvider({ children }: React.PropsWithChildren) {
    return (
        <Provider store={store}>
            <UserCaller>{children}</UserCaller>
        </Provider>
    );
}
