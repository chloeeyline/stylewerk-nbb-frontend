import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgWindowBlackRoundedSquareInterfaceSymbol = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5V153h612V76.5C612 34.253 577.747 0 535.5 0M95.625 114.75c-10.557 0-19.125-8.568-19.125-19.125S85.068 76.5 95.625 76.5s19.125 8.568 19.125 19.125-8.568 19.125-19.125 19.125m76.5 0c-10.557 0-19.125-8.568-19.125-19.125S161.568 76.5 172.125 76.5s19.125 8.568 19.125 19.125-8.568 19.125-19.125 19.125m76.5 0c-10.557 0-19.125-8.568-19.125-19.125S238.068 76.5 248.625 76.5s19.125 8.568 19.125 19.125-8.568 19.125-19.125 19.125M0 535.5C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5V191.25H0z" />
    </svg>
);
const ForwardRef = forwardRef(SvgWindowBlackRoundedSquareInterfaceSymbol);
export default ForwardRef;
