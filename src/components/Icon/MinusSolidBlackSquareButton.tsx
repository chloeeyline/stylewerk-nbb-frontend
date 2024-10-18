import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMinusSolidBlackSquareButton = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M420.75 325.125h-229.5c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h229.5c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgMinusSolidBlackSquareButton);
export default ForwardRef;
