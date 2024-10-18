import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgSpeaker = (
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
        <path d="M342.72 12.24 171.36 126.488v359.048L342.72 599.76c27.051 0 48.96-21.934 48.96-48.96V61.2c0-27.026-21.909-48.96-48.96-48.96M0 208.08v195.84c0 27.051 21.91 48.96 48.96 48.96h73.44V159.12H48.96C21.91 159.12 0 181.03 0 208.08m465.12-70.968v48.96c55.863 11.334 97.92 60.71 97.92 119.928s-42.057 108.594-97.92 119.928v48.96C548.059 462.917 612 392.243 612 306c0-86.268-63.941-156.917-146.88-168.888" />
    </svg>
);
const ForwardRef = forwardRef(SvgSpeaker);
export default ForwardRef;
