import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBellSilhouetteBlackShapeInterfaceSymbolOfAlarm = (
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
        <path d="M524.571 393.429V218.571C524.571 97.854 426.717 0 306 0S87.429 97.854 87.429 218.571v174.857L0 568.286h244.45C253.478 593.684 277.498 612 306 612s52.522-18.295 61.55-43.714H612z" />
    </svg>
);
const ForwardRef = forwardRef(SvgBellSilhouetteBlackShapeInterfaceSymbolOfAlarm);
export default ForwardRef;
