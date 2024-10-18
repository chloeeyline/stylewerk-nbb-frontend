import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgThreeBarsGraphicInterfaceSymbol = (
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
        <path d="M164.769 211.846h-47.077c-26.01 0-47.077 21.09-47.077 47.077v447.23c0 26.011 21.067 47.077 47.077 47.077h47.077c26.01 0 47.077-21.066 47.077-47.077v-447.23c0-26.01-21.067-47.077-47.077-47.077M400.153 0h-47.077C327.067 0 306 21.067 306 47.077v659.077c0 26.011 21.067 47.077 47.077 47.077h47.077c26.011 0 47.077-21.066 47.077-47.077V47.077C447.23 21.067 426.164 0 400.153 0m235.385 376.615h-47.077c-26.01 0-47.076 21.067-47.076 47.077v282.461c0 26.011 21.066 47.077 47.076 47.077h47.077c26.01 0 47.077-21.066 47.077-47.077V423.692c0-26.009-21.067-47.077-47.077-47.077" />
    </svg>
);
const ForwardRef = forwardRef(SvgThreeBarsGraphicInterfaceSymbol);
export default ForwardRef;
