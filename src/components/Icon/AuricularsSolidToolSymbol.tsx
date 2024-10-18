import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAuricularsSolidToolSymbol = (
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
        <path d="M572.564 277.714c.535-6.464 1.186-12.928 1.186-19.526C573.75 115.591 453.875 0 306 0S38.25 115.591 38.25 258.188c0 6.617.65 13.062 1.186 19.526C16.027 290.795 0 315.524 0 344.25V459c0 42.247 34.253 76.5 76.5 76.5 0 0 76.577.096 76.5 0 40.641-1.798 76.5-35.4 76.5-76.5V344.25c0-42.247-34.253-76.5-76.5-76.5H76.5c0-133.684 102.759-229.5 229.5-229.5s230.322 94.994 229.5 229.5c-.02 3.251-76.5 0-76.5 0-42.247 0-76.5 34.253-76.5 76.5V459c0 41.1 35.859 74.702 76.5 76.5-.076.115 38.25 0 38.25 0v57.375c0 10.557 8.568 19.125 19.125 19.125s19.125-8.568 19.125-19.125V535.5c42.247 0 76.5-34.253 76.5-76.5V344.25c0-28.726-16.026-53.455-39.436-66.536" />
    </svg>
);
const ForwardRef = forwardRef(SvgAuricularsSolidToolSymbol);
export default ForwardRef;
