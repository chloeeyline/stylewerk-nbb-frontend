import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const SvgEdit = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}>
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M381.211 100 290 8.783V100z" />
        <path d="M350.419 364.981q-.553.553-1.131 1.074a45 45 0 0 1-11.951 9.113l-74.247 38.891a45.2 45.2 0 0 1-20.875 5.138c-12.024 0-23.327-4.682-31.826-13.183a45.1 45.1 0 0 1-9.538-14.015H85c-8.284 0-15-6.716-15-15s6.716-15 15-15h113.881a45.6 45.6 0 0 1 3.468-8.686L229.227 302H85c-8.284 0-15-6.716-15-15s6.716-15 15-15h160.412l60-60H85c-8.284 0-15-6.716-15-15s6.716-15 15-15h250c.132 0 .26.016.392.02l52.02-52.02H275c-8.284 0-15-6.716-15-15V0H45C20.187 0 0 20.187 0 45v422c0 24.813 20.187 45 45 45h300c24.813 0 45-20.187 45-45V325.4zm149.884-192.31c15.596-15.596 15.596-40.972 0-56.568-7.555-7.555-17.6-11.716-28.284-11.716s-20.729 4.161-28.284 11.716l-14.142 14.142 56.568 56.568z" />
        <path d="M228.922 367.237a15 15 0 0 0 2.681 17.566 14.99 14.99 0 0 0 17.566 2.681l64.477-33.774-50.951-50.951zm52.125-88.49 127.261-127.26 56.56 56.56-127.26 127.26z" />
    </svg>
);
const ForwardRef = forwardRef(SvgEdit);
export default ForwardRef;
