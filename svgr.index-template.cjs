const { basename, extname } = require("path");

module.exports = (filePaths) => {
    return `
        import { lazy } from "react";

        export default {
            ${filePaths
                .map(({ path }) => {
                    const name = basename(path, extname(path));
                    const exportName = /^\d/.test(name) ? `Svg${name}` : name;

                    return `${exportName}: lazy(() => import("./${name}")),`;
                })
                .join("")}
        }
    `;
};
