import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgWritingToolsSymbolOfInterfaceWithBlackSquarePaperNoteAndAPencil = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.594 612.594"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="m520.491 159.133 15.674-15.674v-13.148c0-29.587-23.999-53.587-53.587-53.587h-14.181l-14.163 14.181zM285.685 437.938 119.183 520.29c-18.736 8.709-33.741-8.113-26.851-26.85l82.294-166.617c1.397-7.178 4.172-14.143 9.741-19.713L414.6 76.725H53.884c-29.588 0-53.587 24-53.587 53.587v428.694c0 29.588 23.999 53.588 53.587 53.588h428.694c29.588 0 53.587-24 53.587-53.588V197.257l-230.768 230.94c-5.569 5.569-12.535 8.344-19.712 9.741m-74.409-103.92c7.139 7.139 42.008 42.047 67.213 67.271l215.112-215.248-67.691-66.791zm-82.505 136.398c-4.345 8.766 4.057 17.779 13.416 13.436l102.811-62.277-54.008-54.025zM601.158 78.409l-67.213-67.271c-14.852-14.851-38.927-14.851-53.778 0l-65.529 65.586h53.778L493.621 51.5c7.426-7.426 19.464-7.426 26.889 0l40.324 40.362c7.426 7.426 7.426 19.483 0 26.908l-24.669 24.688v53.816l64.993-65.031c14.852-14.869 14.852-38.964 0-53.834" />
    </svg>
);
const ForwardRef = forwardRef(SvgWritingToolsSymbolOfInterfaceWithBlackSquarePaperNoteAndAPencil);
export default ForwardRef;
