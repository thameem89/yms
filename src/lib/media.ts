import type manifest from "@/data/media.json";

export type MediaKey = keyof typeof manifest;
export const mediaPath = (image: MediaKey) => "/media/" + image + ".webp";
