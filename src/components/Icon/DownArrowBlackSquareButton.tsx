import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownArrowBlackSquareButton = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0m-44.255 224.604L320.268 396.193c-4.017 4.017-9.314 5.737-14.574 5.47-5.24.268-10.557-1.453-14.573-5.47L120.143 224.604c-7.516-7.554-7.516-19.794 0-27.33 7.516-7.555 19.699-7.555 27.215 0l158.335 158.909L464.03 197.274c7.516-7.555 19.698-7.555 27.215 0s7.516 19.795 0 27.33" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownArrowBlackSquareButton);
export default ForwardRef;
