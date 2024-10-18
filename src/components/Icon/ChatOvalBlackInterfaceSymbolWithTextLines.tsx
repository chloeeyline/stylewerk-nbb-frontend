import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgChatOvalBlackInterfaceSymbolWithTextLines = (
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
        <path d="M306 0C137.012 0 0 119.875 0 267.75c0 84.514 44.848 159.751 114.75 208.826V612l134.047-81.339c18.552 3.061 37.638 4.839 57.203 4.839 169.008 0 306-119.875 306-267.75S475.008 0 306 0m95.625 363.375h-191.25c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h191.25c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125m38.25-114.75h-267.75c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h267.75c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgChatOvalBlackInterfaceSymbolWithTextLines);
export default ForwardRef;
