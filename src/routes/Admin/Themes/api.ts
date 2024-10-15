import { ThemeApi } from "~/schemas/themes";


const builtInThemes: ThemeApi[] = [
    {
        id: "dark",
        name: "Dark",
        base: "dark",
        data: "",
    },
    {
        id: "light",
        name: "Light",
        base: "light",
        data: "",
    },
    {
        id: "system",
        name: "System",
        base: "system",
        data: "",
    },
    {
        id: "colorful",
        name: "Colorful",
        base: "light",
        data: "",
    },
];

export const getThemes = async () => {
    return builtInThemes;
};
