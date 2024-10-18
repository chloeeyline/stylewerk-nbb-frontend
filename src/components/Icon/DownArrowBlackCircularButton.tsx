import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownArrowBlackCircularButton = (
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
        <path d="M306 0C137.012 0 0 136.992 0 306s137.012 306 306 306 306-137.012 306-306S475.008 0 306 0m125.001 322.811-108.19 108.19c-4.59 4.59-10.862 6.005-16.811 4.953-5.929 1.052-12.221-.382-16.811-4.953l-108.19-108.19c-7.478-7.478-7.478-19.583 0-27.042 7.478-7.478 19.584-7.478 27.043 0l78.833 78.814V172.125c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125v202.457l78.814-78.814c7.478-7.478 19.584-7.478 27.042 0 7.479 7.459 7.479 19.565.02 27.043" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownArrowBlackCircularButton);
export default ForwardRef;
