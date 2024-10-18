import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMoonPhaseBlackCrescentShape = (
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
        <path d="M402.336 396c0-170.8 110.855-315.909 265.914-371.473C624.765 8.935 577.986 0 528.957 0 305.167 0 123.75 177.309 123.75 396c0 218.716 181.417 396 405.207 396 49.029 0 95.808-8.935 139.293-24.527C513.191 711.909 402.336 566.8 402.336 396" />
    </svg>
);
const ForwardRef = forwardRef(SvgMoonPhaseBlackCrescentShape);
export default ForwardRef;
