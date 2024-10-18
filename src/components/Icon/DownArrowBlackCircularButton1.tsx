import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownArrowBlackCircularButton1 = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0m163.231 246.311-146.439 146.44c-4.59 4.59-10.863 6.005-16.811 4.973-5.929 1.052-12.221-.383-16.811-4.973l-146.44-146.44c-7.478-7.478-7.478-19.565 0-27.043s19.584-7.478 27.042 0L306 355.457l136.189-136.189c7.478-7.478 19.584-7.478 27.042 0 7.479 7.459 7.479 19.565 0 27.043" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownArrowBlackCircularButton1);
export default ForwardRef;
