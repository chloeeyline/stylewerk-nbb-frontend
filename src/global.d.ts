import "react";

// We extend reacts CSSProperties interface to add custom css-properties.
// Makes it possible to add those in a style-object on a component
// without typescript complaining.
declare module "react" {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}
