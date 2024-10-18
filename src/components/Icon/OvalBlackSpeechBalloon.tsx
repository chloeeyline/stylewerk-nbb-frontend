import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgOvalBlackSpeechBalloon = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.02 612.02"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M306.01 0C137.002 0 .01 117.466.01 262.396c0 119.512 93.272 220.167 220.741 251.856l85.259 97.768 85.259-97.768c127.468-31.69 220.741-132.345 220.741-251.856C612.01 117.466 475.018 0 306.01 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgOvalBlackSpeechBalloon);
export default ForwardRef;
