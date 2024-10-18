import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackWindsSocketToolSymbol = (
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
        <path d="M20.4 0C9.139 0 0 9.139 0 20.4v571.2C0 602.86 9.139 612 20.4 612s20.4-9.14 20.4-20.4V20.4C40.8 9.139 31.661 0 20.4 0m61.2 40.8v224.4c0 22.521 18.258 40.8 40.8 40.8l163.2-14.831V14.831L122.4 0C99.858 0 81.6 18.278 81.6 40.8m489.6 0-81.6-7.425v239.23l81.6-7.405c22.542 0 40.8-18.258 40.8-40.8V81.6c0-22.542-18.258-40.8-40.8-40.8M326.4 287.457l122.4-11.119V29.682L326.4 18.543z" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackWindsSocketToolSymbol);
export default ForwardRef;
