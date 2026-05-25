import prisma from "@/lib/prisma"
import { CreateUserItemDto, UpdateUserItemDto } from "@/types/dto/user-item.dto"

export class UserItemService {
  static async create(dto: CreateUserItemDto) {
    return prisma.userItem.create({
      data: {
        name: dto.name,
        user: {
          connect: {
            id: dto.userId,
          },
        },
        ...(dto.filterIds && {
          filters: {
            connect: dto.filterIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        user: true,
      },
    })
  }

  static async findAll(userId: string) {
    return prisma.userItem.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    })
  }

  static async findById(id: number) {
    return prisma.userItem.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })
  }

  static async update(id: number, dto: UpdateUserItemDto) {
    return prisma.userItem.update({
      where: { id },
      data: {
        ...(dto.name && {
          name: dto.name,
        }),

        ...(dto.userId && {
          user: {
            connect: {
              id: dto.userId,
            },
          },
        }),
        ...(dto.filterIds && {
          filters: {
            set: dto.filterIds.map((id) => ({ id })),
          },
        }),
      },

      include: {
        user: true,
      },
    })
  }

  static async delete(id: number) {
    return prisma.userItem.delete({
      where: { id },
    })
  }
}
