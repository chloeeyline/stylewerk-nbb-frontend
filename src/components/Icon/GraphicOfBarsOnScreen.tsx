import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgGraphicOfBarsOnScreen = (
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
        <path d="M0 0v38.25h38.25v363.375c0 45.326 31.441 76.5 76.5 76.5H229.5L153 612l57.604-.249 76.271-133.626h38.25l76.271 133.626L459 612l-76.5-133.875h114.75c45.059 0 76.5-31.174 76.5-76.5V38.25H612V0zm210.375 363.375c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125v-76.5c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125zm114.75 0c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125v-229.5c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125zm114.75 0c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125V191.25c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125z" />
    </svg>
);
const ForwardRef = forwardRef(SvgGraphicOfBarsOnScreen);
export default ForwardRef;
