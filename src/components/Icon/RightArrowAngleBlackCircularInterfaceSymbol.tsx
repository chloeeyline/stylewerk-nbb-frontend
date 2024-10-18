import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRightArrowAngleBlackCircularInterfaceSymbol = (
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
        <path d="M306 0C136.992 0 0 137.012 0 306c0 169.008 136.992 306 306 306s306-136.992 306-306C612 137.012 475.008 0 306 0m86.751 322.811-146.44 146.44c-7.478 7.478-19.584 7.478-27.043 0-7.478-7.478-7.478-19.584 0-27.043L355.457 306 219.268 169.811c-7.478-7.478-7.478-19.584 0-27.043 7.478-7.478 19.584-7.478 27.043 0l146.44 146.44c4.59 4.59 6.005 10.863 4.973 16.812 1.032 5.928-.402 12.201-4.973 16.791" />
    </svg>
);
const ForwardRef = forwardRef(SvgRightArrowAngleBlackCircularInterfaceSymbol);
export default ForwardRef;
