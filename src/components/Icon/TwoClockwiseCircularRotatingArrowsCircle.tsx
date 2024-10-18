import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTwoClockwiseCircularRotatingArrowsCircle = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.005 612.006"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M605.731 267.776h-34.959C552.174 138.147 440.991 38.412 306.221 38.412c-104.15 0-194.175 59.635-238.404 146.487l71.791 27.6c32.742-58.22 95.033-97.633 166.614-97.633 92.471 0 169.595 65.675 187.294 152.909h-46.064c-5.905 5.734-11.563 9.29-3.096 19.229l71.312 72.517c5.906 5.734 15.482 5.734 21.389 0l71.791-72.517c5.886-5.733 2.789-13.475-3.117-19.228m-299.51 229.365c-85.572 0-157.993-56.252-182.363-133.797h41.821c5.906-5.734 9.002-13.494 3.096-19.229l-71.771-72.517c-5.906-5.734-15.482-5.734-21.388 0L4.302 344.115c-8.468 9.939-2.81 13.494 3.096 19.229h35.055c20.738 113.383 130.756 210.25 263.787 210.25 97.346 0 182.286-52.16 229.115-129.877l-72.346-28.555c-34.557 49.524-91.841 81.979-156.788 81.979" />
    </svg>
);
const ForwardRef = forwardRef(SvgTwoClockwiseCircularRotatingArrowsCircle);
export default ForwardRef;
