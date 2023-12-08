import { Injectable } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}

  async readClients():Promise<Client[] | undefined> {
    const response = await this.prismaService.client.findMany();
    if(response){
      return response
    }else{
      return null
    }
  }

  async readOneCLient(id: number): Promise<Client | undefined>{
    const response = await this.prismaService.client.findFirst({
      where: {
        id,
      },
    });
    if(response){
      return response
    }else{
      return null
    }
  }
  
  async updateClient(id: number, data: Prisma.ClientUpdateInput){
    const response = await this.prismaService.client.update({
        where:{id},
        data,
    })
    if(response){
      return response
    }else{
      return null
    }
  }
  
  async deleteClient(id: number){
    const response = await this.prismaService.client.delete({
        where:{id}
    })
    if(response){
      return true
    }else{
      return false
    }
  }
}
