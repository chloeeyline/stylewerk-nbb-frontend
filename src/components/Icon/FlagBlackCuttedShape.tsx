import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgFlagBlackCuttedShape = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 783.359 783.359"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M232.56 514.08H183.6V73.44h48.96V48.96S231.679 0 183.6 0h-48.96c-27.026 0-48.96 21.91-48.96 48.96V734.4c0 27.051 21.934 48.959 48.96 48.959h48.96c27.05 0 48.96-21.908 48.96-48.959zm416.16-342.72H501.84v416.16h146.88c27.051 0 48.96-21.908 48.96-48.959V220.32c0-27.05-21.909-48.96-48.96-48.96m-416.16 16.646V514.08h220.32V73.44H232.56z" />
    </svg>
);
const ForwardRef = forwardRef(SvgFlagBlackCuttedShape);
export default ForwardRef;
