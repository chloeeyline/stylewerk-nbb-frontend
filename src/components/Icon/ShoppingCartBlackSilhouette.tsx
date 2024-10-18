import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgShoppingCartBlackSilhouette = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.998 611.998"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M344.207 535.471c0 42.241 34.248 76.49 76.49 76.49s76.49-34.249 76.49-76.49c0-42.242-34.248-76.491-76.49-76.491s-76.49 34.249-76.49 76.491m76.49-38.245c21.131 0 38.245 17.114 38.245 38.245s-17.114 38.245-38.245 38.245-38.245-17.134-38.245-38.245 17.114-38.245 38.245-38.245m-305.961 38.245c0 42.241 34.249 76.49 76.49 76.49s76.49-34.249 76.49-76.49c0-42.242-34.249-76.491-76.49-76.491s-76.49 34.249-76.49 76.491m76.49-38.245c21.13 0 38.245 17.114 38.245 38.245s-17.115 38.245-38.245 38.245-38.245-17.134-38.245-38.245 17.115-38.245 38.245-38.245m-38.245-76.492c-21.13 0-38.245-17.114-38.245-38.245 0 0 439.82-38.245 439.265-36.391 9.771-36.256 57.502-246.203 57.923-250.448 1.014-10.518-8.567-19.123-19.123-19.123H114.736V38.283h19.123c10.556 0 19.123-8.567 19.123-19.123S144.415.037 133.859.037H19.123C8.567.037 0 8.604 0 19.16s8.567 19.123 19.123 19.123H76.49V382.49c0 42.242 34.249 76.49 76.491 76.49h439.82c.593 0 0-18.969 0-38.245h-439.82z" />
    </svg>
);
const ForwardRef = forwardRef(SvgShoppingCartBlackSilhouette);
export default ForwardRef;
