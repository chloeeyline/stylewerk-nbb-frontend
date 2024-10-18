import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRoundedCornersInterfaceSquareSymbol = (
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
        <path d="M535.5 0h-153v76.5h114.75c21.133 0 38.25 17.136 38.25 38.25V229.5H612v-153C612 34.253 577.747 0 535.5 0M0 76.5v153h76.5V114.75c0-21.133 17.117-38.25 38.25-38.25H229.5V0h-153C34.253 0 0 34.253 0 76.5m76.5 420.75V382.5H0v153C0 577.747 34.253 612 76.5 612h153v-76.5H114.75c-21.133 0-38.25-17.117-38.25-38.25m459 0c0 21.133-17.117 38.25-38.25 38.25H382.5V612h153c42.247 0 76.5-34.253 76.5-76.5v-153h-76.5z" />
    </svg>
);
const ForwardRef = forwardRef(SvgRoundedCornersInterfaceSquareSymbol);
export default ForwardRef;
