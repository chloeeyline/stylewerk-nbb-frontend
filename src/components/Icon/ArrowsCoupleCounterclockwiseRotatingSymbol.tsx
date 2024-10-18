import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgArrowsCoupleCounterclockwiseRotatingSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.268 612.268"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M593.011 382.796H401.785c-10.556 0-19.123 8.567-19.123 19.123s10.001 17.937 18.167 26.083l53.142 53.142c-39.909 33.848-91.387 54.462-147.837 54.462-113.665 0-207.786-82.744-226.029-191.227H2.811c18.855 150.878 147.32 267.717 303.323 267.717 77.58 0 148.296-28.99 202.164-76.624l54.786 54.786c10.308 10.307 19.371 22.01 29.927 22.01s19.123-8.567 19.123-19.123V401.919c0-2.314 0-19.123-19.123-19.123M19.256 229.471h191.226c10.556 0 19.123-8.567 19.123-19.123s-10.001-17.937-18.167-26.083l-53.142-53.142c39.909-33.847 91.387-54.461 147.837-54.461 113.665 0 207.786 82.744 226.029 191.226h77.293C590.602 117.011 462.136.172 306.134.172c-77.581 0-148.296 28.99-202.164 76.625L49.183 22.01C38.876 11.703 29.812 0 19.256 0S.134 8.567.134 19.123v191.226c0 2.314 0 19.122 19.122 19.122" />
    </svg>
);
const ForwardRef = forwardRef(SvgArrowsCoupleCounterclockwiseRotatingSymbol);
export default ForwardRef;
