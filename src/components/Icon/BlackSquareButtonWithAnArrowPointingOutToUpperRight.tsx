import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackSquareButtonWithAnArrowPointingOutToUpperRight = (
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
        <path d="M585.939 0H408c-14.459.025-25.475 11.705-25.5 25.5S393.541 51.025 408 51l112.047-.816-54.978 52.428c18.641 2.244 34.221 14.331 41.08 31.11l54.061-51.586L561 204c-.025 13.795 11.041 25.525 25.5 25.5s25.475-11.705 25.5-25.5V24.862C612.025 11.067 600.397-.025 585.939 0m-450.61 452.268c-10.175-9.715-10.175-25.448 0-35.139l329.766-314.517c-2.015-.255-4.004-.612-6.095-.612H51c-28.178 0-51 22.822-51 51v408c0 28.152 22.822 51 51 51h408c28.178 0 51-22.822 51-51V153c0-6.834-1.402-13.311-3.825-19.278L172.202 452.268c-10.175 9.715-26.699 9.715-36.873 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackSquareButtonWithAnArrowPointingOutToUpperRight);
export default ForwardRef;
