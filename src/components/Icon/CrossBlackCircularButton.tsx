import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCrossBlackCircularButton = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306c168.988 0 306-137.012 306-306S475.008 0 306 0m108.19 387.147c7.478 7.478 7.478 19.584 0 27.043-7.479 7.478-19.584 7.478-27.043 0l-81.032-81.033-81.588 81.588c-7.535 7.516-19.737 7.516-27.253 0-7.535-7.535-7.535-19.737 0-27.254l81.587-81.587-81.033-81.033c-7.478-7.478-7.478-19.584 0-27.042 7.478-7.478 19.584-7.478 27.042 0l81.033 81.033 82.181-82.18c7.535-7.535 19.736-7.535 27.253 0 7.535 7.535 7.535 19.737 0 27.253l-82.181 82.181z" />
    </svg>
);
const ForwardRef = forwardRef(SvgCrossBlackCircularButton);
export default ForwardRef;
