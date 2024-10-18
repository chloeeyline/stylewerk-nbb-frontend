import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPaintbrush = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.015 612.015"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="m246.969 319.343-60.227 59.385c-40.24-.898-95.934 13.35-119.975 92.09C48.388 512.492 0 510.389 0 510.389c100.467 111.464 218.874 48.292 245.917 20.904 23.754-24.079 27.177-53.514 24.634-77.058l56.038-55.254zm-27.771 185.576c-18.819 17.461-102.934 56.382-152.431 18.647 0 0 17.232-13.445 30.276-40.432 31.155-82.757 108.805-70.517 108.805-70.517l26.7 26.374c.268.25 19.948 35.059-13.35 65.928m376.22-450.562c-22.128-21.841-58.008-21.841-80.117 0L274.185 292.472l79.62 79.619 241.613-238.63c22.129-21.841 22.129-57.262 0-79.104" />
    </svg>
);
const ForwardRef = forwardRef(SvgPaintbrush);
export default ForwardRef;
