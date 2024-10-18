import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRightArrowBlackSquareButton = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M396.193 320.879 224.604 491.856c-7.554 7.517-19.775 7.517-27.33 0-7.554-7.516-7.554-19.698 0-27.215l158.909-158.335L197.274 147.97c-7.554-7.516-7.554-19.699 0-27.215s19.775-7.516 27.33 0l171.589 170.978c4.035 4.016 5.737 9.333 5.47 14.574.287 5.239-1.434 10.556-5.47 14.572" />
    </svg>
);
const ForwardRef = forwardRef(SvgRightArrowBlackSquareButton);
export default ForwardRef;
