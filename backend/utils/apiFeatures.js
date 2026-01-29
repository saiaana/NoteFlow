class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  async paginate() {
    const notesPerPage = 3;
    const limit = this.queryString.limit * 1 || notesPerPage;
    const cursor = this.queryString.cursor;
    const sortOrder = this.queryString.sort === "desc" ? 1 : -1;

    let filter = {};

    if (cursor) {
      filter =
        sortOrder === -1
          ? { createdAt: { $lt: cursor } }
          : { createdAt: { $gt: cursor } };
    }

    const docs = await this.query
      .find(filter)
      .sort({ createdAt: sortOrder })
      .limit(limit + 1);

    const hasMore = docs.length > limit;

    const paginatedDocs = hasMore ? docs.slice(0, limit) : docs;

    const nextCursor = hasMore
      ? paginatedDocs[paginatedDocs.length - 1].createdAt
      : null;

    return { data: paginatedDocs, hasMore, nextCursor };
  }
}

module.exports = APIFeatures;
