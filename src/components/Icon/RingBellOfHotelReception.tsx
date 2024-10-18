import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRingBellOfHotelReception = (
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
        <path d="M325.125 133.875v-38.25h38.25c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125h-114.75c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125h38.25s-.134 39.818 0 38.25C126.837 143.801 0 277.332 0 439.875V459c0 10.557 8.568 19.125 19.125 19.125h573.75c10.557 0 19.125-8.568 19.125-19.125v-19.125c0-162.543-126.837-296.074-286.875-306m267.75 382.5H19.125C8.568 516.375 0 524.943 0 535.5s8.568 19.125 19.125 19.125h573.75c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgRingBellOfHotelReception);
export default ForwardRef;
