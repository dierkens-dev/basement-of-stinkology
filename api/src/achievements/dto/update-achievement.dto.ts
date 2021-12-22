import { PartialType } from '@nestjs/mapped-types';
import { CreateAchievementDto } from './create-acheivement.dto';

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {}
