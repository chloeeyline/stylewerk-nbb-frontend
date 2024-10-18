import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownArrowBlackSquareButton1 = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 652.801 652.801"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M20.4 571.199c0 45.064 36.537 81.602 81.6 81.602h448.8c45.063 0 81.6-36.537 81.6-81.602V530.4h-612zM550.801 0H102C56.937 0 20.4 36.536 20.4 81.6v408h612v-408c0-45.064-36.536-81.6-81.599-81.6M442.415 300.002 341.599 421.994c-4.264 4.283-9.935 6.1-15.504 5.814-5.589.285-11.24-1.531-15.504-5.814L209.773 300.002c-7.997-8.018-7.997-21.033 0-29.05s20.971-8.017 28.968 0L306 352.369V102c0-11.261 9.139-20.4 20.4-20.4s20.4 9.139 20.4 20.4v249.615l66.646-80.642c7.997-8.017 20.971-8.017 28.968 0s7.998 21.012.001 29.029" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownArrowBlackSquareButton1);
export default ForwardRef;
