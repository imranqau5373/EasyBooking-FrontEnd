
import { Deserializable } from '@shared/deserializable';

export class RegisterModel implements Deserializable {
    companyName?: string | undefined;
    companyPrivateUrl?: string | undefined;
    contactName?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
    timezone?: string | undefined;
    subscribeNewsLetter?: boolean | undefined;
    packageId:string | undefined;


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
}