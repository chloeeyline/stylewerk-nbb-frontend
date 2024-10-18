import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgShoppingBasketCommercialTool = (
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
        <path d="M191.25 325.125H46.455l5.47 76.5H191.25zm229.5 191.25H382.5v-76.5h-153v76.5h-38.25v-76.5H54.64l2.735 38.25c0 42.247 34.253 76.5 76.5 76.5H459c42.247 0 76.5-34.253 76.5-76.5l5.47-38.25H420.75zm0-114.75h125.67l10.921-76.5H420.75zm-38.25-76.5h-153v76.5h153zm210.375-153H468.046l38.767-76.5h47.812c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125h-76.5l-58.981 114.75H194.463l-60.588-114.75h-76.5c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125h47.812l41.042 76.5H19.125C8.568 172.125 0 180.693 0 191.25s8.568 19.125 19.125 19.125H38.25l5.47 76.5h147.53v-76.5h38.25v76.5h153v-76.5h38.25v76.5h142.08l10.92-76.5h19.125c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgShoppingBasketCommercialTool);
export default ForwardRef;
