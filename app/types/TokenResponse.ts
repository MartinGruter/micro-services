export type TokenResponse = {
    accessToken: string,
    expiresIn: number,
    subject: string,
    roles: string[]
}