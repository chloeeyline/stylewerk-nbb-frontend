import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSortAscendingInterfaceSymbol = (
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
        <path d="M316.674 95.089h253.137c23.31 0 42.189-18.88 42.189-42.189 0-23.288-18.88-42.189-42.189-42.189H316.674c-23.309 0-42.189 18.901-42.189 42.189s18.901 42.189 42.189 42.189m253.137 421.894H316.674c-23.309 0-42.189 18.88-42.189 42.189s18.88 42.189 42.189 42.189h253.137c23.31 0 42.189-18.9 42.189-42.189 0-23.287-18.88-42.189-42.189-42.189M316.674 221.657s6.223 1.92 14.492-6.392 8.27-21.77 0-30.061L184.727 16.68c-4.409-4.43-10.273-6.308-16.032-6.012-5.78-.296-11.623 1.582-16.032 6.012L6.202 185.185c-8.269 8.312-8.269 21.77 0 30.06 8.27 8.312 15.146 6.392 15.146 6.392h126.568v379.706h42.189V221.636h126.568zm253.137 168.758H316.674c-23.309 0-42.189 18.88-42.189 42.189 0 23.289 18.88 42.189 42.189 42.189h253.137c23.31 0 42.189-18.88 42.189-42.189s-18.88-42.189-42.189-42.189m0-126.568H316.674c-23.309 0-42.189 18.88-42.189 42.189s18.88 42.189 42.189 42.189h253.137c23.31 0 42.189-18.88 42.189-42.189s-18.88-42.189-42.189-42.189m0-126.569H443.242c-23.31 0-42.189 18.88-42.189 42.189s18.88 42.189 42.189 42.189H569.81c23.31 0 42.189-18.88 42.189-42.189s-18.879-42.189-42.188-42.189" />
    </svg>
);
const ForwardRef = forwardRef(SvgSortAscendingInterfaceSymbol);
export default ForwardRef;