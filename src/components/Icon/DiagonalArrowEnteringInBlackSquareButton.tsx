import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDiagonalArrowEnteringInBlackSquareButton = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.771 612.771"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M331.999 434.212c14.412-.025 25.534 11.02 25.509 25.509-.025 14.488-11.097 25.482-25.509 25.508h-178.56c-14.412.026-25.534-11.02-25.508-25.508V281.162c.025-14.489 11.096-25.483 25.508-25.509 14.413-.025 25.534 11.02 25.509 25.509l-.102 118.588 293.5-295.668c-4.106-1.071-8.341-1.812-12.779-1.812H51.406c-28.187 0-51.017 22.856-51.017 51.043v408.569c0 28.11 22.651 50.89 50.609 50.89h408.544c28.187 0 51.017-22.855 51.017-51.043V153.313c0-4.464-.766-8.724-1.837-12.856L214.813 434.136zM604.787 7.634c-10.127-10.178-26.555-10.178-36.707 0l-95.733 96.448a50.86 50.86 0 0 1 36.401 36.4l96.039-95.938c10.127-10.229 10.127-26.732 0-36.91" />
    </svg>
);
const ForwardRef = forwardRef(SvgDiagonalArrowEnteringInBlackSquareButton);
export default ForwardRef;
