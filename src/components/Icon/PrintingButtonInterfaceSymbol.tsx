import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPrintingButtonInterfaceSymbol = (
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
        <path d="M535.5 325.125h-459c-42.247 0-76.5 34.253-76.5 76.5v38.25c0 42.247 34.253 76.5 76.5 76.5h38.25c8.53 32.934 40.889 57.375 76.5 57.375h229.5c35.61 0 67.971-24.441 76.5-57.375h38.25c42.247 0 76.5-34.253 76.5-76.5v-38.25c0-42.247-34.253-76.5-76.5-76.5m38.25 114.75c0 21.133-17.117 38.25-38.25 38.25h-38.25c-8.529-32.934-40.89-57.375-76.5-57.375h-229.5c-35.611 0-67.97 24.441-76.5 57.375H76.5c-21.133 0-38.25-17.136-38.25-38.25v-38.25c0-21.133 17.117-38.25 38.25-38.25h459c21.133 0 38.25 17.117 38.25 38.25zm-76.5-325.125c0-42.247-34.253-76.5-76.5-76.5h-229.5c-42.247 0-76.5 34.253-76.5 76.5v172.125h382.5z" />
    </svg>
);
const ForwardRef = forwardRef(SvgPrintingButtonInterfaceSymbol);
export default ForwardRef;
