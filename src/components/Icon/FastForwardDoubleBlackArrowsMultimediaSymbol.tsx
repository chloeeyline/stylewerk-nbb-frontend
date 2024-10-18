import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFastForwardDoubleBlackArrowsMultimediaSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.004 612.003"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M600.786 279.033 275.929 45.952c-21.534-11.551-46.203-14.286-46.222 30.196V177.6L46.214 45.952C24.681 34.382-.601 34.038.011 77.334v457.862c.612 39.107 26.467 44.769 46.222 31.994l183.493-131.668V535.79c.019 37.922 26.486 44.176 46.222 31.401L600.805 334.11c14.935-15.204 14.935-39.874-.019-55.077" />
    </svg>
);
const ForwardRef = forwardRef(SvgFastForwardDoubleBlackArrowsMultimediaSymbol);
export default ForwardRef;
