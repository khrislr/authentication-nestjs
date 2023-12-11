import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import * as bycrypt from 'bcrypt';
import { SignInDTO } from './dto/signin.dto';
import { changePasswordDTO } from './dto/changePass.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaClient: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignUpDTO) {
    const saltRound = 10;
    const encryptedPassword = await bycrypt.hash(data.user.password, saltRound);

    const clientResponse = await this.prismaClient.client.create({
      data: data.client,
    });

    if (clientResponse) {
      const userResponse = await this.prismaClient.user.create({
        data: {
          username: clientResponse.email,
          password: encryptedPassword,
          clientId: clientResponse.id,
        },
      });
      return clientResponse;
    } else {
      return null;
    }
  }

  async signin(data: SignInDTO): Promise<any> {
    const response = await this.prismaClient.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (response) {
      const isMatch = await bycrypt.compare(data.password, response.password);
      if (isMatch) {
        const payload = { username: response.username };
        const access_token = await this.jwtService.signAsync(payload);
        const user = await this.prismaClient.user.findFirst({
          where: {
            id: response.id,
          },
        });
        return {
          ...user,
          token: access_token,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async findUsers() {
    const response = await this.prismaClient.user.findMany();
    if (response) {
      return response;
    } else {
      return null;
    }
  }

  async changePassword(id: number, data: changePasswordDTO) {
    const saltRound = 10;
    const encryptedPassword = await bycrypt.hash(data.password, saltRound)
    const response = await this.prismaClient.user.update({
      where: { id },
      data:{
        password: encryptedPassword
      },
    });

    if (response) {
      return response;
    } else {
      return null;
    }
  }
}
