import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMusicalNoteBlackSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 791.983 791.983"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M671.423 174.441 504.127 7.145c-9.826-9.801-25.207-9.248-35.535 0-7.464 6.685-5.579 18.773-5.579 32.494v435.443c-55.74-41.34-147.795-41.391-229.294 5.654-101.328 58.505-147.896 167.523-104.017 243.519s161.592 90.17 262.92 31.665c78.71-45.437 124.121-121.307 120.05-188.557h.628V89.172l122.614 120.804c9.826 9.826 25.733 9.826 35.535 0 9.801-9.801 9.801-25.708-.026-35.535" />
    </svg>
);
const ForwardRef = forwardRef(SvgMusicalNoteBlackSymbol);
export default ForwardRef;
