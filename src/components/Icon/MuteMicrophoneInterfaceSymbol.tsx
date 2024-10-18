import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMuteMicrophoneInterfaceSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 782.609 782.609"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M184.525 468.221c-.293-1.223-.88-2.324-1.149-3.547h-48.913a254.7 254.7 0 0 0 11.69 42.383zM403.484 0c-94.549 0-171.196 76.646-171.196 171.196l-.074 252.123 329.968-315.661C536.919 44.633 475.533 0 403.484 0M662.16 73.663 85.305 625.988l34.924 34.461 577.076-552.058zM403.484 635.869c-47.421 0-92.055-15.578-129.229-41.111l-34.386 34.803c39.962 29.615 87.627 49.475 139.157 54.121v50.014h-24.457c-13.5 0-24.457 10.957-24.457 24.457s10.957 24.457 24.457 24.457h97.827c13.5 0 24.456-10.957 24.456-24.457s-10.956-24.457-24.456-24.457H427.94v-50.014c120.742-10.883 222.97-101.641 244.565-219.008h-48.913c-22.255 97.972-115.385 171.195-220.108 171.195M574.68 415.762V287.095L299.177 550.639c28.957 22.426 64.834 36.318 104.308 36.318 94.548 0 171.195-76.646 171.195-171.195" />
    </svg>
);
const ForwardRef = forwardRef(SvgMuteMicrophoneInterfaceSymbol);
export default ForwardRef;
