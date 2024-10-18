import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDoubleLeftArrowsSymbol = (
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
        <path d="M124.172 305.975 342.365 87.781c20.079-20.079 20.079-52.644 0-72.722-20.079-20.079-52.644-20.079-72.723 0l-254.58 254.58c-20.079 20.079-20.079 52.644 0 72.723l254.58 254.58c20.079 20.078 52.644 20.078 72.723 0 20.079-20.079 20.079-52.644 0-72.723zm307.223-.281 165.371-165.982c20.308-20.359 20.308-53.408 0-73.768-20.309-20.359-53.204-20.359-73.513 0L321.139 268.823c-20.309 20.359-17.047 35.266 3.032 55.345L523.253 545.47c20.309 20.359 53.204 20.359 73.513 0 20.308-20.359 20.308-53.408 0-73.768z" />
    </svg>
);
const ForwardRef = forwardRef(SvgDoubleLeftArrowsSymbol);
export default ForwardRef;
