import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgVoiceAmplificationOrRecordingInterfaceSymbolOfAMicrophone = (
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
        <path d="M638.303 177.309C614.988 76.082 515.369 0 396 0 276.606 0 177.012 76.082 153.697 177.309c-17.622 7.573-29.947 25.047-29.947 45.441v49.5c0 27.349 22.151 49.5 49.5 49.5 0 0 54.92 123.75 222.75 123.75s222.75-123.75 222.75-123.75c27.349 0 49.5-22.151 49.5-49.5v-49.5c0-20.394-12.351-37.868-29.947-45.441M594 272.25H198c-13.662 0-24.75-11.088-24.75-24.75s11.088-24.75 24.75-24.75h396c13.662 0 24.75 11.088 24.75 24.75s-11.088 24.75-24.75 24.75M257.821 468.345 297 742.5c0 27.349 22.151 49.5 49.5 49.5h99c27.349 0 49.5-22.151 49.5-49.5l39.154-274.155c-135.431 56.157-259.825 6.657-276.333 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgVoiceAmplificationOrRecordingInterfaceSymbolOfAMicrophone);
export default ForwardRef;
