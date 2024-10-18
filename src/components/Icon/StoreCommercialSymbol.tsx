import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgStoreCommercialSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612 612"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M500.224.076H111.28L.153 191.278h611.216zM.153 229.519c-.344 8.317 0 27.342 0 38.241 0 20.382 7.304 42.62 19.14 57.36l.573 210.322c0 42.238 35.315 76.482 78.871 76.482h414.048c43.556 0 80.095-34.244 80.095-76.482V325.119c13.384-15.754 19.12-31.93 19.12-57.36v-38.241zM554.64 458.961H57.571l-.057-114.721h37.552c20.535 0 53.097-18.318 66.863-46.348 15.468 27.246 44.359 46.348 71.911 46.348 29.139 0 61.204-17.342 71.911-42.371 10.708 24.435 42.122 42.371 70.649 42.371 28.298 0 57.609-20.803 72.447-49.235 17.342 28.68 42.025 49.215 67.551 49.215 5.603 0 33.346.898 38.241 0z" />
    </svg>
);
const ForwardRef = forwardRef(SvgStoreCommercialSymbol);
export default ForwardRef;
