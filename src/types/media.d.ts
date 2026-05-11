// Override Next.js's StaticImageData image types so all static media imports
// return plain URL strings (same behavior as Vite). This keeps all existing
// <img src={image}> and <video poster={image}> usages working unchanged.
declare module "*.jpg" {
  const src: string
  export default src
}
declare module "*.jpeg" {
  const src: string
  export default src
}
declare module "*.png" {
  const src: string
  export default src
}
declare module "*.gif" {
  const src: string
  export default src
}
declare module "*.svg" {
  const src: string
  export default src
}
declare module "*.JPG" {
  const src: string
  export default src
}
declare module "*.mp4" {
  const src: string
  export default src
}
declare module "*.webm" {
  const src: string
  export default src
}
