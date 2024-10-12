import Grid from "~/components/layout/Grid";
import { updateLanguage } from "./update";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { useEffect, useRef, useState } from "react";
import InputField from "~/components/forms/InputField";
import { useParams } from "react-router-dom";
import Ajax from "~/utils/ajax";
import { Language } from "~/constants/backend-routes";

const isRecordRecord = (input: unknown): input is Record<string, Record<string, string>> => {
    if (
        typeof input !== "object" ||
        input === null ||
        Object.values(input).some((outer) => {
            if (
                typeof outer !== "object" ||
                outer === null ||
                Object.values(outer).some((inner) => typeof inner !== "string")
            ) {
                return true;
            }

            return false;
        })
    ) {
        return false;
    }

    return true;
};

export default function AdminTranslationsManage() {
    const { translationId } = useParams();
    const jsonRef = useRef<HTMLTextAreaElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    console.log(translationId);

    const refetch = async (code: string) => {
        if (nameRef.current === null || jsonRef.current === null) {
            return;
        }
        const response = await Ajax.get(Language.Details, { search: { code } });

        if (
            response.ok === false ||
            typeof response.result !== "object" ||
            response.result === null ||
            !("name" in response.result) ||
            typeof response.result.name !== "string" ||
            !("data" in response.result) ||
            typeof response.result.data !== "string"
        ) {
            return;
        }

        nameRef.current.value = response.result.name;
        jsonRef.current.value = response.result.data;
    };

    useEffect(() => {
        if (typeof translationId !== "string") return;
        refetch(translationId);
    }, [translationId]);

    if (typeof translationId !== "string") {
        return <div>No id given</div>;
    }

    return (
        <Grid layout="header" className="block-size-100">
            <h1>Admin - TranslationsManage</h1>
            <Grid layout="headerFooter" className="block-size-100">
                <div>
                    <InputField label="Code" name="code" value="translationId" readOnly />
                    <InputField label="Name" name="name" ref={nameRef} />
                </div>
                <ScrollContainer direction="both">
                    <textarea ref={jsonRef} />
                </ScrollContainer>
                <div>
                    <button
                        type="button"
                        onClick={async () => {
                            if (
                                typeof nameRef.current?.value !== "string" ||
                                typeof jsonRef.current?.value !== "string"
                            ) {
                                return;
                            }

                            const parsed = JSON.parse(jsonRef.current.value);

                            if (isRecordRecord(parsed) === false) {
                                return;
                            }

                            const result = await updateLanguage(translationId, nameRef.current.value, parsed);

                            if (result.ok === false) {
                                console.error("Fuck");
                                return;
                            }

                            await refetch(translationId);
                        }}>
                        Button
                    </button>
                </div>
            </Grid>
        </Grid>
    );
}
