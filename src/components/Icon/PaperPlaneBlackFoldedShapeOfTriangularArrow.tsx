import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPaperPlaneBlackFoldedShapeOfTriangularArrow = (
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
        <path d="M0 286.886s139.491 83.718 178.598 106.96L592.523.182C545.446 23.022 0 286.886 0 286.886m198.916 129.017c25.555 46.924 106.903 195.915 106.903 195.915S606.858 28.852 611.637 19.295c.191-.574.229-1.147.363-1.72z" />
    </svg>
);
const ForwardRef = forwardRef(SvgPaperPlaneBlackFoldedShapeOfTriangularArrow);
export default ForwardRef;
