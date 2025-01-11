import * as bcrypt from "bcryptjs"

const SALT_ROUNDS = 10

export async function saltAndHashPassword(password: string) : Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    return bcrypt.hash(password, salt)
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}