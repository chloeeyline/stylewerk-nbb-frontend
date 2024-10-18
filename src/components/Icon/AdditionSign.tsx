import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAdditionSign = (
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
        <path d="M535.5 229.5h-153v-153C382.5 34.253 348.247 0 306 0s-76.5 34.253-76.5 76.5v153h-153C34.253 229.5 0 263.753 0 306s34.253 76.5 76.5 76.5h153v153c0 42.247 34.253 76.5 76.5 76.5s76.5-34.253 76.5-76.5v-153h153c42.247 0 76.5-34.253 76.5-76.5s-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgAdditionSign);
export default ForwardRef;
