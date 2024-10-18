import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowBlackSquareButton1 = (
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
        <path d="M550.801 0H102C56.937 0 20.4 36.536 20.4 81.6v40.8h612V81.6c0-45.064-36.536-81.6-81.599-81.6M20.4 571.199c0 45.064 36.537 81.602 81.6 81.602h448.8c45.063 0 81.6-36.537 81.6-81.602v-408h-612zm189.353-218.402L310.57 230.806c4.264-4.284 9.935-6.1 15.504-5.814 5.59-.286 11.24 1.53 15.504 5.814l100.816 121.991c7.997 8.018 7.997 21.033 0 29.051s-20.971 8.018-28.968 0L346.8 301.206v249.595c0 11.26-9.14 20.398-20.4 20.398S306 562.06 306 550.801v-250.37l-67.3 81.417c-7.997 8.018-20.971 8.018-28.968 0-7.976-8.039-7.976-21.034.021-29.051" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowBlackSquareButton1);
export default ForwardRef;
