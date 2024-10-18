import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackSilhouetteShapeOfAnObjectLikeASpoon = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 793.684 793.684"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M396.842 0c-95.887 0-173.618 88.843-173.618 198.421 0 90.009 52.21 167.418 124.013 192.022v353.636c0 27.382 22.198 49.581 49.58 49.604h.05c27.382-.024 49.581-22.223 49.581-49.604V390.443C518.251 365.839 570.46 288.43 570.46 198.421 570.46 88.843 492.729 0 396.842 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackSilhouetteShapeOfAnObjectLikeASpoon);
export default ForwardRef;
