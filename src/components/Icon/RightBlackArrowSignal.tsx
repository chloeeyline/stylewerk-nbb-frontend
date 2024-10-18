import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgRightBlackArrowSignal = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 753.115 753.115"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M211.773 658.976c0 51.988 42.151 94.14 94.14 94.14h47.069c51.988 0 94.14-42.151 94.14-94.14V517.767H211.773zM352.982 0h-47.069c-51.989 0-94.14 42.151-94.14 94.14h235.349c0-51.989-42.151-94.14-94.14-94.14M675.81 287.69l-70.134-139.844c-5.013-5.013-11.673-7.061-18.239-6.637H117.634c-25.982 0-47.07 21.064-47.07 47.07v235.348c0 26.006 21.087 47.07 47.07 47.07l470.697-.565s12.567-2.023 17.345-6.801l70.134-139.845c5.296-9.884 6.002-13.109 6.708-17.886.329-6.449-1.766-8.943-6.708-17.91" />
    </svg>
);
const ForwardRef = forwardRef(SvgRightBlackArrowSignal);
export default ForwardRef;
