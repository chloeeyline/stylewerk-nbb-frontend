import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgArrowRight = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792.049 792.049"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M622.955 342.127 268.424 20.521c-27.36-27.36-71.677-27.36-99.037 0s-27.36 71.676 0 99.037l304.749 276.468-304.749 276.466c-27.36 27.359-27.36 71.676 0 99.036s71.677 27.36 99.037 0l354.531-321.606c14.783-14.783 21.302-34.538 20.084-53.897 1.186-19.36-5.301-39.114-20.084-53.898" />
    </svg>
);
const ForwardRef = forwardRef(SvgArrowRight);
export default ForwardRef;
