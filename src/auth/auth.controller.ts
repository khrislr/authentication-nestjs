import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { Prisma } from '@prisma/client';
import { changePasswordDTO } from './dto/changePass.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDTO) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SignInDTO, @Res() res) {
    const response = await this.authService.signin(signinDto);

    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        data: response,
        message: 'You have Logged in!',
      });
    } else {
      throw new HttpException('Error, try again', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async findUsers() {
    return await this.authService.findUsers();
  }

  @Put(':id')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: changePasswordDTO,
  ) {
    const response = await this.authService.changePassword(id, body);

    if (response) {
      return 'Password Changed';
    } else {
      return null;
    }
  }
}
