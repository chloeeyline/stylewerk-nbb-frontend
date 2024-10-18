import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackMapFoldedPaperSymbol = (
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
        <path d="M459 0 306 114.75 153 57.375 0 153v459l153-95.625 153 57.375L459 459l153 114.75v-459zM191.25 401.625c0 10.557-8.568 19.125-19.125 19.125S153 412.182 153 401.625v-191.25c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125zm153-19.125c0 10.557-8.568 19.125-19.125 19.125S306 393.057 306 382.5V267.75c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125zm153-57.375c0 10.557-8.568 19.125-19.125 19.125S459 335.682 459 325.125v-153c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125z" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackMapFoldedPaperSymbol);
export default ForwardRef;
