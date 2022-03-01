import { formatInTimeZone } from "date-fns-tz";
import { getRepository, Repository } from "typeorm";

import { Videos } from "../../entities/Videos";
import {
  IListParams,
  IListReturnData,
  IVideosRepository,
} from "../IVideosRepository";
import { ICreateVideoDTO } from "./ICreateVideoDTO";

class VideosRepository implements IVideosRepository {
  private ormRepository: Repository<Videos>;

  constructor() {
    this.ormRepository = getRepository(Videos);
  }
  async create({
    name,
    description,
    duration,
    category_id,
  }: ICreateVideoDTO): Promise<Videos> {
    const video = this.ormRepository.create({
      name,
      description,
      duration,
      category_id,
    });
    await this.ormRepository.save(video);
    return video;
  }
  async findById(id: string): Promise<Videos> {
    const video = await this.ormRepository.findOne({ where: { id } });
    return video;
  }

  async list(params?: IListParams): Promise<IListReturnData> {
    const queryBuilder = this.ormRepository
      .createQueryBuilder("videos")
      .leftJoinAndSelect("videos.category", "category")
      .orderBy("videos.name", "DESC");

    if (params) {
      if (params.name) {
        queryBuilder.andWhere("videos.name ILIKE :name", {
          name: `%${params.name}%`,
        });
      }
      if (params.initial_date) {
        const initialDate = formatInTimeZone(
          params.initial_date,
          "UTC",
          "yyyy-MM-dd"
        );

        queryBuilder.andWhere("videos.created_at >= :initial_date", {
          initial_date: initialDate,
        });
      }

      if (params.final_date) {
        const finalDate = formatInTimeZone(
          params.final_date,
          "UTC",
          "yyyy-MM-dd'T'23:59:59"
        );

        queryBuilder.andWhere("videos.created_at <= :final_date", {
          final_date: finalDate,
        });
      }
    }
    const total = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();
    return { total, data };
  }
}
export { VideosRepository };
