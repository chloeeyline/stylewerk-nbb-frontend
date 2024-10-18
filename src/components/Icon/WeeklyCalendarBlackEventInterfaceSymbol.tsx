import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgWeeklyCalendarBlackEventInterfaceSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 652.801 652.801"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M510 448.801h-40.8V489.6H510zM550.801 0H102C56.937 0 20.4 36.536 20.4 81.6v40.8h612V81.6c0-45.064-36.536-81.6-81.599-81.6M20.4 571.199c0 45.064 36.537 81.602 81.6 81.602h448.8c45.063 0 81.6-36.537 81.6-81.602v-408h-612zM489.601 244.8c33.803 0 61.2 27.397 61.2 61.2s-27.397 61.199-61.2 61.199S428.4 339.803 428.4 306s27.398-61.2 61.201-61.2m0 163.2c33.803 0 61.2 27.396 61.2 61.199s-27.397 61.201-61.2 61.201-61.2-27.398-61.2-61.201S455.798 408 489.601 408M326.4 244.8c33.803 0 61.2 27.397 61.2 61.2s-27.397 61.199-61.2 61.199-61.2-27.396-61.2-61.199 27.398-61.2 61.2-61.2m0 163.2c33.803 0 61.2 27.396 61.2 61.199S360.203 530.4 326.4 530.4s-61.2-27.398-61.2-61.201S292.598 408 326.4 408M163.2 244.8c33.803 0 61.2 27.397 61.2 61.2s-27.397 61.199-61.2 61.199S102 339.803 102 306s27.397-61.2 61.2-61.2m0 163.2c33.803 0 61.2 27.396 61.2 61.199S197.003 530.4 163.2 530.4 102 503.002 102 469.199 129.397 408 163.2 408M510 285.6h-40.8v40.8H510zm-326.399 0h-40.8v40.8h40.8zm0 163.201h-40.8V489.6h40.8zm163.2 0H306V489.6h40.8zm0-163.201H306v40.8h40.8z" />
    </svg>
);
const ForwardRef = forwardRef(SvgWeeklyCalendarBlackEventInterfaceSymbol);
export default ForwardRef;
