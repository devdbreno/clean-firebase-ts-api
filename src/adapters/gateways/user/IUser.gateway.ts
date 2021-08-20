export type UserGatewayDTO = {
  id: string
  name: string
  email: string
  password: string
  telephone: string
}

export type ICreateUserGatewayInput = {
  name: string
  email: string
  password: string
  telephone: string
}

export interface IUserGateway {
  find(): Promise<Partial<UserGatewayDTO>[]>
  create(input: ICreateUserGatewayInput): Promise<Partial<UserGatewayDTO>>
}
