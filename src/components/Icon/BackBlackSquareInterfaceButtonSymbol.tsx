import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBackBlackSquareInterfaceButtonSymbol = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M420.75 325.125H218.293l78.814 78.814c7.478 7.478 7.478 19.584 0 27.042s-19.584 7.479-27.043 0l-108.19-108.189c-4.571-4.571-6.005-10.863-4.954-16.792-1.052-5.929.383-12.221 4.973-16.811l108.19-108.19c7.478-7.478 19.584-7.478 27.043 0 7.478 7.478 7.478 19.584 0 27.043l-78.833 78.833H420.75c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgBackBlackSquareInterfaceButtonSymbol);
export default ForwardRef;
