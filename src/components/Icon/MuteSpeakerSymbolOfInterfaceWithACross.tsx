import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgMuteSpeakerSymbolOfInterfaceWithACross = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 612.017 612.017"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M0 224.365v163.287c0 22.554 18.268 40.821 40.822 40.821h61.232v-244.93H40.822C18.268 183.543 0 201.811 0 224.365M285.752 61.078l-142.876 95.258v299.366l142.876 95.237c22.554 0 40.822-18.288 40.822-40.822V101.899c0-22.533-18.267-40.821-40.822-40.821m233.583 244.93 85.174-85.175c9.206-9.205 10.043-23.248 1.919-31.392-8.144-8.144-22.187-7.287-31.392 1.918l-85.175 85.175-85.175-85.175c-9.205-9.206-23.248-10.062-31.392-1.918-8.145 8.144-7.287 22.187 1.918 31.392l85.175 85.175-85.175 85.175c-9.205 9.205-10.062 23.248-1.918 31.392 8.144 8.145 22.187 7.287 31.392-1.918l85.175-85.175 85.175 85.175c9.205 9.185 23.248 10.042 31.392 1.918 8.145-8.144 7.287-22.207-1.919-31.392z" />
    </svg>
);
const ForwardRef = forwardRef(SvgMuteSpeakerSymbolOfInterfaceWithACross);
export default ForwardRef;
