import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgShoppingCartSilhouette = (
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
        <path d="M267.75 516.375c-21.133 0-38.25 17.117-38.25 38.25 0 21.114 17.117 38.25 38.25 38.25S306 575.739 306 554.625c0-21.133-17.117-38.25-38.25-38.25m-77.093-344.25-47.717-153H19.125C8.568 19.125 0 27.693 0 38.25s8.568 19.125 19.125 19.125h95.625l38.441 114.75H153l38.25 229.5c0 42.247 34.253 76.5 76.5 76.5h210.375c42.247 0 76.5-34.253 76.5-76.5L612 172.125zM459 516.375c-21.133 0-38.25 17.117-38.25 38.25 0 21.114 17.117 38.25 38.25 38.25s38.25-17.136 38.25-38.25c0-21.133-17.117-38.25-38.25-38.25" />
    </svg>
);
const ForwardRef = forwardRef(SvgShoppingCartSilhouette);
export default ForwardRef;
