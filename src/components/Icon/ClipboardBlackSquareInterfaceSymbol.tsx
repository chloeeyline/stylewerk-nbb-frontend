import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgClipboardBlackSquareInterfaceSymbol = (
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
        <path d="M568.285 87.429h-65.571V43.714h-58.883C424.902 17.683 390.062 0 349.714 0s-75.188 17.683-94.117 43.714h-58.883v43.714h-65.571c-48.283 0-87.429 39.146-87.429 87.428V612c0 48.283 39.146 87.428 87.429 87.428h437.143c48.282 0 87.429-39.145 87.429-87.428V174.857c-.001-48.282-39.148-87.428-87.43-87.428m-327.857 0h48.566c0-24.13 27.19-43.714 60.719-43.714s60.719 19.562 60.719 43.714H459v87.428H240.428zm262.286 480.856h-306c-12.065 0-21.857-9.791-21.857-21.857 0-12.064 9.792-21.855 21.857-21.855h306c12.065 0 21.857 9.791 21.857 21.855 0 12.066-9.792 21.857-21.857 21.857m0-109.285h-306c-12.065 0-21.857-9.791-21.857-21.857 0-12.064 9.792-21.857 21.857-21.857h306c12.065 0 21.857 9.793 21.857 21.857 0 12.066-9.792 21.857-21.857 21.857m0-109.285h-306c-12.065 0-21.857-9.792-21.857-21.857s9.792-21.857 21.857-21.857h306c12.065 0 21.857 9.792 21.857 21.857s-9.792 21.857-21.857 21.857" />
    </svg>
);
const ForwardRef = forwardRef(SvgClipboardBlackSquareInterfaceSymbol);
export default ForwardRef;
