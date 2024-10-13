import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownload = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M196.643 311.374c7.497-7.516 19.661-7.516 27.158 0l63.074 76.347V95.625c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125v291.369l62.481-75.62c7.497-7.516 19.66-7.516 27.157 0 7.497 7.517 7.497 19.718 0 27.234l-94.516 114.387c-3.997 4.016-9.313 5.718-14.535 5.45-5.24.268-10.538-1.435-14.535-5.45l-94.516-114.387c-7.515-7.516-7.515-19.717-.018-27.234M478.125 535.5h-344.25c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h344.25c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownload);
export default ForwardRef;
