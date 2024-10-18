import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLeftArrowBlackCircularButton = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306c168.988 0 306-136.992 306-306S475.008 0 306 0m86.751 442.189c7.478 7.478 7.478 19.584 0 27.042s-19.584 7.459-27.043 0l-146.44-146.439c-4.59-4.59-6.005-10.863-4.953-16.811-1.052-5.929.382-12.221 4.953-16.811l146.44-146.44c7.479-7.478 19.584-7.478 27.043 0 7.478 7.458 7.478 19.584 0 27.042L256.543 306z" />
    </svg>
);
const ForwardRef = forwardRef(SvgLeftArrowBlackCircularButton);
export default ForwardRef;
