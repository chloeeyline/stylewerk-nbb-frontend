import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDoubleHorizontalArrow = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.017 612.017"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="m606.521 291.429-113.23-113.555c-7.495-7.515-19.656-7.515-27.15 0-7.495 7.514-7.189 20.42-7.189 32.828v57.361H153.027v-57.361c0-12.408.306-25.314-7.189-32.828s-19.656-7.515-27.151 0L5.457 291.429c-3.996 4.015-5.698 9.331-5.43 14.57-.268 5.258 1.434 10.573 5.43 14.589l113.249 113.555c7.495 7.515 19.656 7.515 27.151 0s7.189-24.722 7.189-32.236v-57.361H458.97v57.361c0 12.408-.307 24.722 7.188 32.236s19.656 7.515 27.151 0L606.56 320.587c3.996-4.015 5.697-9.331 5.43-14.589.228-5.239-1.472-10.555-5.469-14.569" />
    </svg>
);
const ForwardRef = forwardRef(SvgDoubleHorizontalArrow);
export default ForwardRef;
