import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLeftArrowCurvedBlackSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 634.975 634.975"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M283.123 159.091V25.423c.771-6.686-1.065-13.598-6.232-18.743-8.975-8.907-23.524-8.907-32.5 0L18.03 254.889c-4.782 4.759-6.822 11.06-6.504 17.292-.317 6.232 1.722 12.533 6.504 17.292l225.137 246.849c8.408 7.184 23.819 11.264 33.746 1.359 5.145-5.145 7.388-9.473 6.618-16.158v-135.98c149.578 0 284.855 107.695 311.711 249.432 18.085-41.564 28.238-87.344 28.238-135.572 0-187.946-152.387-340.312-340.357-340.312" />
    </svg>
);
const ForwardRef = forwardRef(SvgLeftArrowCurvedBlackSymbol);
export default ForwardRef;
