import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPaperclipInVerticalPosition = (
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
        <path d="M544.5 99v495c0 82.021-66.479 148.5-148.5 148.5S247.5 676.021 247.5 594V148.5c0-54.673 44.327-99 99-99s99 44.327 99 99V594c0 27.349-22.176 49.5-49.5 49.5-27.349 0-49.5-22.151-49.5-49.5V198H297v396c0 54.673 44.327 99 99 99s99-44.327 99-99V148.5C495 66.479 428.521 0 346.5 0S198 66.479 198 148.5v470.25C210.202 716.389 295.045 792 396 792s185.798-75.611 198-173.25V99z" />
    </svg>
);
const ForwardRef = forwardRef(SvgPaperclipInVerticalPosition);
export default ForwardRef;
