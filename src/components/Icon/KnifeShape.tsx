import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgKnifeShape = (
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
        <path d="M346.5 0h-24.75C308.088 0 297 11.088 297 24.75V742.5c0 27.324 22.151 49.5 49.5 49.5s49.5-22.151 49.5-49.5v-297h99C495 153.945 346.5 0 346.5 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgKnifeShape);
export default ForwardRef;
