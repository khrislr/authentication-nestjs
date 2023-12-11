import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async readClients() {
    return this.clientsService.readClients();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async readOneClient(@Param('id', ParseIntPipe) id: number) {
    const response = await this.clientsService.readOneCLient(id);

    if (response) {
      return response;
    } else {
      throw new HttpException("Can't find client", HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Prisma.ClientUpdateInput,
  ) {
    const response = await this.clientsService.updateClient(id, body);
    if (response) {
      return 'Client updated'
    } else {
      return null;
    }
  }

  @Delete(':id')
  async deleteClient(@Param('id', ParseIntPipe) id: number) {
    const response = await this.clientsService.deleteClient(id);

    if (response) {
      return 'Client deleted';
    } else {
      throw new HttpException(
        "Can't delete client",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
