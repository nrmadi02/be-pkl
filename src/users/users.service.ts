import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { users } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.users.findMany({
            select: {
                email: true,
                id: true,
                name: true,
                nomorInduk: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

    async findOne(nip: string) {
        return this.prisma.users.findFirst({
            where: {
                nomorInduk: nip
            }
        })
    } 
}
