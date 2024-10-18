import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgForkBlackSilhouetteOfKitchenEatingUtensil = (
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
        <path d="M495 0c-13.662 0-24.75 11.088-24.75 24.75v167.434c0 34.823-20.74 64.152-49.5 75.166V24.75C420.75 11.088 409.662 0 396 0s-24.75 11.088-24.75 24.75v242.6c-28.784-11.039-49.5-40.343-49.5-75.166V24.75C321.75 11.088 310.662 0 297 0s-24.75 11.088-24.75 24.75V198c0 50.688 30.616 93.976 74.25 113.107V742.5c0 25.616 19.553 46.456 44.5 49.005a25.6 25.6 0 0 0 10 0c24.947-2.549 44.5-23.389 44.5-49.005V311.107c43.635-19.132 74.25-62.419 74.25-113.107V24.75C519.75 11.088 508.662 0 495 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgForkBlackSilhouetteOfKitchenEatingUtensil);
export default ForwardRef;
