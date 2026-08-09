import Image from "next/image";
import {
  brandAssetDimensions,
  brandAssets,
  type BrandAssetKey,
} from "@/lib/brand-assets";

const LOGO_ALT = "Victory Outreach Antioch";

interface BrandLogoProps {
  asset: BrandAssetKey;
  className?: string;
  priority?: boolean;
}

/** Renders an official VOA logo asset without stretching or recoloring. */
export function BrandLogo({
  asset,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const { width, height } = brandAssetDimensions[asset];

  return (
    <Image
      src={brandAssets[asset]}
      alt={LOGO_ALT}
      width={width}
      height={height}
      priority={priority}
      className={`object-contain object-left ${className}`}
    />
  );
}

/** Desktop sidebar — primary logo + product designation. */
export function BrandSidebarBranding({ priority = false }: { priority?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center">
      <BrandLogo
        asset="primary"
        priority={priority}
        className="h-auto w-full max-w-[11.5rem] object-contain object-center sm:max-w-[13rem] lg:max-w-[14.5rem]"
      />
      <p className="mt-2 text-[10px] font-light uppercase tracking-[0.38em] text-white/50">
        Production OS
      </p>
    </div>
  );
}

/** Top bar — circle logo immediately left of search. */
export function BrandCircleMark({ className = "" }: { className?: string }) {
  return (
    <BrandLogo
      asset="circle"
      className={`h-12 w-12 shrink-0 object-contain sm:h-[52px] sm:w-[52px] lg:h-[60px] lg:w-[60px] ${className}`}
    />
  );
}
