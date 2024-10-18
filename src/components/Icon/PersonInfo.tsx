import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPersonInfo = (
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
        <path d="M439.875 153h153c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125h-153c-10.557 0-19.125 8.568-19.125 19.125S429.318 153 439.875 153m153 306h-114.75C467.568 459 459 467.568 459 478.125s8.568 19.125 19.125 19.125h114.75c10.557 0 19.125-8.568 19.125-19.125S603.432 459 592.875 459m0-229.5h-153c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125h153c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125m0 114.75h-114.75c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125h114.75c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125M376.82 331.226c-38.461 54.354-98.628 89.524-166.445 89.524S82.391 385.579 43.93 331.226C17.289 352.11 0 384.24 0 420.75v76.5C0 560.63 51.37 612 114.75 612H306c63.38 0 114.75-51.37 114.75-114.75v-76.5c0-36.51-17.289-68.64-43.93-89.524M210.375 382.5c95.07 0 172.125-85.623 172.125-191.25S305.445 0 210.375 0 38.25 85.623 38.25 191.25 115.305 382.5 210.375 382.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgPersonInfo);
export default ForwardRef;