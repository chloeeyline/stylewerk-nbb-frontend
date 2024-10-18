import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUploadToInternetCloud = (
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
        <path d="M441.156 172.68c-28.075-56.935-86.521-96.18-154.281-96.18-90.825 0-165.049 70.399-171.494 159.598C48.616 255.127 0 313.459 0 382.5c0 81.453 67.703 147.855 153 152.541l325.125.459C543.839 506.966 612 427.463 612 353.812c0-96.676-75.582-175.491-170.844-181.132m-6.675 164.149c-7.516 7.479-19.698 7.479-27.215 0l-82.142-81.778v184.537c0 10.576-8.568 19.145-19.125 19.145s-19.125-8.568-19.125-19.145V255.644l-81.549 81.185c-7.516 7.479-19.699 7.479-27.215 0-7.516-7.478-7.516-19.622 0-27.1l113.603-113.086c4.016-3.997 9.313-5.699 14.573-5.431 5.24-.268 10.557 1.434 14.573 5.431l113.603 113.086c7.517 7.478 7.517 19.603.019 27.1" />
    </svg>
);
const ForwardRef = forwardRef(SvgUploadToInternetCloud);
export default ForwardRef;
