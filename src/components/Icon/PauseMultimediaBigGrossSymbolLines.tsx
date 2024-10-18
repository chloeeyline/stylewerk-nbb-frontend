import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPauseMultimediaBigGrossSymbolLines = (
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
        <path d="M282.856 0H169.714c-31.228 0-56.571 25.344-56.571 56.571v678.857c0 31.228 25.344 56.571 56.571 56.571h113.143c31.256 0 56.572-25.315 56.572-56.571V56.571C339.428 25.344 314.112 0 282.856 0m339.429 0H509.143c-31.256 0-56.572 25.344-56.572 56.571v678.857c0 31.228 25.316 56.571 56.572 56.571h113.143c31.256 0 56.572-25.315 56.572-56.571V56.571C678.857 25.344 653.541 0 622.285 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgPauseMultimediaBigGrossSymbolLines);
export default ForwardRef;
