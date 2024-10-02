import { Outlet } from "react-router-dom";

import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { listTemplates, selectTemplate } from "~/redux/features/template/template-slice";
import { useEffect } from "react";

const TemplatesList = () => {
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(listTemplates());
    }, []);

    return (
        <div>
            {template.items &&
                template.items.length > 0 &&
                template.items?.map((item) => (
                    <div key={item.id}>
                        {item.name && <div>{item.name}</div>}
                        {item.description && <div>{item.description}</div>}
                        {item.tags && <div>{item.tags}</div>}
                        {item.username && <div>{item.username}</div>}
                    </div>
                ))}
        </div>
    );
};

export default function TemplatesLayout() {
    return (
        <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
            <TemplatesList />
            <ScrollContainer direction="vertical">
                <Outlet />
            </ScrollContainer>
        </Grid>
    );
}
