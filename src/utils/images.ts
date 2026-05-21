export function resolveImage(src: string, mediaMap: Record<string, any>): any {
  return mediaMap[src] ?? src;
}
