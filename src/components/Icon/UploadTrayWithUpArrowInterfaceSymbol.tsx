import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUploadTrayWithUpArrowInterfaceSymbol = (
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
        <path d="M571.2 367.235c-22.542 0-40.8 18.258-40.8 40.8v81.6H81.6v-81.6c0-22.542-18.258-40.8-40.8-40.8S0 385.493 0 408.035v142.8c0 9.792 10.608 20.4 20.4 20.4h571.2c12.322 0 20.4-9.344 20.4-20.4v-142.8c0-22.542-18.258-40.8-40.8-40.8m-346.8-163.2h40.8v183.6c0 22.542 18.258 40.8 40.8 40.8 22.521 0 40.8-18.258 40.8-40.8v-183.6h40.8c14.383 0 27.051 1.917 35.048-6.12 7.996-8.038 7.996-21.053 0-29.09L321.83 46.608c-4.264-4.284-9.935-6.1-15.504-5.814-5.589-.285-11.24 1.53-15.504 5.814L189.985 168.824c-7.997 8.038-7.997 21.053 0 29.09 7.997 8.038 26.418 6.121 34.415 6.121" />
    </svg>
);
const ForwardRef = forwardRef(SvgUploadTrayWithUpArrowInterfaceSymbol);
export default ForwardRef;
