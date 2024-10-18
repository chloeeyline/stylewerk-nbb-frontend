import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowBlackSquareButtonInterfaceSymbol = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M415.356 300.626c-7.497 7.516-19.66 7.516-27.157 0l-63.074-76.347v292.096c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125V225.006l-62.481 75.62c-7.497 7.516-19.661 7.516-27.157 0-7.497-7.516-7.497-19.718 0-27.234l94.516-114.387c3.997-4.016 9.314-5.718 14.535-5.451 5.24-.268 10.538 1.435 14.535 5.451l94.516 114.387c7.515 7.535 7.515 19.718.017 27.234m62.769-185.876h-344.25c-10.557 0-19.125-8.549-19.125-19.125 0-10.557 8.568-19.125 19.125-19.125h344.25c10.557 0 19.125 8.568 19.125 19.125 0 10.576-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowBlackSquareButtonInterfaceSymbol);
export default ForwardRef;
