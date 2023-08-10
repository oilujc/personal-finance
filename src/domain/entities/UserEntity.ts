export default class UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(id: string,
        firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }


    static fromObject(json: any): UserEntity {
        return new UserEntity(
            json.id,
            json.firstName,
            json.lastName,
            json.email
        );
    }

}
