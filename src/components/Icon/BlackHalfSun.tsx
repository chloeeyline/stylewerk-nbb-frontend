import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBlackHalfSun = (
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
        <path d="m550.8 273.646 28.846-28.846c7.977-7.976 7.977-20.89 0-28.845-7.977-7.977-20.89-7.977-28.846 0L521.954 244.8c-7.977 7.977-7.977 20.89 0 28.846s20.89 7.976 28.846 0M306 183.6c11.261 0 20.4-9.139 20.4-20.4v-40.8c0-11.261-9.14-20.4-20.4-20.4s-20.4 9.139-20.4 20.4v40.8c0 11.261 9.139 20.4 20.4 20.4m244.8 244.8c-15.688-115.077-120.441-204-244.8-204s-229.112 88.923-244.8 204zm40.8 40.8H20.4C9.139 469.2 0 478.339 0 489.6S9.139 510 20.4 510h571.2c11.261 0 20.4-9.14 20.4-20.4s-9.14-20.4-20.4-20.4M61.2 273.646c7.976 7.977 20.89 7.977 28.845 0 7.956-7.977 7.977-20.89 0-28.846L61.2 215.955c-7.977-7.977-20.89-7.977-28.846 0-7.977 7.956-7.977 20.869 0 28.845z" />
    </svg>
);
const ForwardRef = forwardRef(SvgBlackHalfSun);
export default ForwardRef;
