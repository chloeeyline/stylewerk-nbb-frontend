import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgTwoOppositeDiagonalArrowsInBlackSquare = (
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
        <path d="M535.5 0h-459C34.253 0 0 34.253 0 76.5v459C0 577.747 34.253 612 76.5 612h459c42.247 0 76.5-34.253 76.5-76.5v-459C612 34.253 577.747 0 535.5 0M267.75 535.5H96.161c-5.355 0-10.156-2.219-13.617-5.757-3.71-3.137-6.043-7.707-6.043-13.368V344.25c0-10.557 8.568-19.125 19.125-19.125s19.125 8.568 19.125 19.125l-.612 125.747 129.82-129.82 27.043 27.042L140.97 497.25h126.78c10.557 0 19.125 8.568 19.125 19.125S278.307 535.5 267.75 535.5M535.5 267.75c0 10.557-8.568 19.125-19.125 19.125s-19.125-8.568-19.125-19.125l.612-125.747-129.821 129.821-27.042-27.043 130.03-130.031H344.25c-10.557 0-19.125-8.568-19.125-19.125S333.693 76.5 344.25 76.5h171.59c5.354 0 10.155 2.219 13.616 5.757 3.711 3.136 6.044 7.707 6.044 13.368z" />
    </svg>
);
const ForwardRef = forwardRef(SvgTwoOppositeDiagonalArrowsInBlackSquare);
export default ForwardRef;
