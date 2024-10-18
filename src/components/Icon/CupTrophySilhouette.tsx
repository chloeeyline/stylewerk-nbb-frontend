import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCupTrophySilhouette = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.971 611.971"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M496.838 95.643c0-42.24-34.172-76.488-76.336-76.488H191.478c-42.164 0-76.335 34.248-76.335 76.488-130.718 0-114.502-.019-114.502 76.488 0 63.37 51.266 114.732 114.502 114.732 4.551 0 8.911-.727 13.309-1.338 25.623 75.035 86.011 142.631 158.445 152.938v116.108h-57.251c-10.536 0-19.083 8.566-19.083 19.122s8.547 19.122 19.083 19.122h152.67c10.536 0 19.084-8.566 19.084-19.122s-8.548-19.122-19.084-19.122h-57.251V438.443c72.453-10.307 132.821-77.903 158.445-152.938 4.397.612 8.758 1.338 13.309 1.338 63.236 0 114.503-51.362 114.503-114.732.018-76.487 16.234-76.468-114.484-76.468M115.143 248.619c-42.164 0-76.335-34.248-76.335-76.488s.784-38.244 76.335-38.244zm381.695 0V133.887c75.551 0 76.335-3.997 76.335 38.244s-34.171 76.488-76.335 76.488" />
    </svg>
);
const ForwardRef = forwardRef(SvgCupTrophySilhouette);
export default ForwardRef;
