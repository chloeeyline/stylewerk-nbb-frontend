import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTimerBlackToolSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 706.154 706.154"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M376.38 95.331c.023-.4.235-48.254.235-48.254h94.154c12.993 0 23.538-10.545 23.538-23.539S483.763 0 470.77 0H235.385c-12.993 0-23.539 10.545-23.539 23.539s10.545 23.539 23.539 23.539h94.154v47.077c0 .423.212.776.235 1.177C171.69 107.289 47.077 239.033 47.077 400.154c0 169.006 136.994 306 306 306s306-136.994 306-306c0-161.121-124.612-292.865-282.697-304.823M353.077 470.77c-39.003 0-70.615-31.612-70.615-70.615 0-30.694 19.702-56.563 47.077-66.285V211.847c0-12.994 10.545-23.539 23.539-23.539s23.538 10.545 23.538 23.539V333.87c27.376 9.722 47.077 35.59 47.077 66.285-.001 39.002-31.613 70.615-70.616 70.615" />
    </svg>
);
const ForwardRef = forwardRef(SvgTimerBlackToolSymbol);
export default ForwardRef;
