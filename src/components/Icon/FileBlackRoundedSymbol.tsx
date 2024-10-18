import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFileBlackRoundedSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 753.23 753.23"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M494.308 0v.683C491.271.683 164.769 0 164.769 0c-51.997 0-94.154 42.157-94.154 94.154v564.923c0 51.996 42.157 94.153 94.154 94.153h423.692c51.997 0 94.154-42.157 94.154-94.153v-470.77zm47.077 188.308c-26.011 0-47.077-21.09-47.077-47.077V47.077l141.23 141.231z" />
    </svg>
);
const ForwardRef = forwardRef(SvgFileBlackRoundedSymbol);
export default ForwardRef;
