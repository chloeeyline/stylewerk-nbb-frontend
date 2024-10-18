import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFilmStripPieceOfTwoPhotograms = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 765 765"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M586.5 0h-408c-56.33 0-102 45.67-102 102v663h612V102c0-56.33-45.671-102-102-102m-408 714h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51zm357 484.5c0 14.076-11.424 25.5-25.5 25.5H255c-14.076 0-25.5-11.424-25.5-25.5v-255c0-14.076 11.424-25.5 25.5-25.5h255c14.076 0 25.5 11.424 25.5 25.5zm0-357c0 14.076-11.424 25.5-25.5 25.5H255c-14.076 0-25.5-11.424-25.5-25.5v-255c0-14.076 11.424-25.5 25.5-25.5h255c14.076 0 25.5 11.424 25.5 25.5zm102 382.5h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51zm0-102h-51v-51h51z" />
    </svg>
);
const ForwardRef = forwardRef(SvgFilmStripPieceOfTwoPhotograms);
export default ForwardRef;
