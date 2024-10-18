import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgClockBlackCircularTool = (
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
        <path d="M306 0C136.992 0 0 137.012 0 306c0 169.008 136.992 306 306 306s306-137.012 306-306S475.008 0 306 0M158.317 132.135l27.042 27.042-27.042 27.043-27.043-27.043zm-3.079 331.053-26.469-26.526 26.469-26.526 26.469 26.526zM325.125 535.5h-38.25v-38.25h38.25zm0-229.041c0 10.557-8.568 19.125-19.125 19.125H133.875c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h153V95.625c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125zm118.537 156.232-27.043-27.043 27.043-27.043 27.042 27.043zm5.011-277.943-26.47-26.526 26.47-26.526 26.469 26.526zm48.577 140.377v-38.25h38.25v38.25z" />
    </svg>
);
const ForwardRef = forwardRef(SvgClockBlackCircularTool);
export default ForwardRef;
