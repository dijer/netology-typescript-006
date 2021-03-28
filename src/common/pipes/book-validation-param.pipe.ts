import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class BookValidationParamPipe implements PipeTransform {
  transform(value: any, { type }: ArgumentMetadata) {
    const { id } = value;
    if (typeof id !== 'string' && type === 'param') {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
