import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMovieSymbolOfVideoCamera = (
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
        <path d="M573.75 267.75 459 344.25c0-23.218-10.557-43.758-26.89-57.796 38.881-23.428 65.14-65.637 65.14-114.329 0-73.938-59.938-133.875-133.875-133.875S229.5 98.188 229.5 172.125c0 37.504 15.51 71.317 40.373 95.625h-70.151c18.322-20.33 29.778-46.971 29.778-76.5 0-63.38-51.37-114.75-114.75-114.75S0 127.87 0 191.25c0 34.578 15.625 65.216 39.818 86.254C16.199 290.528 0 315.371 0 344.25v153c0 42.247 34.253 76.5 76.5 76.5h306c42.247 0 76.5-34.253 76.5-76.5l114.75 76.5c21.133 0 38.25-17.117 38.25-38.25V306c0-21.133-17.117-38.25-38.25-38.25m-459 0c-42.247 0-76.5-34.253-76.5-76.5s34.253-76.5 76.5-76.5 76.5 34.253 76.5 76.5-34.253 76.5-76.5 76.5m248.625.21c-52.938 0-95.835-42.917-95.835-95.835 0-52.938 42.917-95.835 95.835-95.835s95.835 42.897 95.835 95.835-42.898 95.835-95.835 95.835" />
    </svg>
);
const ForwardRef = forwardRef(SvgMovieSymbolOfVideoCamera);
export default ForwardRef;
