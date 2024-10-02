import { Role } from '@prisma/client'

const allRoles: Record<Role, string[]> = {
  [Role.USER]: [],
  [Role.ADMIN]: ['getUsers', 'manageUsers'],
}

export const roles = Object.keys(allRoles) as Role[]

export const roleRights = new Map<Role, string[]>(
  Object.entries(allRoles) as [Role, string[]][],
)
