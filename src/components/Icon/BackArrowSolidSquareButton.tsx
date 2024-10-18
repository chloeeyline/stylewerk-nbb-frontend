import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBackArrowSolidSquareButton = (
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
        <path d="M0 95.625v420.75c0 42.247 34.253 76.5 76.5 76.5h38.25V19.125H76.5c-42.247 0-76.5 34.253-76.5 76.5m535.5-76.5H153v573.75h382.5c42.247 0 76.5-34.253 76.5-76.5V95.625c0-42.247-34.253-76.5-76.5-76.5m-19.125 306H281.654l76.328 63.094c7.517 7.497 7.517 19.66 0 27.157-7.516 7.497-19.718 7.497-27.233 0L216.38 320.86c-4.016-3.997-5.718-9.295-5.451-14.535-.268-5.24 1.435-10.538 5.451-14.535l114.368-94.516c7.516-7.497 19.718-7.497 27.233 0 7.517 7.497 7.517 19.661 0 27.157l-75.62 62.443h234.014c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.126-19.125 19.126" />
    </svg>
);
const ForwardRef = forwardRef(SvgBackArrowSolidSquareButton);
export default ForwardRef;
