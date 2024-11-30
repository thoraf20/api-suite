/* eslint-disable prettier/prettier */
interface PageOptions {
  page: number;
  take: number;
  itemCount: number;
}
export class PageMeta {
  readonly currentPage?: number;

  readonly perPage?: number;

  readonly totalCount: number;

  readonly totalPages: number;

  readonly previousPage?: number;

  readonly nextPage?: number;

  constructor(pageOptions: PageOptions) {
    this.currentPage = pageOptions.page;
    this.perPage = pageOptions.take;
    this.totalCount = pageOptions.itemCount;
    this.totalPages = Math.ceil(this.totalCount / (this.perPage || 0));
    this.previousPage =
      pageOptions.page || 0 > 1 ? (pageOptions.page || 0) - 1 : 1;
    this.nextPage =
      (pageOptions.page || 0) < this.totalPages
        ? (pageOptions.page || 0) + 1
        : this.totalPages;
  }
}
