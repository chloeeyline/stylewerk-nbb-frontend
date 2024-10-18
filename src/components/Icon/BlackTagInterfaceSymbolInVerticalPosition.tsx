import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackTagInterfaceSymbolInVerticalPosition = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792.006 792.006"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M397.449 272.723c-27.388 0-49.581 22.168-49.581 49.506s22.192 49.506 49.581 49.506c27.387 0 49.58-22.168 49.58-49.506.026-27.338-22.193-49.506-49.58-49.506m254.309-27.388L426.84 13.713c-17.738-18.284-46.512-18.284-64.25 0L137.671 245.335c-12.742 13.112-12.395 22.39-12.024 39.981h-.347v405.352c0 55.963 44.063 101.338 98.394 101.338h344.415c54.355 0 98.395-45.375 98.395-101.338V310.651c.025-29.367 2.994-47.057-14.746-65.316M397.449 421.242c-54.776 0-99.186-44.335-99.186-99.012s44.41-99.012 99.186-99.012c54.775 0 99.186 44.335 99.186 99.012s-44.41 99.012-99.186 99.012" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackTagInterfaceSymbolInVerticalPosition);
export default ForwardRef;
