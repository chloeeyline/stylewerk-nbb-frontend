import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgShareBlackSolidSocialSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 663 663"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M510 408c-45.135 0-84.558 23.588-107.202 58.956l-136.527-78.03c8.797-17.34 14.229-36.644 14.229-57.426 0-12.827-2.474-24.964-5.993-36.644l142.061-81.167C439.85 238.935 472.948 255 510 255c70.405 0 127.5-57.095 127.5-127.5S580.405 0 510 0 382.5 57.095 382.5 127.5c0 12.827 2.474 24.964 5.992 36.644l-142.06 81.192C223.15 220.065 190.051 204 153 204c-70.405 0-127.5 57.069-127.5 127.5C25.5 401.905 82.595 459 153 459c29.07 0 55.539-10.098 76.984-26.494l153.893 89.198c-.484 4.616-1.377 9.078-1.377 13.796 0 70.405 57.095 127.5 127.5 127.5s127.5-57.095 127.5-127.5S580.405 408 510 408" />
    </svg>
);
const ForwardRef = forwardRef(SvgShareBlackSolidSocialSymbol);
export default ForwardRef;
