import { formatInTimeZone } from "date-fns-tz";
import { getRepository, Repository } from "typeorm";

import { Categories } from "../../entities/Categories";
import {
  ICategoriesRepository,
  IListAllParams,
  IListReturnData,
} from "../ICategoriesRepository";
import { ICreateCategoryDTO } from "./ICreateCategoryDTO";

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Categories>;

  constructor() {
    this.ormRepository = getRepository(Categories);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Categories> {
    const category = this.ormRepository.create({ name, description });
    await this.ormRepository.save(category);
    return category;
  }

  async findById(id: string): Promise<Categories> {
    const category = await this.ormRepository.findOne(id, {
      relations: ["videos"],
    });
    return category;
  }

  async findByName(name: string): Promise<Categories> {
    const category = await this.ormRepository.findOne(
      { name },
      { relations: ["videos"] }
    );
    return category;
  }

  async save(category: Categories): Promise<Categories> {
    const categoryCreated = await this.ormRepository.save(category);
    return categoryCreated;
  }

  async list(params?: IListAllParams): Promise<IListReturnData> {
    const queryBuilder = this.ormRepository
      .createQueryBuilder("categories")
      .leftJoinAndSelect("categories.videos", "videos")
      .orderBy("categories.name", "DESC");

    if (params) {
      if (params.name) {
        queryBuilder.andWhere("categories.name ILIKE :name", {
          name: `%${params.name}%`,
        });
      }
      if (params.initial_date) {
        const initialDate = formatInTimeZone(
          params.initial_date,
          "UTC",
          "yyyy-MM-dd"
        );

        queryBuilder.andWhere("categories.created_at >= :initial_date", {
          initial_date: initialDate,
        });
      }

      if (params.final_date) {
        const finalDate = formatInTimeZone(
          params.final_date,
          "UTC",
          "yyyy-MM-dd'T'23:59:59"
        );

        queryBuilder.andWhere("categories.created_at <= :final_date", {
          final_date: finalDate,
        });
      }
    }
    const total = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();
    return { total, data };
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { CategoriesRepository };
