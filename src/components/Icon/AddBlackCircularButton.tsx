import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAddBlackCircularButton = (
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
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0m114.75 325.125h-95.625v95.625c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125v-95.625H191.25c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h95.625V191.25c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125v95.625h95.625c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgAddBlackCircularButton);
export default ForwardRef;
