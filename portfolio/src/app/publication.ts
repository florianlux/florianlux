/** Server/build configuration. Preview stays unindexed until every release check is evidenced. */
export const isPublicRelease = process.env.PORTFOLIO_PUBLICATION_MODE === "public";
