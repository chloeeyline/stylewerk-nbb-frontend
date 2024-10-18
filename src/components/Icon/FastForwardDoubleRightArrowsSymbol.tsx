import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFastForwardDoubleRightArrowsSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.02 612.02"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M596.96 269.674 342.381 15.094c-20.079-20.079-52.644-20.079-72.723 0s-20.079 52.644 0 72.723L487.852 306.01 269.658 524.202c-20.079 20.079-20.079 52.644 0 72.723s52.644 20.079 72.723 0L596.96 342.346c20.079-20.029 20.079-52.593 0-72.672m-306.102-15.416L88.744 41.238c-20.309-21.378-53.204-21.378-73.513 0s-20.309 56.058 0 77.462l165.371 174.289L15.231 467.278c-20.309 21.379-20.309 56.083 0 77.462s53.204 21.379 73.513 0l202.114-213.02c20.309-21.378 20.309-56.058 0-77.462" />
    </svg>
);
const ForwardRef = forwardRef(SvgFastForwardDoubleRightArrowsSymbol);
export default ForwardRef;
