import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAddingBlackSquareButtonInterfaceSymbol = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M420.75 325.125h-95.625v95.625c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125v-95.625H191.25c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h95.625V191.25c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125v95.625h95.625c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgAddingBlackSquareButtonInterfaceSymbol);
export default ForwardRef;
