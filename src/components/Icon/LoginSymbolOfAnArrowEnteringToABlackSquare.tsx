import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLoginSymbolOfAnArrowEnteringToABlackSquare = (
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
        <path d="M568.286 87.429H218.571c-24.152 0-43.714 19.562-43.714 43.714v153h318.808L379.068 169.546c-8.546-8.546-8.546-22.382 0-30.906 8.546-8.546 22.382-8.546 30.906 0l150.792 150.792c4.568 4.568 6.514 10.601 6.208 16.568.306 5.967-1.64 12-6.186 16.546L409.996 473.36c-8.524 8.546-22.382 8.546-30.906 0-8.546-8.546-8.546-22.382 0-30.906l114.575-114.597H174.857v153c0 24.13 19.562 43.714 43.714 43.714h349.715c24.151 0 43.714-19.562 43.714-43.714V131.143c0-24.152-19.562-43.714-43.714-43.714M21.857 284.143C9.792 284.143 0 293.935 0 306s9.792 21.857 21.857 21.857h153v-43.714z" />
    </svg>
);
const ForwardRef = forwardRef(SvgLoginSymbolOfAnArrowEnteringToABlackSquare);
export default ForwardRef;
