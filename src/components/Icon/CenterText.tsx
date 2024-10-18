import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCenterText = (
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
        <path d="M43.714 87.429h524.572c24.151 0 43.714-19.584 43.714-43.714S592.438 0 568.286 0H43.714C19.562 0 0 19.562 0 43.714s19.562 43.715 43.714 43.715m87.429 87.428c-24.152 0-43.714 19.562-43.714 43.714 0 24.13 19.562 43.714 43.714 43.714h349.714c24.152 0 43.714-19.562 43.714-43.714s-19.562-43.714-43.714-43.714zm437.143 174.857H43.714C19.562 349.714 0 369.276 0 393.429s19.562 43.714 43.714 43.714h524.572c24.151 0 43.714-19.562 43.714-43.714s-19.562-43.715-43.714-43.715m-87.429 174.857H131.143c-24.152 0-43.714 19.562-43.714 43.715 0 24.151 19.562 43.714 43.714 43.714h349.714c24.152 0 43.714-19.562 43.714-43.714s-19.561-43.715-43.714-43.715" />
    </svg>
);
const ForwardRef = forwardRef(SvgCenterText);
export default ForwardRef;
