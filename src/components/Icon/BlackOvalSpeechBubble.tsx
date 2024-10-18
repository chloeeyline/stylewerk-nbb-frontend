import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackOvalSpeechBubble = (
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
        <path d="M306 0C136.992 0 0 119.875 0 267.75c0 84.514 44.848 159.751 114.75 208.826V612l134.047-81.339c18.552 3.061 37.638 4.839 57.203 4.839 169.008 0 306-119.875 306-267.75S475.008 0 306 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackOvalSpeechBubble);
export default ForwardRef;
