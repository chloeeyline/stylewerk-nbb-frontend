import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownArrow = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.007 612.007"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M596.168 130.647c-21.119-21.169-55.382-21.169-76.526 0L306.013 366.44 92.384 130.647c-21.144-21.169-55.382-21.169-76.525 0s-21.144 55.458 0 76.627l248.504 274.31c11.438 11.438 26.672 16.482 41.651 15.54 14.953.942 30.213-4.102 41.65-15.54l248.505-274.31c21.118-21.169 21.118-55.457-.001-76.627" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownArrow);
export default ForwardRef;
