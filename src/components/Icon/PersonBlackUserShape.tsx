import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgPersonBlackUserShape = (
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
        <path d="M611.399 428.646C561.627 498.984 483.764 544.5 396 544.5s-165.627-45.516-215.399-115.854c-34.477 27.026-56.851 68.606-56.851 115.854v99c0 82.021 66.479 148.5 148.5 148.5h247.5c82.021 0 148.5-66.479 148.5-148.5v-99c0-47.248-22.374-88.828-56.851-115.854M396 495c123.032 0 222.75-110.806 222.75-247.5S519.032 0 396 0 173.25 110.806 173.25 247.5 272.968 495 396 495" />
    </svg>
);
const ForwardRef = forwardRef(SvgPersonBlackUserShape);
export default ForwardRef;
