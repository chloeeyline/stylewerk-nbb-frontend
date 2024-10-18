import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgUpArrowEnteringInBlackSquare = (
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
        <path d="M622.285 0H169.714c-31.256 0-56.571 25.316-56.571 56.571v452.571c0 31.256 25.315 56.571 56.571 56.571h198V153.139L219.412 301.441c-11.06 11.06-28.964 11.06-39.996 0-11.06-11.06-11.06-28.964 0-39.996L374.587 66.302c5.883-5.912 13.69-8.429 21.412-8.033 7.721-.396 15.53 2.122 21.413 8.005l195.143 195.143c11.061 11.032 11.061 28.965 0 39.996-11.059 11.06-28.965 11.06-39.996 0L424.285 153.139v412.575h198c31.256 0 56.572-25.315 56.572-56.571V56.571C678.857 25.316 653.541 0 622.285 0M367.714 763.714C367.714 779.328 380.386 792 396 792s28.286-12.672 28.286-28.286v-198h-56.571v198z" />
    </svg>
);
const ForwardRef = forwardRef(SvgUpArrowEnteringInBlackSquare);
export default ForwardRef;
