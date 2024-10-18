import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCounterclockwiseCircularArrow = (
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
        <path d="M589.993 49.109C600.299 38.804 612 29.741 612 19.187S603.435.067 592.881.067H401.685c-2.313 0-19.12 0-19.12 19.12v191.196c0 10.554 8.565 19.12 19.12 19.12 10.554 0 17.934-10 26.079-18.164l53.133-53.134c33.842 39.903 54.453 91.373 54.453 147.814 0 126.706-102.729 229.437-229.436 229.437S76.479 432.726 76.479 306.02c0-113.647 82.73-207.754 191.196-225.994V2.744C116.821 21.615 0 150.042 0 306.02c0 168.96 136.954 305.913 305.914 305.913S611.828 474.979 611.828 306.02c0-77.568-28.985-148.272-76.612-202.133z" />
    </svg>
);
const ForwardRef = forwardRef(SvgCounterclockwiseCircularArrow);
export default ForwardRef;
