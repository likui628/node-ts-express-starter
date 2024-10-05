import { Prisma, PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export type ModelNames = Prisma.ModelName

type PrismaOperations<ModelName extends ModelNames> =
  Prisma.TypeMap['model'][ModelName]['operations']

type PrismaFindManyArgs<ModelName extends ModelNames> =
  PrismaOperations<ModelName>['findMany']['args']

type PaginationOptions<ModelName extends ModelNames> = {
  modelName: ModelName
  where?: PrismaFindManyArgs<ModelName>['where']
  orderBy?: PrismaFindManyArgs<ModelName>['orderBy']
  include?: PrismaFindManyArgs<ModelName>['include']
  page?: number
  pageSize?: number
}

export async function paginate<ModelName extends ModelNames>({
  modelName,
  page = 1,
  pageSize = 10,
  where,
  orderBy,
  include,
}: PaginationOptions<ModelName>) {
  // @ts-expect-error suppress type ModelName cannot be used to index type
  const db = prisma[modelName]

  page = Math.max(1, Math.floor(page))
  pageSize = Math.max(1, Math.floor(pageSize))

  const skip = (page - 1) * pageSize

  const [totalCount, items] = await Promise.all([
    db.count({
      where,
    }),
    db.findMany({
      where,
      orderBy,
      include,
      skip,
      take: pageSize,
    }),
  ])

  const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0

  return {
    items,
    totalCount,
    page,
    pageSize,
    totalPages,
  }
}
