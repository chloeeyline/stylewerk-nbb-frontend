import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowSolidBlackSquareButton = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M431.001 297.126c-7.478 7.478-19.584 7.478-27.043 0l-78.833-78.833V420.75c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125V218.293l-78.814 78.814c-7.478 7.478-19.584 7.478-27.043 0-7.478-7.478-7.478-19.584 0-27.043l108.19-108.19c4.59-4.59 10.863-6.005 16.812-4.973 5.929-1.052 12.221.383 16.811 4.973l108.19 108.19c7.439 7.478 7.439 19.584-.02 27.062" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowSolidBlackSquareButton);
export default ForwardRef;
