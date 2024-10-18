import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPlusSignOnZoomMagnifier = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.009 612.01"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M606.192 578.714 448.18 423.228c41.377-44.955 66.801-104.41 66.801-169.834C514.981 113.439 399.705 0 257.494 0S.007 113.439.007 253.393s115.276 253.393 257.487 253.393c61.445 0 117.801-21.253 162.068-56.586l158.624 156.099c7.729 7.614 20.277 7.614 28.006 0a19.276 19.276 0 0 0 0-27.585m-251.94-303.035H277.81v76.557c0 10.579-8.551 19.149-19.111 19.149s-19.11-8.57-19.11-19.149v-76.557h-76.424c-10.56 0-19.11-13.659-19.11-24.237s8.551-14.061 19.11-14.061h76.443v-76.557c0-10.56 8.551-19.149 19.11-19.149 10.56 0 19.111 8.57 19.111 19.149V237.4h76.443c10.56 0 19.11 8.57 19.11 19.149-.019 10.56-8.57 19.13-19.13 19.13" />
    </svg>
);
const ForwardRef = forwardRef(SvgPlusSignOnZoomMagnifier);
export default ForwardRef;
