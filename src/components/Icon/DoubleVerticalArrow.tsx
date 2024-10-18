import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDoubleVerticalArrow = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792.001 792.001"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M520.104 593.94h-74.231v-395.9h74.231c15.91 0 31.994.396 41.718-9.304 9.725-9.699 9.725-25.437 0-35.136L414.868 7.067C409.672 1.896 402.793-.307 396.013.04c-6.804-.371-13.683 1.831-18.879 7.027L230.18 153.6c-9.724 9.7-9.724 25.437 0 35.137s25.016 9.303 42.485 9.303h74.231v395.9h-74.231c-15.91 0-32.761-.396-42.485 9.304s-9.724 25.437 0 35.137l146.954 146.558c5.196 5.171 12.075 7.373 18.855 7.027 6.805.346 13.684-1.856 18.855-7.027l146.953-146.558c9.725-9.7 9.725-25.437 0-35.137-9.699-9.699-23.457-9.304-41.693-9.304" />
    </svg>
);
const ForwardRef = forwardRef(SvgDoubleVerticalArrow);
export default ForwardRef;
