import { users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(nip: string, password: string): Promise<any> {
        const user = await this.userService.findOne(nip)

        const isValidPassword = await verify(user.password, password)

        if (user && isValidPassword) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(user: any) {
        const payload = { nip: user.nomorInduk, role: user.role, id: user.id, name: user.name, email: user.email,  sub: user.id };
        return this.jwtService.sign(payload)
    }
}
