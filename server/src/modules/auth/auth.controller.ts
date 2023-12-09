import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/response.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './dto/req-user.dto';
import { RefreshJwtAuthGuard } from './refresh-jwt-auth.guard';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: AuthResponseDto })
  @UsePipes(new ValidationPipe())
  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiResponse({ status: 200, type: AuthResponseDto })
  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @ApiResponse({ status: 200, type: AuthResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('auth-data')
  authData(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.authService.authData(user);
  }

  @ApiResponse({ status: 200, type: AuthResponseDto })
  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh-auth-data')
  refreshAuthData(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.authService.authData(user);
  }
}
