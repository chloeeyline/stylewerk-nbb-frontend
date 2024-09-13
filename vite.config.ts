import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            "#": path.resolve(__dirname, "./src/constants"),
            "@": path.resolve(__dirname, "./src/styles"),
        },
    },
    plugins: [react()],
});
