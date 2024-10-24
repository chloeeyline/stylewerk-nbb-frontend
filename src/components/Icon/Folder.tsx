import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFolder = (
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
        <path d="M0 535.5C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-306H0zm535.5-459H267.75c0-42.247-34.253-76.5-76.5-76.5H76.5C34.253 0 0 34.253 0 76.5v114.75h612V153c0-42.247-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgFolder);
export default ForwardRef;
