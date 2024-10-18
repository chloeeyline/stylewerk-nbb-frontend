import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMusicSquareFrontalSpeakerAmplifyingToolSymbol = (
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
        <path d="M306 114.75c-105.627 0-191.25 85.623-191.25 191.25S200.373 497.25 306 497.25 497.25 411.627 497.25 306 411.627 114.75 306 114.75m0 306c-63.38 0-114.75-51.37-114.75-114.75S242.62 191.25 306 191.25 420.75 242.62 420.75 306 369.38 420.75 306 420.75M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M95.625 76.5c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125S76.5 106.182 76.5 95.625 85.068 76.5 95.625 76.5m0 459c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125 19.125 8.568 19.125 19.125-8.568 19.125-19.125 19.125m420.75 0c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125 19.125 8.568 19.125 19.125-8.568 19.125-19.125 19.125M306 535.5C179.259 535.5 76.5 432.741 76.5 306S179.259 76.5 306 76.5 535.5 179.259 535.5 306 432.741 535.5 306 535.5m210.375-420.75c-10.557 0-19.125-8.568-19.125-19.125S505.818 76.5 516.375 76.5 535.5 85.068 535.5 95.625s-8.568 19.125-19.125 19.125M306 229.5c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgMusicSquareFrontalSpeakerAmplifyingToolSymbol);
export default ForwardRef;
