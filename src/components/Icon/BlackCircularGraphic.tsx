import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackCircularGraphic = (
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
        <path d="M248.625 57.375C115.305 71.298 0 191.767 0 334.688 0 487.841 124.16 612 277.312 612c112.799 0 209.667-67.454 252.985-164.131l-281.673-84.494zM286.875 0v330.862l305.006 91.494C603.738 392.885 612 357.408 612 316.939 612 141.888 448.539 0 286.875 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackCircularGraphic);
export default ForwardRef;
