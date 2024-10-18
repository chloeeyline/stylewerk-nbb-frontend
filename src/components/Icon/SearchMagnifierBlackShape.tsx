import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSearchMagnifierBlackShape = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.01 612.01"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M606.209 578.714 448.198 423.228C489.576 378.272 515 318.817 515 253.393 514.98 113.439 399.704 0 257.493 0S.006 113.439.006 253.393s115.276 253.393 257.487 253.393c61.445 0 117.801-21.253 162.068-56.586l158.624 156.099c7.729 7.614 20.277 7.614 28.006 0a19.29 19.29 0 0 0 .018-27.585" />
    </svg>
);
const ForwardRef = forwardRef(SvgSearchMagnifierBlackShape);
export default ForwardRef;
