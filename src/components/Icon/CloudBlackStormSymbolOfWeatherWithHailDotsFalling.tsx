import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCloudBlackStormSymbolOfWeatherWithHailDotsFalling = (
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
        <path d="M248.625 573.75c-10.557 0-19.125 8.568-19.125 19.125S238.068 612 248.625 612s19.125-8.568 19.125-19.125-8.568-19.125-19.125-19.125m-38.25-76.5c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125 19.125-8.568 19.125-19.125-8.568-19.125-19.125-19.125m114.75 0c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125 19.125-8.568 19.125-19.125-8.568-19.125-19.125-19.125m38.25 76.5c-10.557 0-19.125 8.568-19.125 19.125S352.818 612 363.375 612s19.125-8.568 19.125-19.125-8.568-19.125-19.125-19.125m77.781-477.57C413.081 39.245 354.635 0 286.875 0 196.05 0 121.826 70.399 115.381 159.598 48.616 178.627 0 236.959 0 306c0 81.453 67.703 148.314 153 153h267.75C531.388 459 612 377.661 612 277.312c0-96.676-75.582-175.491-170.844-181.132m-1.281 401.07c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125S459 526.932 459 516.375s-8.568-19.125-19.125-19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgCloudBlackStormSymbolOfWeatherWithHailDotsFalling);
export default ForwardRef;
