import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLockedCircularBlackPadlockInterfaceSecuritySymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792 792"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M594 396.445V198C594 88.654 505.346 0 396 0S198 88.654 198 198v198.445c-30.938 41.333-49.5 92.466-49.5 148.055C148.5 681.194 259.306 792 396 792s247.5-110.806 247.5-247.5c0-55.589-18.562-106.722-49.5-148.055M420.75 618.75c0 13.662-11.088 24.75-24.75 24.75s-24.75-11.088-24.75-24.75v-99c0-13.662 11.088-24.75 24.75-24.75s24.75 11.088 24.75 24.75zM544.5 346.847C503.093 315.686 451.786 297 396 297s-107.093 18.686-148.5 49.847V198c0-82.021 66.479-148.5 148.5-148.5S544.5 115.979 544.5 198z" />
    </svg>
);
const ForwardRef = forwardRef(SvgLockedCircularBlackPadlockInterfaceSecuritySymbol);
export default ForwardRef;
