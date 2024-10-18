import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgVoiceInterfaceSymbolOfMicrophoneSilhouette = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792 792"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M396 594c95.684 0 173.25-77.566 173.25-173.25v-247.5C569.25 77.566 491.684 0 396 0S222.75 77.566 222.75 173.25v247.5C222.75 516.434 300.316 594 396 594m272.25-123.75h-49.5C596.228 569.423 501.979 643.5 396 643.5s-200.228-74.077-222.75-173.25h-49.5c21.854 118.775 125.309 210.622 247.5 221.637V742.5H346.5c-13.662 0-24.75 11.088-24.75 24.75S332.838 792 346.5 792h99c13.662 0 24.75-11.088 24.75-24.75s-11.088-24.75-24.75-24.75h-24.75v-50.613c122.19-11.015 225.646-102.862 247.5-221.637" />
    </svg>
);
const ForwardRef = forwardRef(SvgVoiceInterfaceSymbolOfMicrophoneSilhouette);
export default ForwardRef;
