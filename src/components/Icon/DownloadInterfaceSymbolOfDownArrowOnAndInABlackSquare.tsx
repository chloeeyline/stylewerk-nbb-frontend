import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgDownloadInterfaceSymbolOfDownArrowOnAndInABlackSquare = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 792 792"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M622.285 226.286h-198v412.576L572.588 490.56c11.059-11.061 28.965-11.061 39.996 0 11.059 11.06 11.059 28.964 0 39.995L417.412 725.727c-5.883 5.884-13.719 8.4-21.413 8.005-7.722.396-15.529-2.121-21.412-8.005L179.444 530.555c-11.06-11.031-11.06-28.964 0-39.995 11.06-11.061 28.965-11.061 39.996 0l148.274 148.302V226.286h-198c-31.256 0-56.571 25.316-56.571 56.571v452.572c0 31.256 25.315 56.571 56.571 56.571h452.571c31.256 0 56.572-25.315 56.572-56.571V282.857c0-31.255-25.316-56.571-56.572-56.571m-198-198C424.285 12.672 411.613 0 396 0s-28.286 12.672-28.286 28.286v198h56.571z" />
    </svg>
);
const ForwardRef = forwardRef(SvgDownloadInterfaceSymbolOfDownArrowOnAndInABlackSquare);
export default ForwardRef;
