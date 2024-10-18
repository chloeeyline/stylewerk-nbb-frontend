import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCopyBlackSquareSymbol = (
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
        <path d="M114.75 401.625V153H76.5C34.253 153 0 187.253 0 229.5v306C0 577.747 34.253 612 76.5 612h306c42.247 0 76.5-34.253 76.5-76.5v-38.25H210.375c-42.247 0-95.625-53.378-95.625-95.625M535.5 0h-306C187.253 0 153 34.253 153 76.5v306c0 42.247 34.253 76.5 76.5 76.5h306c42.247 0 76.5-34.253 76.5-76.5v-306C612 34.253 577.747 0 535.5 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgCopyBlackSquareSymbol);
export default ForwardRef;
