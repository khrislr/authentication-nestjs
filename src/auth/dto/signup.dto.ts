import { Prisma } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

class UserDTO{
  @IsString()
  @IsNotEmpty()
  password: string
}

export class SignUpDTO{
  client: Prisma.ClientCreateInput
  user: UserDTO
}
