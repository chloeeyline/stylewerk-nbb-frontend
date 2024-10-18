import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAirplaneSilhouette = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.01 612.01"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M596.905 15.396c-23.856-23.914-65.753-18.308-89.724 5.72L385.202 142.828l-226.3-84.578c-21.656-5.605-43.485-12.837-70.383 14.1-13.698 13.736-42.222 42.318 0 84.616L243.69 284.015 142.736 384.758l-94.201-23.531c-13.984-3.616-23.378-.784-30.552 7.116-3.616 4.516-29.844 23.972-11.574 42.28l109.544 85.209 85.19 109.544c13.239 13.258 25.54 4.993 42.356-10.981 10.656-10.675 8.36-16.165 5.146-31.738l-21.293-93.531 100.266-100.609 126.838 155.171c42.223 42.299 70.747 13.717 84.444 0 26.898-26.955 19.667-48.822 14.08-70.517l-83.85-226.645 121.501-121.922c23.99-24.047 30.131-65.312 6.274-89.208" />
    </svg>
);
const ForwardRef = forwardRef(SvgAirplaneSilhouette);
export default ForwardRef;
