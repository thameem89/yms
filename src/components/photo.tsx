import Image from "next/image";
import { mediaPath, type MediaKey } from "@/lib/media";

export function Photo({ image, alt, sizes, preload = false, className }: { image: MediaKey; alt: string; sizes: string; preload?: boolean; className?: string }) {
  return <Image src={mediaPath(image)} alt={alt} fill sizes={sizes} loading={preload ? "eager" : "lazy"} fetchPriority={preload ? "high" : undefined} quality={75} className={className} />;
}
