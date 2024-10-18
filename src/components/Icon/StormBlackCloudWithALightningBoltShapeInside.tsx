import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgStormBlackCloudWithALightningBoltShapeInside = (
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
        <path d="M441.156 172.68c-28.075-56.935-86.521-96.18-154.281-96.18-90.825 0-165.049 70.399-171.494 159.598C48.616 255.127 0 313.459 0 382.5c0 81.453 67.703 147.855 153 152.541 0 0 264.518.459 267.75.459C521.099 535.5 612 454.161 612 353.812c0-96.676-75.582-175.491-170.844-181.132m-119.55 255.338c-4.15 10.021-14.956 14.478-24.117 9.926s-13.215-16.352-9.065-26.393l48.634-86.254-81.587.574c-8.109 0-14.937-5.088-17.729-12.202-2.065-4.628-2.391-10.002-.287-15.051l43.777-106.067c4.036-9.773 15.205-14.42 24.978-10.385 9.753 4.036 14.4 15.205 10.385 24.978l-29.721 79.732h76.5c10.557 0 19.125 8.568 19.125 19.125.001 11.359-60.893 122.017-60.893 122.017" />
    </svg>
);
const ForwardRef = forwardRef(SvgStormBlackCloudWithALightningBoltShapeInside);
export default ForwardRef;
