import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAscendantArrow = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.986 611.986"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M596.145 405.201 347.627 129.608c-11.418-11.494-26.691-16.551-41.633-15.631-14.967-.945-30.215 4.112-41.633 15.631L15.842 405.201c-21.123 21.251-21.123 55.731 0 76.982s55.399 21.25 76.522 0l213.629-236.898 213.629 236.898c21.123 21.25 55.398 21.25 76.521 0 21.125-21.25 21.125-55.731.002-76.982" />
    </svg>
);
const ForwardRef = forwardRef(SvgAscendantArrow);
export default ForwardRef;
