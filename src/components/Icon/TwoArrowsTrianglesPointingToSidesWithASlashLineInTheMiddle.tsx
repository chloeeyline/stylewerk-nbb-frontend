import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTwoArrowsTrianglesPointingToSidesWithASlashLineInTheMiddle = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.997 611.997"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M163.231 387.644V224.482c0-7.832 1.917-18.927-6.118-26.779-8.036-7.832-21.048-7.832-29.084 0L5.841 296.498c-4.283 4.181-6.098 9.729-5.812 15.195-.286 5.466 1.529 11.013 5.812 15.194l122.188 98.774c8.036 7.831 21.048 7.831 29.084 0 8.035-7.832 6.118-23.17 6.118-38.017m442.904-91.146-122.167-98.794c-8.036-7.832-21.048-7.832-29.084 0s-6.118 15.113-6.118 26.779v163.162c0 11.014-1.918 30.186 6.118 38.018 8.035 7.831 21.048 7.831 29.084 0l122.188-98.774c4.283-4.182 6.099-9.729 5.812-15.194.286-5.469-1.55-11.016-5.833-15.197M447.929 43.434c-9.749-5.527-22.23-2.244-27.859 7.322l-254.941 491.26c-5.629 9.565-3.304 24.188 7.465 27.31 13.176 3.813 22.231 2.243 27.86-7.322l254.94-491.26c5.649-9.587 2.304-21.804-7.465-27.31" />
    </svg>
);
const ForwardRef = forwardRef(SvgTwoArrowsTrianglesPointingToSidesWithASlashLineInTheMiddle);
export default ForwardRef;
