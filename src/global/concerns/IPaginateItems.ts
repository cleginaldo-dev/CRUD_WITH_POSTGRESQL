export default interface IPaginatItems<T> {
  from: number | null;
  to: number | null;
  per_page: number;
  total: number;
  current_page: number;
  prev_page?: number | null;
  next_page?: number | null;
  data: Array<T>;
}
