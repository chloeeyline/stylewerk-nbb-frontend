import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgHotOrBurnInterfaceSymbol = (
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
        <path d="M609.764 163.663C506.548 193.086 487.646 276.53 494.308 329.538 420.68 242.987 423.692 143.42 423.692 0 187.531 89.046 242.446 345.733 235.384 423.692c-59.387-48.631-70.615-164.77-70.615-164.77-62.707 32.271-94.154 118.422-94.154 188.308 0 169.006 136.994 306 306 306s306-136.994 306-306c0-100.438-73.746-146.762-72.851-283.567" />
    </svg>
);
const ForwardRef = forwardRef(SvgHotOrBurnInterfaceSymbol);
export default ForwardRef;
