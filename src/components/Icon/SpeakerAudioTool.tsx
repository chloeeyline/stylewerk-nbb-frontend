import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSpeakerAudioTool = (
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
        <path d="M0 227.052v157.935c0 21.814 17.669 39.484 39.484 39.484H98.71V187.568H39.484C17.669 187.568 0 205.237 0 227.052m493.549 78.969c0-69.551-51.566-126.546-118.452-136.2v39.484c45.051 9.141 78.968 48.96 78.968 96.716s-33.917 87.574-78.968 96.715v39.484c66.885-9.655 118.452-66.649 118.452-136.199M276.387 69.117l-138.194 92.116v289.555l138.194 92.135c21.815 0 39.484-17.688 39.484-39.484V108.601c0-21.815-17.669-39.484-39.484-39.484m98.71-39.208v40.55c115.925 22.328 197.419 116.872 197.419 235.542 0 118.016-78.967 209.441-197.419 235.541v40.549C508.868 562.526 612 446.997 612 305.98c0-140.977-103.132-256.506-236.903-276.071" />
    </svg>
);
const ForwardRef = forwardRef(SvgSpeakerAudioTool);
export default ForwardRef;
