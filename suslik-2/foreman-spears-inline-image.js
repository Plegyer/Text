/* Lossless inline PNG assembly for the author-provided foreman image.
   Twenty accompanying classic scripts contain the EXACT original Base64 bytes;
   this fallback works from file:// even before a standalone PNG can be committed. */
(function(host){
  'use strict';
  const parts=host.SUSLIK2ForemanImageParts;
  if(!Array.isArray(parts)||parts.length!==20)
    throw new Error('All 20 foreman image chunks must load before the loader');
  const encoded=parts.join('');
  if(encoded.length!==4715968 || !encoded.startsWith('iVBORw0KGgo'))
    throw new Error('Foreman image is incomplete');
  host.SUSLIK2ForemanImageURL='data:image/png;base64,'+encoded;
  delete host.SUSLIK2ForemanImageParts;
})(globalThis);
