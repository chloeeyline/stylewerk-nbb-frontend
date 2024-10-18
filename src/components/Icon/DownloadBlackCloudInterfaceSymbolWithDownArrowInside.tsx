import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownloadBlackCloudInterfaceSymbolWithDownArrowInside = (
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
        <path d="M441.156 172.68c-28.075-56.935-86.521-96.18-154.281-96.18-90.825 0-165.049 70.399-171.494 159.598C48.616 255.127 0 313.459 0 382.5c0 81.453 67.703 147.855 153 152.541l325.125.459C543.839 506.966 612 427.463 612 353.812c0-96.676-75.582-175.491-170.844-181.132m-6.675 167.841L320.879 453.606c-4.016 3.997-9.313 5.699-14.572 5.432-5.241.268-10.558-1.435-14.574-5.432L178.13 340.521c-7.516-7.478-7.516-19.622 0-27.1s19.699-7.479 27.215 0l81.53 81.186V210.662c0-10.576 8.568-19.145 19.125-19.145s19.125 8.568 19.125 19.145v184.537l82.142-81.778c7.517-7.479 19.699-7.479 27.215 0 7.516 7.497 7.516 19.622-.001 27.1" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownloadBlackCloudInterfaceSymbolWithDownArrowInside);
export default ForwardRef;
