import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTwoArrows = (
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
        <path d="M260.655 351.173c-3.615-4.016-8.721-6.636-14.554-6.655l-164.915-.229c-10.92-.019-19.756 8.816-19.737 19.737s12.756 23.198 18.226 28.668l41.711 41.712L0 554.625 57.375 612l119.608-121.979 41.711 41.712c9.027 9.027 18.188 18.628 29.108 18.646 10.92.02 19.756-8.816 19.737-19.736l-.229-164.915c-.019-5.833-2.639-10.94-6.655-14.555m232.464-175.701L612 57.375 554.625 0 436.566 118.556l-42.419-42.687c-9.181-9.238-18.494-19.068-29.587-19.087-11.111-.019-20.081 9.027-20.081 20.196l.229 168.797c0 5.967 2.678 11.188 6.771 14.898 3.69 4.112 8.874 6.789 14.803 6.809l167.726.229c11.093.019 20.082-9.027 20.082-20.196-.02-11.169-12.967-23.753-18.532-29.338z" />
    </svg>
);
const ForwardRef = forwardRef(SvgTwoArrows);
export default ForwardRef;
