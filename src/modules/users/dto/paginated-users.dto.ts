import { IsNumberString } from 'class-validator';

export class PaginatedUsersDto {
  @IsNumberString()
  page: number;
  @IsNumberString()
  pageSize: number;
}
