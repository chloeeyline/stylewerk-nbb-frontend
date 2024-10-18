import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLeftArrowAndBlackSquareSymbol = (
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
        <path d="M232.932 442.454c8.546 8.546 8.546 22.382 0 30.906-8.546 8.546-22.382 8.546-30.906 0L51.233 322.546C46.665 318 44.72 311.967 45.026 306c-.306-5.967 1.639-12 6.186-16.546l150.792-150.792c8.546-8.546 22.381-8.546 30.906 0 8.546 8.546 8.546 22.382 0 30.906L118.334 284.143h318.808v-153c0-24.152-19.562-43.714-43.714-43.714H43.714C19.562 87.429 0 106.991 0 131.143v349.714c0 24.13 19.562 43.714 43.714 43.714h349.714c24.152 0 43.714-19.562 43.714-43.714v-153H118.334zm357.211-158.311h-153v43.714h153c12.065 0 21.857-9.792 21.857-21.857s-9.792-21.857-21.857-21.857" />
    </svg>
);
const ForwardRef = forwardRef(SvgLeftArrowAndBlackSquareSymbol);
export default ForwardRef;
