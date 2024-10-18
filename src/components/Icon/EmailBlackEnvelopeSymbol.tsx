import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgEmailBlackEnvelopeSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 652.801 652.801"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M489.601 122.4 597.312 14.688C584.113 5.467 568.12 0 550.801 0H102C84.68 0 68.687 5.467 55.488 14.667L163.2 122.4zm135.456-74.276L510 163.2H142.8L27.745 48.144C23.114 58.364 20.4 69.646 20.4 81.6v489.599c0 45.064 36.537 81.602 81.6 81.602h448.8c45.063 0 81.6-36.537 81.6-81.602V81.6c0-11.954-2.712-23.236-7.343-33.476" />
    </svg>
);
const ForwardRef = forwardRef(SvgEmailBlackEnvelopeSymbol);
export default ForwardRef;
