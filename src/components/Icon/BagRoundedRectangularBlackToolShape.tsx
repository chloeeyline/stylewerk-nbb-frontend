import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBagRoundedRectangularBlackToolShape = (
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
        <path d="M544.5 99H420.75V0h-99C308.088 0 297 11.088 297 24.75s11.088 24.75 24.75 24.75h49.5V99H247.5c-54.673 0-99 44.327-99 99v495c0 54.673 44.327 99 99 99h297c54.673 0 99-44.327 99-99V198c0-54.673-44.327-99-99-99M420.75 321.75c0 13.662-11.088 24.75-24.75 24.75s-24.75-11.088-24.75-24.75v-99c0-13.662 11.088-24.75 24.75-24.75s24.75 11.088 24.75 24.75z" />
    </svg>
);
const ForwardRef = forwardRef(SvgBagRoundedRectangularBlackToolShape);
export default ForwardRef;
