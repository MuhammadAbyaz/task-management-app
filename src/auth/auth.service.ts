import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(
      authCredentialsDto.password,
      salt,
    );
    const user = this.userRepository.create({
      username: authCredentialsDto.username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const found = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!found) throw new NotFoundException();
    if (!(await bcrypt.compare(password, found.password)))
      throw new UnauthorizedException();
    const payload: JWTPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken: accessToken };
  }
}
