import prisma from "@/lib/prisma"
import {
  CreateManyFilterDto,
  UpdateManyFilterDto,
} from "@/types/dto/many-filter.dto"

export class ManyFilterService {
  static async create(dto: CreateManyFilterDto) {
    return prisma.manyFilter.create({
      data: dto,
    })
  }

  static async findAll() {
    return prisma.manyFilter.findMany({})
  }

  static async findById(id: number) {
    return prisma.manyFilter.findUnique({
      where: { id },
    })
  }

  static async update(id: number, dto: UpdateManyFilterDto) {
    return prisma.manyFilter.update({
      where: { id },

      data: dto,
    })
  }

  static async delete(id: number) {
    return prisma.manyFilter.delete({
      where: { id },
    })
  }
}
