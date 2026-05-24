export function assetSrc(asset) {
  return asset && typeof asset === 'object' && 'src' in asset ? asset.src : asset;
}