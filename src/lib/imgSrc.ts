import type { StaticImageData } from "next/image"

export function imgSrc(img: StaticImageData | string): string {
  return typeof img === "object" && img !== null ? img.src : img
}
