import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMusicThemeInfoInterfaceSymbolOfMusicalNoteWithTextLines = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 705.797 705.798"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M70.438 70.615H494.13c12.993 0 23.539-10.545 23.539-23.539 0-12.993-10.546-23.538-23.539-23.538H70.438c-12.993 0-23.539 10.545-23.539 23.538s10.545 23.539 23.539 23.539m0 282.461H329.36c12.993 0 23.539-10.544 23.539-23.538s-10.545-23.539-23.539-23.539H70.438c-12.993 0-23.539 10.545-23.539 23.539s10.545 23.538 23.539 23.538m0-141.23H494.13c12.993 0 23.539-10.545 23.539-23.539s-10.546-23.539-23.539-23.539H70.438c-12.993 0-23.539 10.545-23.539 23.539s10.545 23.539 23.539 23.539m141.23 235.384H70.438c-12.993 0-23.539 10.546-23.539 23.539s10.545 23.538 23.539 23.538h141.23c12.994 0 23.539-10.545 23.539-23.538s-10.545-23.539-23.539-23.539M635.361 0c-12.993 0-23.539 10.545-23.539 23.539v385.348c-52.161-39.145-138.147-39.969-214.765 4.261-94.907 54.797-136.994 156.036-97.426 228.087 41.098 74.853 151.353 84.456 246.26 29.659 72.875-42.063 115.314-112.02 112.584-174.468.07-.706.424-1.365.424-2.118V23.539C658.899 10.545 648.354 0 635.361 0" />
    </svg>
);
const ForwardRef = forwardRef(SvgMusicThemeInfoInterfaceSymbolOfMusicalNoteWithTextLines);
export default ForwardRef;
