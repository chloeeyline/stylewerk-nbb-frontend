import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgGamesMachine = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 753.23 753.23"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M588.461 0H164.769c-51.997 0-94.154 42.157-94.154 94.154v564.923c0 51.996 42.157 94.153 94.154 94.153h423.692c51.997 0 94.154-42.157 94.154-94.153V94.154C682.615 42.157 640.458 0 588.461 0m-306 612h-23.539v23.538c0 12.993-10.545 23.539-23.539 23.539-12.993 0-23.538-10.546-23.538-23.539V612h-23.539c-12.993 0-23.539-10.545-23.539-23.539 0-12.993 10.545-23.538 23.539-23.538h23.539v-23.538c0-12.993 10.545-23.539 23.538-23.539s23.539 10.546 23.539 23.539v23.538h23.539c12.993 0 23.539 10.545 23.539 23.538S295.455 612 282.461 612m141.231 47.077c-12.993 0-23.539-10.546-23.539-23.539S410.699 612 423.692 612s23.538 10.545 23.538 23.538-10.544 23.539-23.538 23.539m23.538-94.154c-12.993 0-23.538-10.545-23.538-23.538s10.545-23.539 23.538-23.539 23.539 10.546 23.539 23.539-10.545 23.538-23.539 23.538m94.155 94.154c-12.993 0-23.539-10.546-23.539-23.539S528.392 612 541.385 612s23.538 10.545 23.538 23.538-10.545 23.539-23.538 23.539m23.538-94.154c-12.993 0-23.538-10.545-23.538-23.538s10.545-23.539 23.538-23.539 23.538 10.546 23.538 23.539-10.545 23.538-23.538 23.538m23.538-141.231c0 25.986-21.066 47.077-47.076 47.077H211.846c-26.01 0-47.077-21.091-47.077-47.077V141.23c0-26.01 21.067-47.077 47.077-47.077h329.539c26.01 0 47.076 21.067 47.076 47.077zM517.846 141.23H235.384c-12.993 0-23.538 10.545-23.538 23.539v235.384c0 12.993 10.545 23.539 23.538 23.539h282.461c12.993 0 23.539-10.546 23.539-23.539V164.769c.001-12.993-10.545-23.539-23.538-23.539" />
    </svg>
);
const ForwardRef = forwardRef(SvgGamesMachine);
export default ForwardRef;
