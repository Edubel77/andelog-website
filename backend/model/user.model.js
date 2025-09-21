export const User = class {
    constructor({ id, name, email, password, created_at, updated_at }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
};
