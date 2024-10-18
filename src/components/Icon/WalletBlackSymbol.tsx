import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgWalletBlackSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 655.736 655.736"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M511.468 451.736h122.4v-40.801h-122.4zm81.6-428.401c0-11.261-4.814-17.544-15.3-21.665-8.079-3.183-15.933-1.286-25.5 1.265l-530.4 163.2h571.2zm0 183.601h-571.2v408c0 22.521 18.258 40.801 40.8 40.801h530.4c22.542 0 40.8-18.279 40.8-40.801v-122.4h-142.8c-11.261 0-20.4-9.139-20.4-20.4v-81.6c0-11.26 9.14-20.4 20.4-20.4h142.8V247.735c0-22.521-18.258-40.799-40.8-40.799" />
    </svg>
);
const ForwardRef = forwardRef(SvgWalletBlackSymbol);
export default ForwardRef;
