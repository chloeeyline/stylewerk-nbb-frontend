import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCloudBlackShape = (
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
        <path d="M441.156 172.68c-28.075-56.935-86.521-96.18-154.281-96.18-90.825 0-165.049 70.399-171.494 159.598C48.616 255.127 0 313.459 0 382.5c0 81.453 67.703 148.314 153 153h286.875C534.831 535.5 612 454.161 612 353.812c0-96.676-75.582-175.491-170.844-181.132" />
    </svg>
);
const ForwardRef = forwardRef(SvgCloudBlackShape);
export default ForwardRef;
