import type React from "react";
import { memo, useEffect } from "react";
import { Provider } from "react-redux";

import { refreshUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { store } from "~/redux/store";

const UserCaller = memo(({ children }: React.PropsWithChildren) => {
    const { status } = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === "refresh") {
            dispatch(refreshUser());
        }
    }, [status]);

    return children;
});

export default function ReduxProvider({ children }: React.PropsWithChildren) {
    return (
        <Provider store={store}>
            <UserCaller>{children}</UserCaller>
        </Provider>
    );
}
