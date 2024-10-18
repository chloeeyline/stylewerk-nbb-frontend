import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgWindsWeatherSymbol = (
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
        <path d="M196.714 196.714H459c12.065 0 21.857-9.792 21.857-21.857S471.065 153 459 153H196.714c-12.065 0-21.857 9.792-21.857 21.857s9.792 21.857 21.857 21.857M87.429 284.143h393.429C553.292 284.143 612 225.435 612 153S553.292 21.857 480.857 21.857v43.714c61.681 11.606 87.429 39.146 87.429 87.429s-50.556 87.429-112.937 87.429H87.429c-12.065 0-21.857 9.792-21.857 21.857-.001 12.065 9.791 21.857 21.857 21.857m218.615 131.143H131.143c-12.065 0-21.857 9.792-21.857 21.856s9.792 21.857 21.857 21.857H306c24.152 0 43.714 19.562 43.714 43.714S330.152 546.428 306 546.428v43.714c48.282 0 87.429-39.146 87.429-87.429 0-48.259-39.124-87.405-87.385-87.427m174.813-87.429h-459C9.792 327.857 0 337.649 0 349.714s9.792 21.857 21.857 21.857H455.35c62.381 0 112.937 39.146 112.937 87.429s-37.354 87.429-131.144 87.429v43.714h43.715C553.292 590.143 612 531.435 612 459s-58.708-131.143-131.143-131.143" />
    </svg>
);
const ForwardRef = forwardRef(SvgWindsWeatherSymbol);
export default ForwardRef;
