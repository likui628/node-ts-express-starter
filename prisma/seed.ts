import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function generatePassword() {
  const upper = faker.string.alpha({ length: 1, casing: 'upper' })
  const lower = faker.string.alpha({ length: 1, casing: 'lower' })
  const number = faker.string.numeric()
  const special = faker.helpers.arrayElement([
    '@',
    '$',
    '!',
    '%',
    '*',
    '?',
    '&',
  ])
  const remaining = faker.string.alphanumeric(4)

  const hashedPwd = await bcrypt.hash(
    `${upper}${lower}${number}${special}${remaining}`,
    10,
  )
  return hashedPwd
}

async function main() {
  console.log(`Start seeding ...`)

  const users = await Promise.all(
    Array.from({ length: 100 }).map(async () => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: await generatePassword(),
      role: faker.helpers.arrayElement(['ADMIN', 'USER']),
      isVerified: faker.datatype.boolean(0.8),
    })),
  )

  await prisma.user.createMany({ data: users })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
