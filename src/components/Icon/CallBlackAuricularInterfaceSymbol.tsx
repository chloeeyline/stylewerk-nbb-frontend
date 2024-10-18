import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCallBlackAuricularInterfaceSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.989 611.989"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="m593.742 68.874-56.656-56.499c-15.65-15.591-41.006-15.591-56.656 0l-84.985 112.998c-12.992 19.135-15.65 40.888 0 56.499l34.667 34.568c-25.71 34.451-56.577 72.031-91.323 106.68-39.274 39.175-82.997 74.807-122.29 104.041l-33.506-33.428c-15.65-15.61-37.462-12.953-56.656 0L13.023 478.482c-18.997 13.091-15.65 40.907 0 56.499l56.656 56.499c31.281 31.202 71.992 21.201 113.313 0 0 0 125.066-70.023 232.139-176.801 100.714-100.438 178.611-232.828 178.611-232.828 16.241-44.509 31.281-81.755 0-112.977" />
    </svg>
);
const ForwardRef = forwardRef(SvgCallBlackAuricularInterfaceSymbol);
export default ForwardRef;
