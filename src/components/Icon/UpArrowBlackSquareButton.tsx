import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowBlackSquareButton = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0m-43.644 414.726c-7.516 7.555-19.698 7.555-27.215 0l-158.335-158.91-158.336 158.91c-7.516 7.555-19.699 7.555-27.196 0-7.516-7.555-7.516-19.775 0-27.33l170.978-171.589c3.997-4.017 9.314-5.738 14.573-5.47 5.24-.268 10.557 1.453 14.573 5.47l170.978 171.589c7.478 7.554 7.478 19.775-.02 27.33" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowBlackSquareButton);
export default ForwardRef;
