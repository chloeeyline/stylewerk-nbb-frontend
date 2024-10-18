import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRightArrowBlackButton = (
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
        <path d="M0 95.625v420.75c0 42.247 34.253 76.5 76.5 76.5H459V19.125H76.5c-42.247 0-76.5 34.253-76.5 76.5m95.625 191.25h234.721l-76.328-63.074c-7.516-7.497-7.516-19.661 0-27.158s19.699-7.497 27.234 0l114.368 94.516c4.016 3.997 5.718 9.313 5.45 14.534.268 5.241-1.435 10.538-5.45 14.535l-114.368 94.517c-7.516 7.497-19.699 7.497-27.234 0-7.516-7.497-7.516-19.661 0-27.158l75.601-62.462H95.625c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125M535.5 19.125h-38.25v573.75h38.25c42.247 0 76.5-34.253 76.5-76.5V95.625c0-42.247-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgRightArrowBlackButton);
export default ForwardRef;
