import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSupportedLanguages } from "~/utils/i18n";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [languages, setLanguages] = useState<Record<string, string>>({});

    useEffect(() => {
        getSupportedLanguages().then((languages) => {
            setLanguages(languages);
        });
    }, []);

    return (
        <select
            value={i18n.language}
            onChange={(e) => {
                i18n.changeLanguage(e.target.value);
            }}>
            {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                    {name}
                </option>
            ))}
        </select>
    );
}
