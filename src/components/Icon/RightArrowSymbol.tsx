import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRightArrowSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 634.998 634.998"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M616.956 254.889 390.572 6.68c-8.975-8.907-23.524-8.907-32.499 0-5.167 5.122-7.003 12.057-6.232 18.743v133.668c-187.947 0-340.335 152.366-340.335 340.335 0 48.205 10.153 94.008 28.238 135.572C66.6 493.217 201.877 385.543 351.455 385.543v135.98c-.771 6.686 1.474 11.014 6.618 16.158 9.927 9.926 25.338 5.824 33.745-1.359l225.138-246.849c4.782-4.759 6.821-11.06 6.505-17.292.316-6.232-1.723-12.533-6.505-17.292" />
    </svg>
);
const ForwardRef = forwardRef(SvgRightArrowSymbol);
export default ForwardRef;
