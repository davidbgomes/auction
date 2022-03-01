import { CSSProperties, useEffect } from "react";

const GOOGLE_ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;
const ENV = process.env.NEXT_PUBLIC_ENV;

type Props = {
  adSlot: string;
  layout?: string;
  layoutKey?: string;
  adFormat?: string;
  isResponsive?: boolean;
  style?: CSSProperties;
};

export default function GoogleAd({
  adSlot,
  adFormat,
  layout,
  layoutKey,
  isResponsive = false,
  style,
}: Props): JSX.Element {
  useEffect(() => {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", ...style }}
      data-ad-test={ENV === "development" ? "on" : "off"}
      data-ad-layout={layout && layout}
      data-ad-layout-key={layoutKey && layoutKey}
      data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat ? adFormat : "auto"}
      data-full-width-responsive={isResponsive}
    ></ins>
  );
}

declare global {
  interface Window {
    adsbygoogle: any;
  }
}
