import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgEqualizerBlackSquareButton = (
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
        <path d="M210.375 432.225c-25.341 0-45.9 20.541-45.9 45.9 0 25.341 20.559 45.9 45.9 45.9 25.36 0 45.9-20.56 45.9-45.9s-20.54-45.9-45.9-45.9m0-306c-25.341 0-45.9 20.559-45.9 45.9 0 25.36 20.559 45.9 45.9 45.9 25.36 0 45.9-20.54 45.9-45.9 0-25.341-20.54-45.9-45.9-45.9m172.125 153c-25.359 0-45.9 20.54-45.9 45.9 0 25.341 20.541 45.9 45.9 45.9 25.341 0 45.9-20.56 45.9-45.9s-20.541-45.9-45.9-45.9M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0m-38.25 497.25H284.178c-8.53 32.934-38.192 57.375-73.803 57.375s-65.254-24.441-73.784-57.375H114.75c-10.557 0-19.125-8.568-19.125-19.125S104.193 459 114.75 459h21.822c8.53-32.934 38.192-57.375 73.784-57.375 35.591 0 65.254 24.441 73.803 57.375H497.25c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125m0-153h-40.946c-8.53 32.934-38.193 57.375-73.804 57.375s-65.255-24.441-73.804-57.375H114.75c-10.557 0-19.125-8.568-19.125-19.125S104.193 306 114.75 306h193.946c8.53-32.933 38.193-57.375 73.804-57.375s65.255 24.442 73.804 57.375h40.946c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125m0-153H284.178c-8.53 32.933-38.192 57.375-73.803 57.375s-65.254-24.442-73.803-57.375H114.75c-10.557 0-19.125-8.568-19.125-19.125S104.193 153 114.75 153h21.822c8.549-32.933 38.192-57.375 73.803-57.375s65.273 24.442 73.803 57.375H497.25c10.557 0 19.125 8.568 19.125 19.125s-8.568 19.125-19.125 19.125" />
    </svg>
);
const ForwardRef = forwardRef(SvgEqualizerBlackSquareButton);
export default ForwardRef;