import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMusicNoteSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.006 612.005"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M592.889 19.563c-2.733.937-324.993 76.469-324.993 76.469-10.553 2.581-19.117 8.565-19.117 19.118v267.68c-40.165-26.114-104.705-26.076-162.305 4.55C13.79 426.035-19.627 498.107 11.84 548.328s115.927 59.588 188.611 20.934c46.856-24.91 79.203-72.13 86.562-110.001 1.281-2.581 0-329.486 0-329.486L573.771 62.31v244.07c-40.165-26.114-104.705-26.095-162.306 4.551-72.684 38.674-106.1 110.727-74.634 160.947 31.468 50.222 115.908 59.589 188.611 20.934 46.856-24.929 79.202-72.129 86.562-110V38.701c.002-10.592-8.543-22.731-19.115-19.138" />
    </svg>
);
const ForwardRef = forwardRef(SvgMusicNoteSymbol);
export default ForwardRef;
