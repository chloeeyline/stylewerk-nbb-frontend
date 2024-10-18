import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMusicalNote = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792.007 792.007"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M580.395 0c-25.355 0-26.596 26.438-26.596 26.438V458.15c-58.997-43.51-156.385-43.562-242.638 5.937-107.228 61.556-153.191 176.252-110.078 256.225 43.878 81.372 170.975 94.881 278.204 33.324 83.271-47.81 127.889-125.487 127.704-199.55V26.385C606.516 12.19 594.774 0 580.395 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgMusicalNote);
export default ForwardRef;
