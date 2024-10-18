import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownArrowSymbol = (
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
        <path d="M387.6 407.964h-40.8V224.365c0-22.542-18.258-40.8-40.8-40.8s-40.8 18.258-40.8 40.8v183.599h-40.8c-7.997 0-26.418-1.916-34.415 6.121s-7.997 21.053 0 29.09l100.816 122.217c4.264 4.283 9.935 6.1 15.505 5.814 5.589.285 11.24-1.531 15.503-5.814l100.817-122.217c7.997-8.037 7.997-21.053 0-29.09-7.976-8.037-20.644-6.121-35.026-6.121m204-367.199H20.4c-9.792 0-20.4 10.608-20.4 20.4v142.8c0 22.542 18.258 40.8 40.8 40.8s40.8-18.258 40.8-40.8v-81.6h448.8v81.6c0 22.542 18.258 40.8 40.8 40.8s40.8-18.258 40.8-40.8v-142.8c0-11.057-8.078-20.4-20.4-20.4" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownArrowSymbol);
export default ForwardRef;
