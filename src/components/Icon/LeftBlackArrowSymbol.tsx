import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLeftBlackArrowSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.008 612.008"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M535.44 95.455H192.268c-5.36-.325-10.815 1.34-14.912 5.417L5.521 291.141c-4.039 4-5.762 9.341-5.494 14.586-.268 5.245 1.455 10.566 5.494 14.587l171.835 190.269c3.733 3.714 8.633 5.551 13.533 5.608v.402H535.44c42.284 0 76.567-34.283 76.567-76.567V172.041c.001-42.304-34.282-76.586-76.567-76.586" />
    </svg>
);
const ForwardRef = forwardRef(SvgLeftBlackArrowSymbol);
export default ForwardRef;
