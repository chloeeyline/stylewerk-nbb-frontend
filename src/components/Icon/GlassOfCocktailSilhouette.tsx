import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgGlassOfCocktailSilhouette = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 635.443 635.443"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M616.66 39.783C621.38 35.63 635.678 0 601.863 0H35.728C5.181 0 9.312 29.798 18.208 38.717l288.627 347.088v204.25h-90.778c-12.527 0-22.694 10.167-22.694 22.694s10.167 22.694 22.694 22.694h226.944c12.527 0 22.694-10.167 22.694-22.694s-10.167-22.694-22.694-22.694h-90.777v-204.25z" />
    </svg>
);
const ForwardRef = forwardRef(SvgGlassOfCocktailSilhouette);
export default ForwardRef;
