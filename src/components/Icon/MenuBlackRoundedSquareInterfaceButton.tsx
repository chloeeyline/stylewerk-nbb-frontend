import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMenuBlackRoundedSquareInterfaceButton = (
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
        <path d="M535.5 0h-459C34.521 0 0 37.657 0 79.656v456.303C0 577.957 34.023 612 76.003 612H532c41.979 0 80-34.502 80-76.5v-459C612 34.501 577.479 0 535.5 0M459 420.75H153c-10.557 0-19.125-8.568-19.125-19.125S142.443 382.5 153 382.5h306c10.557 0 19.125 8.568 19.125 19.125S469.557 420.75 459 420.75M459 306H153c-10.557 0-19.125-8.568-19.125-19.125S142.443 267.75 153 267.75h306c10.557 0 19.125 8.568 19.125 19.125S469.557 306 459 306m0-114.75H153c-10.557 0-19.125-8.568-19.125-19.125S142.443 153 153 153h306c10.557 0 19.125 8.568 19.125 19.125S469.557 191.25 459 191.25" />
    </svg>
);
const ForwardRef = forwardRef(SvgMenuBlackRoundedSquareInterfaceButton);
export default ForwardRef;
