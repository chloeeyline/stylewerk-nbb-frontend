import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgCrossSquareBlackButton = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M400.669 373.626c7.478 7.478 7.478 19.584 0 27.043-7.479 7.478-19.584 7.478-27.043 0L306 333.043l-67.626 67.606c-7.478 7.479-19.584 7.479-27.043 0-7.478-7.478-7.478-19.584 0-27.043L278.957 306l-67.626-67.607c-7.478-7.478-7.478-19.584 0-27.042 7.478-7.478 19.584-7.478 27.043 0L306 278.957l67.626-67.626c7.478-7.478 19.584-7.478 27.043 0 7.478 7.478 7.478 19.584 0 27.043L333.043 306z" />
    </svg>
);
const ForwardRef = forwardRef(SvgCrossSquareBlackButton);
export default ForwardRef;
