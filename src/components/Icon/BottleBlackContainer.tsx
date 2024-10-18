import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBottleBlackContainer = (
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
        <path d="M470.25 24.75C470.25 11.088 459.162 0 445.5 0h-99c-13.662 0-24.75 11.088-24.75 24.75V99h148.5zm.321 272.25h-.321V148.5h-148.5V297h-.322c-49.945 0-73.928 44.327-73.928 99v396h297V396c0-54.673-25.245-99-73.929-99" />
    </svg>
);
const ForwardRef = forwardRef(SvgBottleBlackContainer);
export default ForwardRef;
