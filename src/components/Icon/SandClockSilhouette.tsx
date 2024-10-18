import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSandClockSilhouette = (
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
        <path d="M643.5 742.5H594V569.25C594 473.566 516.434 396 420.75 396 516.434 396 594 318.434 594 222.75V49.5h49.5c13.662 0 24.75-11.088 24.75-24.75S657.162 0 643.5 0h-495c-13.662 0-24.75 11.088-24.75 24.75S134.838 49.5 148.5 49.5H198v173.25C198 318.434 275.566 396 371.25 396 275.566 396 198 473.566 198 569.25V742.5h-49.5c-13.662 0-24.75 11.088-24.75 24.75S134.838 792 148.5 792h495c13.662 0 24.75-11.088 24.75-24.75s-11.088-24.75-24.75-24.75" />
    </svg>
);
const ForwardRef = forwardRef(SvgSandClockSilhouette);
export default ForwardRef;
