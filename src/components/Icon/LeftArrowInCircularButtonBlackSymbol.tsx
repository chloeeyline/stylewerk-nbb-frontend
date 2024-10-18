import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLeftArrowInCircularButtonBlackSymbol = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306c0 168.988 136.992 306 306 306s306-137.012 306-306C612 136.992 475.008 0 306 0m133.875 325.125H237.418l78.813 78.814c7.479 7.478 7.479 19.584 0 27.042-7.478 7.479-19.583 7.479-27.042 0l-108.19-108.189c-4.571-4.571-6.005-10.863-4.954-16.792-1.052-5.929.383-12.221 4.973-16.811l108.19-108.19c7.478-7.478 19.584-7.478 27.043 0 7.478 7.478 7.478 19.584 0 27.043l-78.833 78.833h202.457c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgLeftArrowInCircularButtonBlackSymbol);
export default ForwardRef;
