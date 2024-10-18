import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgGiftbox = (
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
        <path d="M325.125 382.5H535.5v38.25H325.125v153h-38.25v-153H76.5V382.5h210.375v-153H38.25v306c0 42.247 34.253 76.5 76.5 76.5h382.5c42.247 0 76.5-34.253 76.5-76.5v-306H325.125zM573.75 114.75H429.261c6.579-11.284 10.614-24.25 10.614-38.25 0-42.247-34.253-76.5-76.5-76.5C340.387 0 320.019 10.347 306 26.393 291.981 10.347 271.613 0 248.625 0c-42.247 0-76.5 34.253-76.5 76.5 0 14 4.035 26.966 10.614 38.25H38.25C17.117 114.75 0 131.886 0 153v38.25h612V153c0-21.114-17.117-38.25-38.25-38.25m-325.125 0c-21.133 0-38.25-17.117-38.25-38.25s17.117-38.25 38.25-38.25 38.25 17.117 38.25 38.25-17.117 38.25-38.25 38.25m114.75 0c-21.133 0-38.25-17.117-38.25-38.25s17.117-38.25 38.25-38.25 38.25 17.117 38.25 38.25-17.117 38.25-38.25 38.25" />
    </svg>
);
const ForwardRef = forwardRef(SvgGiftbox);
export default ForwardRef;
