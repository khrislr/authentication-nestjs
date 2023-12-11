import { IsNotEmpty, IsString } from "class-validator";

export class changePasswordDTO {
  @IsString()
  @IsNotEmpty()
  password: string;
}
