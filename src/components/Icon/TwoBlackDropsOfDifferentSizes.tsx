import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTwoBlackDropsOfDifferentSizes = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 753.23 753.23"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M376.615 0c-114.868 116.492-306 278.225-306 447.23s136.994 306 306 306 306-136.994 306-306S496.12 119.505 376.615 0m0 635.538c-91 0-164.769-72.78-164.769-162.557 0-89.775 102.91-175.714 164.769-237.597 64.354 63.483 164.77 147.821 164.77 237.597s-73.77 162.557-164.77 162.557m-.8-341.19c-44.064 47.336-116.609 101.168-116.609 169.807s52.561 124.306 117.41 124.306 117.41-55.645 117.41-124.306c-.001-68.662-72.358-121.27-118.211-169.807" />
    </svg>
);
const ForwardRef = forwardRef(SvgTwoBlackDropsOfDifferentSizes);
export default ForwardRef;
