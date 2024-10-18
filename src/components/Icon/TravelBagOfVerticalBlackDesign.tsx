import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTravelBagOfVerticalBlackDesign = (
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
        <path d="M396 49.5c54.673 0 99 15.32 99 49.5h49.5c0-54.673-66.479-99-148.5-99S247.5 44.327 247.5 99H297c0-34.18 44.327-49.5 99-49.5M99 693c0 54.673 44.327 99 99 99h396c54.673 0 99-44.327 99-99v-49.5H99zM594 99h-49.5v198H495V99H297v198h-49.5V99H198c-54.673 0-99 44.327-99 99v396h594V198c0-54.673-44.327-99-99-99" />
    </svg>
);
const ForwardRef = forwardRef(SvgTravelBagOfVerticalBlackDesign);
export default ForwardRef;
