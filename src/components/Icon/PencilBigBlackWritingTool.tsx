import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPencilBigBlackWritingTool = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792.003 792.003"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="m396.052 792.003 74.228-198.136H321.825zm-74.227-247.646h148.454V222.708H321.825zM420.795.028H371.31c-40.404-.916-50.771 20.783-49.484 49.484v123.711H470.28V49.512c.172-29.988-9.032-49.286-49.485-49.484" />
    </svg>
);
const ForwardRef = forwardRef(SvgPencilBigBlackWritingTool);
export default ForwardRef;
