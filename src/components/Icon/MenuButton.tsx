import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMenuButton = (
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
        <path d="M61.2 122.4h489.6c33.782 0 61.2-27.387 61.2-61.2S584.613 0 550.8 0H61.2C27.387 0 0 27.387 0 61.2s27.387 61.2 61.2 61.2m489.6 122.4H61.2C27.387 244.8 0 272.187 0 306c0 33.812 27.387 61.2 61.2 61.2h489.6c33.782 0 61.2-27.388 61.2-61.2 0-33.813-27.387-61.2-61.2-61.2m0 244.8H61.2C27.387 489.6 0 516.987 0 550.8S27.387 612 61.2 612h489.6c33.782 0 61.2-27.387 61.2-61.2s-27.387-61.2-61.2-61.2" />
    </svg>
);
const ForwardRef = forwardRef(SvgMenuButton);
export default ForwardRef;