import { Prisma } from "@/generated/prisma/client"
import prisma from "@/lib/prisma"
import {
  CreateManyEntityDto,
  UpdateManyEntityDto,
} from "@/types/dto/many-entity.dto"
import { PaginationDto } from "@/types/dto/pagination.dto"
import { createPaginationMeta } from "@/utils/pagination"

export class ManyEntityService {
  static async create(dto: CreateManyEntityDto) {
    return prisma.manyEntity.create({
      data: {
        name: dto.name,
        filterFieldDate: dto.filterFieldDate,
        users: {
          connect: dto.userIds.map((id) => ({ id })),
        },
      },
      include: {
        users: true,
      },
    })
  }

  static async findAll(query: PaginationDto) {
    const { page, limit } = query

    const skip = (page - 1) * limit

    const where: Prisma.ManyEntityWhereInput = {}

    if (typeof query.search === "string") {
      where.name = {
        contains: query.search,
        mode: "insensitive",
      }
    }

    if (typeof query.after === "string" || typeof query.before === "string") {
      const dateFilter: Prisma.DateTimeFilter = {}

      if (typeof query.after === "string") {
        dateFilter.gte = new Date(query.after)
      }

      if (typeof query.before === "string") {
        dateFilter.lte = new Date(query.before)
      }

      where.createdAt = dateFilter
    }

    const finalWhere = Object.keys(where).length > 0 ? where : undefined

    const [items, total] = await Promise.all([
      prisma.manyEntity.findMany({
        skip,
        take: limit,
        where: finalWhere,
        include: { users: true },
      }),
      prisma.manyEntity.count({ where: finalWhere }),
    ])

    return {
      items,

      meta: createPaginationMeta(total, page, limit),
    }
  }

  static async findById(id: number) {
    return prisma.manyEntity.findUnique({
      where: { id },
      include: {
        users: true,
      },
    })
  }

  static async update(id: number, dto: UpdateManyEntityDto) {
    return prisma.manyEntity.update({
      where: { id },

      data: {
        ...(dto.name && {
          name: dto.name,
        }),

        ...(dto.filterFieldDate && {
          filterFieldDate: dto.filterFieldDate,
        }),

        ...(dto.userIds && {
          users: {
            set: dto.userIds.map((id) => ({ id })),
          },
        }),
      },

      include: {
        users: true,
      },
    })
  }

  static async delete(id: number) {
    return prisma.manyEntity.delete({
      where: { id },
    })
  }
}
