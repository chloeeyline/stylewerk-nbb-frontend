import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgNewEmailBlackBackEnvelopeSymbolOfInterface = (
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
        <path d="M592.875 76.404H19.125L306 306.268zM0 111.135v379.019c0 4.667.861 9.065 2.084 13.292l211.121-218.082zm306 250.538-63.418-52.574L21.324 535.596h563.729l-217.164-226.88zm306-249.639L399.521 284.676l210.413 218.79c1.205-4.246 2.065-8.664 2.065-13.312z" />
    </svg>
);
const ForwardRef = forwardRef(SvgNewEmailBlackBackEnvelopeSymbolOfInterface);
export default ForwardRef;
