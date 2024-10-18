import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgNotebookBlackToolSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792 792"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M569.25 49.5V0h-49.5v49.5h-99V0h-49.5v49.5h-99V0h-49.5v49.5c-54.673 0-99 44.327-99 99V693c0 54.673 44.327 99 99 99h346.5c54.673 0 99-44.327 99-99V148.5c0-54.673-44.327-99-99-99M544.5 594h-297c-13.662 0-24.75-11.088-24.75-24.75s11.088-24.75 24.75-24.75h297c13.662 0 24.75 11.088 24.75 24.75S558.162 594 544.5 594m0-148.5h-297c-13.662 0-24.75-11.088-24.75-24.75S233.838 396 247.5 396h297c13.662 0 24.75 11.088 24.75 24.75s-11.088 24.75-24.75 24.75m0-148.5h-297c-13.662 0-24.75-11.088-24.75-24.75s11.088-24.75 24.75-24.75h297c13.662 0 24.75 11.088 24.75 24.75S558.162 297 544.5 297" />
    </svg>
);
const ForwardRef = forwardRef(SvgNotebookBlackToolSymbol);
export default ForwardRef;
