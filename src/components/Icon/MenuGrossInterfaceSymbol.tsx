import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMenuGrossInterfaceSymbol = (
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
        <path d="M76.5 191.25h459c42.247 0 76.5-34.253 76.5-76.5s-34.253-76.5-76.5-76.5h-459C34.253 38.25 0 72.503 0 114.75s34.253 76.5 76.5 76.5m459 38.25h-459C34.253 229.5 0 263.753 0 306s34.253 76.5 76.5 76.5h459c42.247 0 76.5-34.253 76.5-76.5s-34.253-76.5-76.5-76.5m0 191.25h-459c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5h459c42.247 0 76.5-34.253 76.5-76.5s-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgMenuGrossInterfaceSymbol);
export default ForwardRef;
