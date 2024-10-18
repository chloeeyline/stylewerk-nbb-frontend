import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgVerificationCheckmarkSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.99 611.99"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M589.105 80.63c-30.513-31.125-79.965-31.125-110.478 0L202.422 362.344l-69.061-70.438c-30.513-31.125-79.965-31.125-110.478 0s-30.513 81.572 0 112.678l124.29 126.776c30.513 31.125 79.965 31.125 110.478 0l331.453-338.033c30.515-31.125 30.515-81.572.001-112.697" />
    </svg>
);
const ForwardRef = forwardRef(SvgVerificationCheckmarkSymbol);
export default ForwardRef;
