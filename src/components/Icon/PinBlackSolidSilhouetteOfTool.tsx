import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPinBlackSolidSilhouetteOfTool = (
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
        <path d="m467.863 429.9 103.48-103.48h-61.231L285.6 101.908 279.375 0 0 279.375l101.908 6.225L326.42 510.112v61.231l103.48-103.48L595.569 612 612 595.569z" />
    </svg>
);
const ForwardRef = forwardRef(SvgPinBlackSolidSilhouetteOfTool);
export default ForwardRef;
