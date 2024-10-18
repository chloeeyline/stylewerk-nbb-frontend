import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowSolidCircularButton = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0m163.251 392.751c-7.478 7.478-19.584 7.478-27.043 0L306 256.543 169.811 392.731c-7.478 7.479-19.584 7.479-27.043 0-7.478-7.478-7.478-19.584 0-27.042l146.44-146.44c4.59-4.59 10.863-6.005 16.812-4.973 5.929-1.052 12.221.383 16.811 4.973l146.44 146.44c7.439 7.478 7.439 19.584-.02 27.062" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowSolidCircularButton);
export default ForwardRef;
