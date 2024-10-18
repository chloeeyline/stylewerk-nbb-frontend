import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLeftArrowBlackButtonSquare = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M414.726 464.642c7.555 7.517 7.555 19.699 0 27.215-7.555 7.517-19.775 7.517-27.33 0L215.807 320.879c-4.036-4.016-5.738-9.313-5.47-14.572-.268-5.241 1.453-10.558 5.47-14.574l171.589-170.978c7.555-7.516 19.775-7.516 27.33 0s7.555 19.699 0 27.215l-158.91 158.336z" />
    </svg>
);
const ForwardRef = forwardRef(SvgLeftArrowBlackButtonSquare);
export default ForwardRef;
