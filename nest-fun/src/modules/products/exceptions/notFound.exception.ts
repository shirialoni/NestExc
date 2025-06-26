import { NotFoundException } from '@nestjs/common';

export class NotFoundProductException extends NotFoundException {
  constructor(exceptionMsg: string) {
    super(exceptionMsg);
  }
}
