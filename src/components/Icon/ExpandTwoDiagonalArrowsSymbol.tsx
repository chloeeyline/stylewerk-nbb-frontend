import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgExpandTwoDiagonalArrowsSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.363 612.363"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M210.498 344.459 90.804 466.526l-41.742-41.742c-9.034-9.033-18.201-18.641-29.129-18.66S.163 414.947.182 425.875l.229 165.034c0 5.837 2.641 10.928 6.661 14.564 3.636 4.019 8.746 6.641 14.564 6.66l165.053.229c10.928.02 19.77-8.823 19.751-19.751s-12.766-23.216-18.239-28.689l-41.742-41.741 121.455-120.307zM611.952 21.952c0-5.972-2.68-11.196-6.775-14.909-3.693-4.115-8.88-6.794-14.813-6.813L422.536 0c-11.101-.02-20.096 9.033-20.096 20.21.019 11.177 12.976 23.77 18.545 29.359l42.45 42.718-118.966 118.182 57.416 57.416 118.144-118.641 42.45 42.718c9.187 9.244 18.507 19.082 29.607 19.101 11.12.019 20.096-9.034 20.096-20.21z" />
    </svg>
);
const ForwardRef = forwardRef(SvgExpandTwoDiagonalArrowsSymbol);
export default ForwardRef;
