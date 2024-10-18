import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMegaphoneBlackAmplificationAudioToolSymbol = (
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
        <path d="M0 267.75c0 71.394 48.979 117.58 115.113 130.222-.115 1.225-.363 2.41-.363 3.653v153c0 21.133 17.117 38.25 38.25 38.25h57.375c21.133 0 38.25-17.136 38.25-38.25v-153H306v-267.75H153c-84.494 0-153 49.381-153 133.875m344.25 133.875h57.375v-267.75H344.25zm229.5-382.5-133.875 89.256v318.756l133.875 89.237c21.133 0 38.25-17.117 38.25-38.25V57.375c0-21.114-17.117-38.25-38.25-38.25" />
    </svg>
);
const ForwardRef = forwardRef(SvgMegaphoneBlackAmplificationAudioToolSymbol);
export default ForwardRef;
