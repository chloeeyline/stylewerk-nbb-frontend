import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgAlarmClock = (
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
        <path d="M573.75 306c0-147.875-119.875-267.75-267.75-267.75S38.25 158.125 38.25 306c0 101.4 56.399 189.624 139.517 235.065L114.75 612h57.375l51.351-51.351c26.01 8.435 53.703 13.101 82.524 13.101s56.515-4.686 82.524-13.101L439.875 612h57.375l-63.017-70.935C517.351 495.624 573.75 407.42 573.75 306m-133.875 19.125H306c-10.557 0-19.125-8.568-19.125-19.125V153c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125v133.875h114.75c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125M38.25 95.625c0-31.69 25.685-57.375 57.375-57.375h38.25V0h-38.25C42.821 0 0 42.821 0 95.625v38.25h38.25zM516.375 0h-38.25v38.25h38.25c31.69 0 57.375 25.685 57.375 57.375v38.25H612v-38.25C612 42.821 569.179 0 516.375 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgAlarmClock);
export default ForwardRef;
