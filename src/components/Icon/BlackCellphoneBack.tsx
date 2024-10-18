import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackCellphoneBack = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792 792"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M519.75 0h-247.5c-54.673 0-99 44.327-99 99v24.75h445.5V99c0-54.673-44.327-99-99-99m-346.5 693c0 54.673 44.327 99 99 99h247.5c54.673 0 99-44.327 99-99V544.5h-445.5zM396 594c27.349 0 49.5 22.151 49.5 49.5S423.349 693 396 693s-49.5-22.151-49.5-49.5S368.651 594 396 594m-222.75-99h445.5V173.25h-445.5z" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackCellphoneBack);
export default ForwardRef;
