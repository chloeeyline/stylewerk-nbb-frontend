import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSpeakerBlackAudioInterfaceSymbol = (
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
        <path d="M132 264v264c0 36.465 29.535 66 66 66h99V198h-99c-36.465 0-66 29.535-66 66M594 0 363 154.011v484.011L594 792c36.465 0 66-29.568 66-66V66c0-36.432-29.535-66-66-66" />
    </svg>
);
const ForwardRef = forwardRef(SvgSpeakerBlackAudioInterfaceSymbol);
export default ForwardRef;
