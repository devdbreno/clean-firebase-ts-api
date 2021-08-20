import './core/config/module-alias.config'

import { MemoryStorage } from '@/infra/storage/memory'
import { UserGatewayDTO, UserMemoryGateway } from '@/adapters/gateways/user'

const userMemoryStorage = new MemoryStorage<UserGatewayDTO>('users')
const userMemoryGateway = new UserMemoryGateway(userMemoryStorage)

async function bootstrap() {
  const [me, makoto] = await Promise.all([
    await userMemoryGateway.create({
      name: 'Deivid Breno',
      email: 'dbrenoti@gmail.com',
      password: 'vitoria123@',
      telephone: '71996398901'
    }),

    await userMemoryGateway.create({
      name: 'Makoto Edamura',
      email: 'makotoswindler@gmail.com',
      password: 'iloveyouabbie',
      telephone: '123456789'
    })
  ])

  const allUsersData = await userMemoryGateway.find()

  const getMeById = await userMemoryGateway.findById(me.id)
  const getMakotoById = await userMemoryGateway.findById(makoto.id)

  console.log(getMeById)
  console.log(getMakotoById)

  console.log(allUsersData)
}

bootstrap()
