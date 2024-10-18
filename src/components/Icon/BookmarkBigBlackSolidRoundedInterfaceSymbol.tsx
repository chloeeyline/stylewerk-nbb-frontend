import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBookmarkBigBlackSolidRoundedInterfaceSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792 792"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M580.799 0H211.2c-58.318 0-105.6 47.282-105.6 105.6v580.8c0 58.317 47.282 105.6 105.6 105.6L396 607.2 580.799 792c58.318 0 105.602-47.282 105.602-105.6V105.6C686.4 47.282 639.117 0 580.799 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgBookmarkBigBlackSolidRoundedInterfaceSymbol);
export default ForwardRef;
