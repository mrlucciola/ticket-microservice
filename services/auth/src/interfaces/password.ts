import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  /**
   * 1. Generate salt
   * 1. Hash password with salt
   * 1. Return string
   */
  static async toHash(pwdToHash: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(pwdToHash, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }
  static async compare(pwdStored: string, pwdToCompare: string) {
    const [pwdHashed, salt] = pwdStored.split(".");
    const buffer = (await scryptAsync(pwdToCompare, salt, 64)) as Buffer;

    return buffer.toString("hex") === pwdHashed;
  }
}
