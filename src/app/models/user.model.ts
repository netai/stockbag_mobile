export interface User {
    token: string
    user: {
        admin: boolean,
        mobile: string,
        name: string,
        username: string
    }
}