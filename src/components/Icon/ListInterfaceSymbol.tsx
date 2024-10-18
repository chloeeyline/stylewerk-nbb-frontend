import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgListInterfaceSymbol = (
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
        <path d="M63.311 73.862C28.342 73.862 0 102.204 0 137.172s28.342 63.311 63.311 63.311 63.31-28.342 63.31-63.311-28.342-63.31-63.31-63.31m0 168.827C28.342 242.689 0 271.032 0 306s28.342 63.311 63.311 63.311 63.31-28.342 63.31-63.311-28.342-63.311-63.31-63.311m0 168.829C28.342 411.518 0 439.859 0 474.827c0 34.969 28.342 63.311 63.311 63.311s63.31-28.342 63.31-63.311-28.342-63.309-63.31-63.309m168.827-232.139h337.655c23.319 0 42.207-18.888 42.207-42.207s-18.888-42.207-42.207-42.207H232.138c-23.319 0-42.207 18.888-42.207 42.207s18.888 42.207 42.207 42.207m337.655 84.414H232.138c-23.319 0-42.207 18.888-42.207 42.207s18.888 42.207 42.207 42.207h337.655C593.112 348.207 612 329.319 612 306s-18.888-42.207-42.207-42.207m0 168.828H232.138c-23.319 0-42.207 18.887-42.207 42.206s18.888 42.207 42.207 42.207h337.655c23.319 0 42.207-18.888 42.207-42.207s-18.888-42.206-42.207-42.206" />
    </svg>
);
const ForwardRef = forwardRef(SvgListInterfaceSymbol);
export default ForwardRef;
