import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgLink = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.992 611.992"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M368.986 242.967c-7.753-7.753-20.315-7.753-28.068 0l-98.238 98.238c-7.753 7.753-7.753 20.314 0 28.067s20.315 7.753 28.068 0l98.238-98.237c7.753-7.752 7.753-20.315 0-28.068M139.3 551.48c-15.506 15.506-43.378-4.122-58.884-19.628s-35.134-43.378-19.628-58.885L241.895 285.54c-26.439-6.987-62.24-9.951-82.967 10.775L21.532 433.711c-31.012 31.013-27.4 93.724 3.612 124.736l28.068 28.067c31.012 31.013 94.352 35.232 125.344 4.221l137.396-137.396c20.728-20.727 17.155-57.156 10.168-83.595zM586.522 53.205l-28.067-28.068c-31.013-31.012-93.724-34.604-124.736-3.611L296.323 158.92c-20.727 20.728-17.763 56.548-10.775 82.968L472.975 60.781c15.507-15.506 43.378 4.122 58.885 19.628s35.134 43.378 19.628 58.884L369.752 326.112c26.438 6.987 62.868 10.56 83.595-10.168l137.396-137.396c31.012-31.011 26.773-94.351-4.221-125.343" />
    </svg>
);
const ForwardRef = forwardRef(SvgLink);
export default ForwardRef;
