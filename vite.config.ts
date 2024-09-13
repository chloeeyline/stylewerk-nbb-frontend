import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            "@const": path.resolve(__dirname, "./src/constants"),
        },
    },
    plugins: [react()],
});
