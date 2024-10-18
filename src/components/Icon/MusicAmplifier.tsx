import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMusicAmplifier = (
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
        <path d="M396 297.198c41.109 0 74.448-33.313 74.448-74.448 0-41.11-33.313-74.448-74.448-74.448-41.11 0-74.448 33.338-74.448 74.448S354.89 297.198 396 297.198m0 148.302c-68.335 0-123.75 55.415-123.75 123.75C272.25 637.609 327.665 693 396 693s123.75-55.415 123.75-123.75S464.335 445.5 396 445.5M594 0H198c-54.673 0-99 44.327-99 99v594c0 54.673 44.327 99 99 99h396c54.673 0 99-44.327 99-99V99c0-54.673-44.327-99-99-99M396 99c68.335 0 123.75 55.415 123.75 123.75 0 68.359-55.415 123.75-123.75 123.75s-123.75-55.415-123.75-123.75S327.665 99 396 99m0 643.5c-95.684 0-173.25-77.566-173.25-173.25S300.316 396 396 396s173.25 77.566 173.25 173.25S491.684 742.5 396 742.5" />
    </svg>
);
const ForwardRef = forwardRef(SvgMusicAmplifier);
export default ForwardRef;
