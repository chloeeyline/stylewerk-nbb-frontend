import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFoggyNight = (
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
        <path d="M325.125 554.625h-191.25c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125h191.25c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125m267.75-153H314.3c-5.011-21.592-8.3-43.835-8.3-66.938 0-131.542 85.757-242.907 204.331-281.654-41.1-21.554-87.765-33.909-137.394-33.909C209.228 19.125 76.5 151.833 76.5 315.562c0 29.95 4.533 58.81 12.794 86.062H19.125C8.568 401.625 0 410.193 0 420.75s8.568 19.125 19.125 19.125h573.75c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125m-229.5 76.5H95.625c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125h267.75c10.557 0 19.125-8.568 19.125-19.125 0-10.576-8.568-19.125-19.125-19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgFoggyNight);
export default ForwardRef;
