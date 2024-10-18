import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMobileDeviceBlackSymbol = (
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
        <path d="M111.375 693c0 54.673 44.327 99 99 99h371.25c54.673 0 99-44.327 99-99v-74.25h-569.25zM396 643.5c20.493 0 37.125 16.632 37.125 37.125S416.493 717.75 396 717.75s-37.125-16.632-37.125-37.125S375.507 643.5 396 643.5m-284.625-74.25h569.25v-396h-569.25zM581.625 0h-371.25c-54.673 0-99 44.327-99 99v24.75h569.25V99c0-54.673-44.327-99-99-99" />
    </svg>
);
const ForwardRef = forwardRef(SvgMobileDeviceBlackSymbol);
export default ForwardRef;
