import { BigIntType, PrimaryKey, Property } from '@mikro-orm/core';

export class NativeBigIntType extends BigIntType {
  convertToJSValue(value: any): any {
    if (!value) {
      return value;
    }

    return BigInt(value);
  }
}

export abstract class CustomBaseEntity {
  @PrimaryKey()
  id: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
