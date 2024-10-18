import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSolidAscendantArrowSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 652.43 652.43"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M326.225 0 20.215 359.998l28.707 28.83 73.418-83.001v265.05c0 45.037 37.209 81.553 82.064 81.553h243.642c44.854 0 82.063-36.516 82.063-81.553v-265.05l73.398 83.001 28.707-28.83z" />
    </svg>
);
const ForwardRef = forwardRef(SvgSolidAscendantArrowSymbol);
export default ForwardRef;
