import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgEmailBlackEnvelopeFrontInterfaceSymbol = (
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
        <path d="M535.5 76.5h-459C34.253 76.5 0 110.753 0 153v306c0 42.247 34.253 76.5 76.5 76.5h459c42.247 0 76.5-34.253 76.5-76.5V153c0-42.247-34.253-76.5-76.5-76.5M325.125 459h-229.5c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h229.5c10.557 0 19.125 8.568 19.125 19.125S335.682 459 325.125 459m0-76.5h-229.5c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h229.5c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125M535.5 267.75c0 21.133-17.117 38.25-38.25 38.25h-76.5c-21.133 0-38.25-17.117-38.25-38.25v-76.5c0-21.133 17.117-38.25 38.25-38.25h76.5c21.133 0 38.25 17.136 38.25 38.25zm-57.375-76.5h-38.25c-10.557 0-19.125 8.568-19.125 19.125v38.25c0 10.557 8.568 19.125 19.125 19.125h38.25c10.557 0 19.125-8.568 19.125-19.125v-38.25c0-10.557-8.568-19.125-19.125-19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgEmailBlackEnvelopeFrontInterfaceSymbol);
export default ForwardRef;
