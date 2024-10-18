import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgListSymbolOfThreeItemsWithDots = (
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
        <path d="M59.226 88.839C26.513 88.839 0 115.352 0 148.064s26.513 59.226 59.226 59.226 59.226-26.514 59.226-59.226-26.514-59.225-59.226-59.225m0 157.935C26.513 246.774 0 273.288 0 306s26.513 59.226 59.226 59.226 59.226-26.513 59.226-59.226-26.514-59.226-59.226-59.226m0 157.936C26.513 404.71 0 431.223 0 463.936s26.513 59.226 59.226 59.226 59.226-26.514 59.226-59.226-26.514-59.226-59.226-59.226m138.193-217.162h375.096c21.815 0 39.484-17.669 39.484-39.484s-17.669-39.484-39.484-39.484H197.419c-21.815 0-39.484 17.669-39.484 39.484s17.669 39.484 39.484 39.484m375.097 78.968H197.419c-21.815 0-39.484 17.669-39.484 39.484 0 21.814 17.669 39.484 39.484 39.484h375.096c21.815 0 39.484-17.67 39.484-39.484.001-21.815-17.668-39.484-39.483-39.484m0 157.935H197.419c-21.815 0-39.484 17.67-39.484 39.484s17.669 39.483 39.484 39.483h375.096c21.815 0 39.484-17.669 39.484-39.483s-17.668-39.484-39.483-39.484" />
    </svg>
);
const ForwardRef = forwardRef(SvgListSymbolOfThreeItemsWithDots);
export default ForwardRef;
