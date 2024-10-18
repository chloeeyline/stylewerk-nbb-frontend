import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFourBlackButtonsKeyboardOfRoundedSquares = (
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
        <path d="M174.857 349.714H87.429C39.146 349.714 0 388.86 0 437.143v87.429C0 572.854 39.146 612 87.429 612h87.428c48.283 0 87.429-39.146 87.429-87.429v-87.429c0-48.282-39.146-87.428-87.429-87.428m0-349.714H87.429C39.146 0 0 39.146 0 87.429v87.429c0 48.282 39.146 87.428 87.429 87.428h87.428c48.283 0 87.429-39.146 87.429-87.428V87.429C262.286 39.146 223.14 0 174.857 0m349.714 349.714h-87.429c-48.282 0-87.429 39.146-87.429 87.429v87.429c0 48.282 39.146 87.429 87.429 87.429h87.429C572.854 612 612 572.854 612 524.571v-87.429c0-48.282-39.146-87.428-87.429-87.428m0-349.714h-87.429c-48.282 0-87.429 39.146-87.429 87.429v87.429c0 48.282 39.146 87.428 87.429 87.428h87.429c48.282 0 87.429-39.146 87.429-87.428V87.429C612 39.146 572.854 0 524.571 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgFourBlackButtonsKeyboardOfRoundedSquares);
export default ForwardRef;
