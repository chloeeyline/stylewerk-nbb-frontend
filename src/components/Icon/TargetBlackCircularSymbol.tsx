import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTargetBlackCircularSymbol = (
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
        <path d="M469.2 306c0-13.076 7.344-20.4 20.399-20.4H612C600.474 134.722 477.299 11.526 326.4 0v122.4c0 13.056-7.345 20.4-20.4 20.4s-20.4-7.344-20.4-20.4V0C134.701 11.526 11.526 134.722 0 285.6h122.4c13.056 0 20.4 7.324 20.4 20.4 0 13.056-7.344 20.4-20.4 20.4H0C11.526 477.278 134.701 600.474 285.6 612V489.6c0-13.056 7.344-20.399 20.4-20.399s20.4 7.344 20.4 20.399V612C477.299 600.474 600.474 477.278 612 326.4H489.6c-13.056 0-20.4-7.344-20.4-20.4" />
    </svg>
);
const ForwardRef = forwardRef(SvgTargetBlackCircularSymbol);
export default ForwardRef;
