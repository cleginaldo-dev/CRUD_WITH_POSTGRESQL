import { Videos } from "../entities/Videos";
import { ICreateVideoDTO } from "./implementations/ICreateVideoDTO";

export interface IListParams {
  name: string;
  initial_date: Date;
  final_date: Date;
}

export interface IListReturnData {
  total: number;
  data: Videos[];
}

interface IVideosRepository {
  create({
    name,
    description,
    duration,
    category_id,
  }: ICreateVideoDTO): Promise<Videos>;
  findById(id: string): Promise<Videos>;
  // save(video: Videos): Promise<Videos>;
  list(params?: IListParams): Promise<IListReturnData>;
  // delete(id: string): Promise<void>;
}
export { IVideosRepository };
