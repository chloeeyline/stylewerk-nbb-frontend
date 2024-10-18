import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackInkDropShape = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792 792"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M396 0c-76.304 92.342-247.5 407.806-247.5 544.5S259.306 792 396 792s247.5-110.806 247.5-247.5S470.522 90.585 396 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackInkDropShape);
export default ForwardRef;
