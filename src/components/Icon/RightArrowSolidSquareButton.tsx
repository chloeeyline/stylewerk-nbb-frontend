import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRightArrowSolidSquareButton = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0m-85.374 322.811-108.19 108.19c-7.478 7.478-19.584 7.478-27.042 0-7.479-7.478-7.479-19.584 0-27.043l78.813-78.833H191.25c-10.557 0-19.125-8.568-19.125-19.125s8.568-19.125 19.125-19.125h202.457l-78.813-78.814c-7.479-7.478-7.479-19.584 0-27.043 7.478-7.478 19.584-7.478 27.042 0l108.19 108.19c4.59 4.59 6.005 10.863 4.973 16.812 1.032 5.928-.402 12.201-4.973 16.791" />
    </svg>
);
const ForwardRef = forwardRef(SvgRightArrowSolidSquareButton);
export default ForwardRef;
