import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTrashCanBlackSymbol = (
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
        <path d="M635.538 94.154h-141.23V47.077C494.308 21.067 473.24 0 447.23 0H306c-26.01 0-47.077 21.067-47.077 47.077v47.077h-141.23c-26.01 0-47.077 21.067-47.077 47.077v47.077c0 25.986 21.067 47.053 47.03 47.077h517.917c25.986-.024 47.054-21.091 47.054-47.077V141.23c-.002-26.009-21.069-47.076-47.079-47.076m-188.308 0H306V70.615c0-12.993 10.545-23.539 23.538-23.539h94.154c12.993 0 23.538 10.545 23.538 23.539zM117.692 659.077c0 51.996 42.157 94.153 94.154 94.153h329.539c51.996 0 94.153-42.157 94.153-94.153V282.461H117.692zm353.078-306c0-12.993 10.545-23.539 23.538-23.539s23.538 10.545 23.538 23.539v282.461c0 12.993-10.545 23.539-23.538 23.539s-23.538-10.546-23.538-23.539zm-117.693 0c0-12.993 10.545-23.539 23.539-23.539s23.538 10.545 23.538 23.539v282.461c0 12.993-10.545 23.539-23.538 23.539s-23.539-10.546-23.539-23.539zm-117.693 0c0-12.993 10.545-23.539 23.539-23.539s23.539 10.545 23.539 23.539v282.461c0 12.993-10.545 23.539-23.539 23.539s-23.539-10.546-23.539-23.539z" />
    </svg>
);
const ForwardRef = forwardRef(SvgTrashCanBlackSymbol);
export default ForwardRef;
