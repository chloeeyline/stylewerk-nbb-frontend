import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgImageSquareInterfaceButton = (
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
        <path d="M153 191.25c21.133 0 38.25-17.117 38.25-38.25s-17.117-38.25-38.25-38.25-38.25 17.136-38.25 38.25 17.117 38.25 38.25 38.25M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M153 76.5c42.247 0 76.5 34.253 76.5 76.5s-34.253 76.5-76.5 76.5-76.5-34.253-76.5-76.5 34.253-76.5 76.5-76.5M76.5 573.75c-21.133 0-38.25-17.136-38.25-38.25v-17.978l151.948-136.074L382.52 573.75zm497.25-38.25c0 21.114-17.117 38.25-38.25 38.25h-98.838L295.749 430.981 459 267.731l114.75 114.75z" />
    </svg>
);
const ForwardRef = forwardRef(SvgImageSquareInterfaceButton);
export default ForwardRef;
