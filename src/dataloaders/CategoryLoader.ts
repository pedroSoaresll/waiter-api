import { CategoryInstance, CategoryModel } from '../models/CategoryModel';

export class CategoryLoader {
  static batchCategories(category: CategoryModel, ids: string[]): Promise<CategoryInstance[]> {
    return Promise.resolve<CategoryInstance[]>(
      category.findAll({
        where: {
          id: {
            $in: ids
          }
        }
      })
    );
  }
}
