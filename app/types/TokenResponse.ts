export type TokenResponse = {
    accessToken: string,
    expiresIn: bigint,
    subject: string,
    roles: string[]
}