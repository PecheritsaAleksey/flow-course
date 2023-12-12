import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

import { User } from '../users/schemas/user.schema';
import { AuthResponseDto } from './dto/response.dto';
import { AuthTokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateTokens(user);
    return {
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      ...tokens,
    };
  }

  async register(userDto: CreateUserDto): Promise<AuthResponseDto> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    const tokens = await this.generateTokens(user);
    return {
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      ...tokens,
    };
  }

  async authData(user: User): Promise<AuthResponseDto> {
    const tokens = await this.generateTokens(user);
    return {
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      ...tokens,
    };
  }

  private async generateTokens(user: User): Promise<AuthTokensDto> {
    const payload = {
      email: user.email,
      _id: user._id,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    console.log(payload);

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_ACCESS_KEY,
        expiresIn: '24h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_REFRESH_KEY,
        expiresIn: '30d',
      }),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }
}
