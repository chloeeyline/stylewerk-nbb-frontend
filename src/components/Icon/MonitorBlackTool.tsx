import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMonitorBlackTool = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 631.742 631.742"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M444.193 592.258H404.71v-39.483H246.774v39.483H207.29c-10.897 0-19.742 8.845-19.742 19.742s8.845 19.742 19.742 19.742h236.903c10.897 0 19.742-8.845 19.742-19.742s-8.844-19.742-19.742-19.742M9.871 434.322c0 43.61 35.358 78.968 78.968 78.968h454.064c43.61 0 78.968-35.357 78.968-78.968v-39.483h-612zM542.903 0H88.839C45.229 0 9.871 35.358 9.871 78.968v276.388h612V78.968C621.871 35.358 586.514 0 542.903 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgMonitorBlackTool);
export default ForwardRef;
