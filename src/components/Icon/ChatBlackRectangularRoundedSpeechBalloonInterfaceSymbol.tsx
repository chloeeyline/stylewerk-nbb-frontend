import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgChatBlackRectangularRoundedSpeechBalloonInterfaceSymbol = (
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
        <path d="M510.017 0H102.003C45.68 0 .01 45.346.01 101.305v323.021c0 55.922 39.283 92.049 95.625 92.049h126.952l83.423 95.645 83.423-95.645h126.952c56.323 0 95.625-36.127 95.625-92.067V101.305C612.01 45.346 566.339 0 510.017 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgChatBlackRectangularRoundedSpeechBalloonInterfaceSymbol);
export default ForwardRef;
