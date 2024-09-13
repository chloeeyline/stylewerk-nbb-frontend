/** @type {import("@svgr/core").Config} */
module.exports = {
    svgProps: {
        width: "1em",
        height: "1em",
        role: "img",
    },
    ref: true,
    filenameCase: "pascal",
    typescript: true,
    titleProp: true,
    svgo: true,
    jsxRuntime: "automatic", // Ensure React import is not added
    svgoConfig: {
        multipass: true, // boolean
        js2svg: {
            indent: 4,
            pretty: true,
        },
        plugins: [
            {
                name: "preset-default",
                params: {
                    overrides: {
                        // Ensure the viewBox is not removed
                        removeViewBox: false,
                    },
                },
            },
            {
                name: "cleanupAttrs",
                params: {
                    newlines: true,
                    trim: true,
                    spaces: true,
                },
            },
            "cleanupEnableBackground",
            {
                name: "cleanupIds",
                params: {
                    remove: true,
                    force: true,
                },
            },
            {
                name: "cleanupListOfValues",
                params: {
                    floatPrecision: 3,
                    leadingZero: true,
                    defaultPx: true,
                    convertToPx: true,
                },
            },
            {
                name: "cleanupNumericValues",
                params: {
                    floatPrecision: 3,
                    leadingZero: true,
                    defaultPx: true,
                    convertToPx: true,
                },
            },
            "collapseGroups",
            {
                name: "convertStyleToAttrs",
                params: {
                    keepImportant: true,
                },
            },
            {
                name: "removeAttrs",
                params: {
                    attrs: "svg:xml:preserve",
                    preserveCurrentColor: true,
                },
            },
            /* {
                name: "removeAttrs",
                params: {
                    attrs: "g:data-name",
                    preserveCurrentColor: true,
                },
            }, */
            "removeComments",
            {
                name: "removeDesc",
                params: {
                    removeAny: true,
                },
            },
            "removeDoctype",
            "removeEditorsNSData",
            "removeEmptyAttrs",
            "removeEmptyContainers",
            {
                name: "removeEmptyText",
                params: {
                    text: true,
                    tspan: true,
                    tref: true,
                },
            },
            {
                name: "removeHiddenElems",
                params: {
                    isHidden: true,
                    displayNone: true,
                    opacity0: true,
                    circleR0: true,
                    ellipseRX0: true,
                    ellipseRY0: true,
                    rectWidth0: true,
                    rectHeight0: true,
                    patternWidth0: true,
                    patternHeight0: true,
                    imageWidth0: true,
                    imageHeight0: true,
                    pathEmptyD: true,
                    polylineEmptyPoints: true,
                    polygonEmptyPoints: true,
                },
            },
            "removeMetadata",
            "removeScriptElement",
            "removeTitle",
            "removeUselessStrokeAndFill",
            {
                name: "removeXlink",
                params: {
                    includeLegacy: true,
                },
            },
            "removeXMLProcInst",
            "removeXMLNS",
            {
                name: "sortAttrs",
                params: {
                    order: ["id", "width", "height", "fill", "stroke"],
                    xmlnsOrder: "front",
                },
            },
            "sortDefsChildren",
        ],
    },
};
