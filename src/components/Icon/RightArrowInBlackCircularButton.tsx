import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRightArrowInBlackCircularButton = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0m125.001 322.811-108.19 108.19c-7.478 7.478-19.583 7.478-27.042 0-7.478-7.478-7.478-19.584 0-27.043l78.814-78.833H172.125C161.568 325.125 153 316.557 153 306s8.568-19.125 19.125-19.125h202.457l-78.814-78.814c-7.478-7.478-7.478-19.584 0-27.043 7.478-7.478 19.584-7.478 27.042 0L431 289.208c4.59 4.59 6.005 10.863 4.973 16.812 1.033 5.909-.401 12.201-4.972 16.791" />
    </svg>
);
const ForwardRef = forwardRef(SvgRightArrowInBlackCircularButton);
export default ForwardRef;
