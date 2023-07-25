export default class PermissionEntity {
    id: string;
    key: string;

    isDefault: boolean;

    constructor(id: string, key: string, isDefault = false) {
        this.id = id;
        this.key = key;

        this.isDefault = isDefault;
    }
}

