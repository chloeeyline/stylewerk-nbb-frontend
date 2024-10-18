import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgEmailBlackOpenedBackEnvelopeInterfaceSymbol = (
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
        <path d="M607.41 169.256 306 0 4.59 169.256 306 395.046zM0 210.375V535.5c0 16.142 5.049 31.059 13.579 43.395l198.059-203.892zm306 229.5-62.309-42.84L44.427 604.752C54.219 609.284 65.006 612 76.5 612h459c11.494 0 22.28-2.716 32.072-7.248L368.31 397.035zm94.362-64.872 198.059 203.892C606.951 566.559 612 551.642 612 535.5V216.457z" />
    </svg>
);
const ForwardRef = forwardRef(SvgEmailBlackOpenedBackEnvelopeInterfaceSymbol);
export default ForwardRef;
