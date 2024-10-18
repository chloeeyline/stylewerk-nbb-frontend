import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackPlaceholderForMaps = (
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
        <path d="M396 222.75c-41.011 0-74.25 33.239-74.25 74.25s33.239 74.25 74.25 74.25 74.25-33.239 74.25-74.25-33.239-74.25-74.25-74.25M396 0C231.982 0 99 132.982 99 297c0 124.171 247.624 495.248 297 495 48.609.247 297-372.487 297-495C693 132.982 560.019 0 396 0m0 420.75c-68.335 0-123.75-55.415-123.75-123.75S327.665 173.25 396 173.25 519.75 228.665 519.75 297 464.335 420.75 396 420.75" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackPlaceholderForMaps);
export default ForwardRef;
