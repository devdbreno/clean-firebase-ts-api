import { MemoryStorage } from '@/infra/storage/memory'
import { IUserGateway, UserGatewayDTO, ICreateUserGatewayInput } from '@/adapters/gateways/user'

type UserWithoutPassword = Promise<Omit<UserGatewayDTO, 'password'>>

export class UserMemoryGateway implements IUserGateway {
  constructor(private readonly usersStorage: MemoryStorage<UserGatewayDTO>) {}

  public async findById(userId: string): UserWithoutPassword {
    const { id, name, email, telephone } = await this.usersStorage.findById(userId)

    return { id, name, email, telephone }
  }

  public async find(): Promise<Partial<UserGatewayDTO>[]> {
    return (await this.usersStorage.find()).map(({ id, name, email, telephone }) => ({ id, name, email, telephone }))
  }

  public async create(input: ICreateUserGatewayInput): UserWithoutPassword {
    const { id, name, email, telephone } = await this.usersStorage.add(input)

    return { id, name, email, telephone }
  }
}
