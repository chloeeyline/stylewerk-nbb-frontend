import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowButton = (
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
        <path d="M306 0C137.012 0 0 136.992 0 306s137.012 306 306 306c169.008 0 306-137.012 306-306S475.008 0 306 0m125.001 316.231c-7.478 7.479-19.584 7.479-27.043 0l-78.833-78.813v202.457c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125V237.418l-78.814 78.813c-7.478 7.479-19.584 7.479-27.043 0-7.478-7.478-7.478-19.583 0-27.042l108.19-108.19c4.571-4.571 10.863-6.005 16.792-4.953 5.929-1.052 12.221.382 16.811 4.953l108.19 108.19c7.459 7.478 7.459 19.584 0 27.042" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowButton);
export default ForwardRef;
