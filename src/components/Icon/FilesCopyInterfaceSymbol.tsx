import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFilesCopyInterfaceSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 699.428 699.428"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M502.714.678C500.004.678 240.428 0 240.428 0 194.178 0 153 42.425 153 87.429l-25.267.59c-46.228 0-84.019 41.834-84.019 86.838V612c0 45.004 41.179 87.428 87.429 87.428H459c46.249 0 87.428-42.424 87.428-87.428h21.857c46.25 0 87.429-42.424 87.429-87.428v-349.19zM459 655.715H131.143c-22.95 0-43.714-21.441-43.714-43.715V174.857c0-32.523 26.753-43.714 65.571-43.714v393.429C153 569.576 194.178 612 240.428 612c0 0 236.975-.24 262.482-.24 0 26.535-17.397 43.955-43.91 43.955m43.714-196.475H306c-12.065 0-21.857-9.77-21.857-21.836 0-12.064 9.792-21.834 21.857-21.834h196.714c12.065 0 21.857 9.77 21.857 21.834 0 12.067-9.792 21.836-21.857 21.836m0-109.176H306c-12.065 0-21.857-9.771-21.857-21.835s9.792-21.835 21.857-21.835h196.714c12.065 0 21.857 9.77 21.857 21.835 0 12.043-9.792 21.835-21.857 21.835m43.714-175.207c-23.277 0-43.714-21.004-43.714-43.714V44.348L612 174.857z" />
    </svg>
);
const ForwardRef = forwardRef(SvgFilesCopyInterfaceSymbol);
export default ForwardRef;
