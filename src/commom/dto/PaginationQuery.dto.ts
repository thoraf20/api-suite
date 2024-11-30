/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryParams {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  limit?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Type(() => String)
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Type(() => String)
  @IsString()
  filter?: string | any;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

