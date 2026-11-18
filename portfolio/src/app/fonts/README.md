# Local fonts

Instrument Sans Latin (variable) and JetBrains Mono Latin (regular), reused from the existing Next.js font cache. The original application already used these families. Official SIL Open Font License files are included alongside them, retrieved from the Google Fonts repository on 11 October 2026.

`next/font/local` preloads the main typeface. Instrument Sans uses `display: optional` to prevent a slow font swap from delaying the largest text paint. The secondary mono face is not preloaded. Browsers make no Google Fonts requests, and builds do not require font downloads.

Latin subsets cover the site's English and German text. Add an appropriately licensed subset before expanding to other scripts.
