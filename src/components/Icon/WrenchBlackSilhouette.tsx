import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgWrenchBlackSilhouette = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.001 612.001"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M594.568 110c-10.316 11.56-27.441 26.321-51.988 48.748-26.016 25.953-62.795 25.953-88.81 0-26.015-25.954-26.015-62.672 0-88.626 23.956-23.895 49.705-52.254 49.298-52.355-69.624-32.05-154.723-19.674-212.115 37.595-52.273 52.172-67.197 127.301-45.199 192.807L24.526 468.907c-32.702 32.641-32.702 85.526 0 118.167s85.71 32.641 118.412 0l221.228-220.759c65.629 21.958 140.941 7.075 193.215-45.098 57.31-57.208 69.196-141.797 37.187-211.217" />
    </svg>
);
const ForwardRef = forwardRef(SvgWrenchBlackSilhouette);
export default ForwardRef;
