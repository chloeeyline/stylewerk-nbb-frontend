import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCompassBlackCircularOrientationTool = (
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
        <path d="M306 0C137 0 0 137 0 306s137 306 306 306 306-137 306-306S475 0 306 0M191.673 496.225l26.837-189.348 35.347 20.409-18.898 93.959 71.918-63.347 35.348 20.407zm73.388-180.143c0-16.898 13.714-30.613 30.612-30.613s30.613 13.714 30.613 30.613c0 16.897-13.715 30.611-30.613 30.611s-30.612-13.714-30.612-30.611m107.776 9.204-35.347-20.409 18.897-93.959-71.918 63.347-35.347-20.408 150.551-117.918z" />
    </svg>
);
const ForwardRef = forwardRef(SvgCompassBlackCircularOrientationTool);
export default ForwardRef;
