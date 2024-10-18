import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSaveBlackDisketteInterfaceSymbol = (
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
        <path d="M535.5 0h-38.25v229.5c0 21.114-17.117 38.25-38.25 38.25H153c-21.133 0-38.25-17.136-38.25-38.25V0H76.5C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M172.125 229.5h267.75c10.557 0 19.125-8.568 19.125-19.125V0H153v210.375c0 10.557 8.568 19.125 19.125 19.125M344.25 95.625c0-10.557 8.568-19.125 19.125-19.125S382.5 85.068 382.5 95.625v76.5c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125z" />
    </svg>
);
const ForwardRef = forwardRef(SvgSaveBlackDisketteInterfaceSymbol);
export default ForwardRef;
