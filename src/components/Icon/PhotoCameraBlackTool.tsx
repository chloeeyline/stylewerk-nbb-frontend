import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPhotoCameraBlackTool = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 605.113 605.113"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M529.473 113.459h-56.729l-18.91-37.82C442.695 53.628 436.91 37.82 416.016 37.82H189.097c-20.895 0-27.797 18.04-37.82 37.819l-18.91 37.82H75.639C33.867 113.459 0 147.326 0 189.098v302.556c0 41.771 33.867 75.639 75.639 75.639h453.835c41.771 0 75.639-33.867 75.639-75.639V189.098c-.002-41.771-33.869-75.639-75.64-75.639M302.556 491.654c-83.543 0-151.278-67.734-151.278-151.277s67.735-151.278 151.278-151.278 151.278 67.735 151.278 151.278S386.1 491.654 302.556 491.654" />
        <path d="M302.556 226.918c-62.667 0-113.459 50.792-113.459 113.459s50.792 113.459 113.459 113.459 113.459-50.791 113.459-113.459-50.792-113.459-113.459-113.459" />
    </svg>
);
const ForwardRef = forwardRef(SvgPhotoCameraBlackTool);
export default ForwardRef;
