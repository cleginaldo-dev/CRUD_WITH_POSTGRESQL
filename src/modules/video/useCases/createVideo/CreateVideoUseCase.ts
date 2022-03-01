import { inject, injectable } from "tsyringe";

import { Videos } from "../../entities/Videos";
import { IVideosRepository } from "../../repositories/IVideosRepository";

interface IRequest {
  name: string;
  description: string;
  duration: number;
  category_id: string;
}
@injectable()
class CreateVideoUseCase {
  constructor(
    @inject("VideosRepository")
    private videosRepository: IVideosRepository
  ) {}
  async execute({
    name,
    duration,
    description,
    category_id,
  }: IRequest): Promise<Videos> {
    const video = this.videosRepository.create({
      name,
      description,
      duration,
      category_id,
    });
    return video;
  }
}
export { CreateVideoUseCase };
