import { inject, injectable } from "tsyringe";

import {
  IListReturnData,
  IVideosRepository,
} from "../../repositories/IVideosRepository";

export interface IRequest {
  name: string;
  initial_date: Date;
  final_date: Date;
}
@injectable()
class ListVideosUseCase {
  constructor(
    @inject("VideosRepository")
    private videosRepository: IVideosRepository
  ) {}
  async execute(params: IRequest): Promise<IListReturnData> {
    const { total, data } = await this.videosRepository.list(params);
    return { total, data };
  }
}
export { ListVideosUseCase };
