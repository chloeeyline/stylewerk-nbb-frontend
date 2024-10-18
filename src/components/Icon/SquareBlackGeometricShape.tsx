import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSquareBlackGeometricShape = (
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
        <path d="M568.286 0H43.714C19.584 0 0 19.584 0 43.714v524.572C0 592.416 19.584 612 43.714 612h524.572C592.438 612 612 592.438 612 568.286V43.714C612 19.584 592.438 0 568.286 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgSquareBlackGeometricShape);
export default ForwardRef;
