import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgKeyboardOfNineCircleForDigitalDevices = (
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
        <path d="M76.5 229.5C34.253 229.5 0 263.753 0 306s34.253 76.5 76.5 76.5S153 348.247 153 306s-34.253-76.5-76.5-76.5M306 420.75c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5m-229.5 0c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5m459-229.5c42.247 0 76.5-34.253 76.5-76.5s-34.253-76.5-76.5-76.5-76.5 34.253-76.5 76.5 34.253 76.5 76.5 76.5m-459-153C34.253 38.25 0 72.503 0 114.75s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5m459 382.5c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5m0-191.25c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5S612 348.247 612 306s-34.253-76.5-76.5-76.5M306 38.25c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5m0 191.25c-42.247 0-76.5 34.253-76.5 76.5s34.253 76.5 76.5 76.5 76.5-34.253 76.5-76.5-34.253-76.5-76.5-76.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgKeyboardOfNineCircleForDigitalDevices);
export default ForwardRef;
