import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTagBlackSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 611.976 611.976"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M23.242 280.944c-30.989 30.875-30.989 80.963 0 111.858l196.359 195.767c30.99 30.895 81.213 30.895 112.202 0l33.992-33.915L57.712 246.57zM575.365.236H318.919c-20.227 0-23.936 8.852-43.226 29.021L84.783 219.575l308.083 308.084 191.37-190.796c16.25-16.212 27.739-24.261 27.739-44.449V36.771c.02-20.188-16.383-36.535-36.61-36.535M474.423 245.748c-29.823 29.843-78.173 29.843-107.978 0-29.823-29.843-29.823-78.23 0-108.054 29.824-29.843 78.173-29.843 107.978 0 29.824 29.843 29.824 78.211 0 108.054m-81.002-81.041c-14.912 14.931-14.912 39.115 0 54.027s39.077 14.912 53.989 0 14.911-39.115 0-54.027c-14.893-14.931-39.077-14.931-53.989 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgTagBlackSymbol);
export default ForwardRef;
