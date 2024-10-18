import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgShuffleTwoArrowsSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.988 611.988"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M45.343 181.859h45.344l74.59 93.249 59.196-73.388L136.03 91.172H45.343C20.291 91.172 0 111.463 0 136.516s20.291 45.343 45.343 45.343m430.762 0v38.27c6.757 6.688 27.887 9.477 34.643 2.789l96.174-72.708a17.024 17.024 0 0 0 0-24.236l-96.174-72.708c-6.756-6.711-27.886-10.565-34.643-3.877v41.807H362.747L90.687 431.271H45.343C20.291 431.271 0 451.562 0 476.614s20.291 45.343 45.343 45.343h90.687l272.061-340.075h68.015zm34.643 207.809c-6.756-6.688-27.886-4.92-34.643 1.769v39.812H408.09L333.5 338l-59.196 73.389 88.442 110.547h113.358v40.378c6.757 6.688 27.887 3.719 34.643-2.97l96.174-72.708a17.024 17.024 0 0 0 0-24.236z" />
    </svg>
);
const ForwardRef = forwardRef(SvgShuffleTwoArrowsSymbol);
export default ForwardRef;
