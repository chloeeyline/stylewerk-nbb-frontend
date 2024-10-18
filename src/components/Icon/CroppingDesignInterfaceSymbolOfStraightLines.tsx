import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCroppingDesignInterfaceSymbolOfStraightLines = (
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
        <path d="M573.75 459H535.5V172.125l-76.5 76.5V459H191.25L558.698 61.219l-27.042-27.043L153 439.875V153h191.25l73.86-76.5H153V38.25C153 17.117 135.883 0 114.75 0S76.5 17.117 76.5 38.25V76.5H38.25C17.117 76.5 0 93.617 0 114.75S17.117 153 38.25 153H76.5v382.5H459v38.25c0 21.114 17.117 38.25 38.25 38.25s38.25-17.117 38.25-38.25V535.5h38.25c21.133 0 38.25-17.117 38.25-38.25 0-21.114-17.117-38.25-38.25-38.25" />
    </svg>
);
const ForwardRef = forwardRef(SvgCroppingDesignInterfaceSymbolOfStraightLines);
export default ForwardRef;
