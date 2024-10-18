import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgBrokenBlackTicketSymbol = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 699.428 699.428"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M568.285 0H131.143C82.86 0 43.714 39.146 43.714 87.429v611.999h40.807l90.336-65.57 87.428 65.57 87.429-65.57 87.429 65.57 87.429-65.57 90.335 65.57h40.808V87.429C655.714 39.146 616.567 0 568.285 0m-65.571 437.143h-306c-12.065 0-21.857-9.791-21.857-21.857 0-12.064 9.792-21.857 21.857-21.857h306c12.065 0 21.857 9.793 21.857 21.857 0 12.066-9.792 21.857-21.857 21.857m0-131.645h-306c-12.065 0-21.857-9.792-21.857-21.857s9.792-21.857 21.857-21.857h306c12.065 0 21.857 9.792 21.857 21.857s-9.792 21.857-21.857 21.857m0-130.641h-306c-12.065 0-21.857-9.792-21.857-21.857s9.792-21.857 21.857-21.857h306c12.065 0 21.857 9.792 21.857 21.857s-9.792 21.857-21.857 21.857" />
    </svg>
);
const ForwardRef = forwardRef(SvgBrokenBlackTicketSymbol);
export default ForwardRef;
