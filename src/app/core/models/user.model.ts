export class UserSession {
    constructor(
        public access_token?: string,
        public token_type?: string,
        public expires_in?: number,
        public refresh_token?: string,
        public user?: User
    ) { }

    get token() {
        return this.access_token;

    }
}

export class User {
    constructor(
        public id?: string,
        public username?: string,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public user_role?: string
    ) { }

    getName(): string {
        return `${this.first_name} ${this.last_name}`
    }
}