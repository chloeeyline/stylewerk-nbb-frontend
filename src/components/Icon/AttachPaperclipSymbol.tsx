import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAttachPaperclipSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.675 612.675"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M581.209 223.007 269.839 530.92c-51.592 51.024-135.247 51.024-186.839 0s-51.592-133.737 0-184.761L363.248 69.04c34.402-34.009 90.15-34.009 124.553 0s34.402 89.166 0 123.174l-280.249 277.12c-17.19 17.016-45.075 17.016-62.287 0-17.19-16.993-17.19-44.571 0-61.587L394.37 161.42l-31.144-30.793-249.082 246.348c-34.402 34.009-34.402 89.166 0 123.174s90.15 34.009 124.552 0l280.249-277.12c51.592-51.023 51.592-133.737 0-184.761-51.593-51.023-135.247-51.023-186.839 0L36.285 330.784l1.072 1.071c-53.736 68.323-49.012 167.091 14.5 229.88 63.512 62.79 163.35 67.492 232.46 14.325l1.072 1.072 326.942-323.31z" />
    </svg>
);
const ForwardRef = forwardRef(SvgAttachPaperclipSymbol);
export default ForwardRef;
