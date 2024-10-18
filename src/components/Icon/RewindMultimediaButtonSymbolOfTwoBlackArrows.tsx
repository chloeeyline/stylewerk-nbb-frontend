import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRewindMultimediaButtonSymbolOfTwoBlackArrows = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.996 611.996"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M565.771 45.618 382.29 177.44V75.86c-.02-44.552-24.684-41.801-46.215-30.242L11.219 279.001c-14.959 15.227-14.959 39.91 0 55.137l324.856 233.363c19.735 12.781 46.195 6.534 46.215-31.427V435.698L565.771 567.52c19.735 12.781 45.603 7.126 46.214-32.039V77.064c.593-43.348-24.682-43.004-46.214-31.446" />
    </svg>
);
const ForwardRef = forwardRef(SvgRewindMultimediaButtonSymbolOfTwoBlackArrows);
export default ForwardRef;
