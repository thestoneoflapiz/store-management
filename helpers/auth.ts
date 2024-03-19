import { compare, hash } from "bcryptjs";

export async function hashPassword(password: string){
  const hashed = await hash(password, 12);
  return hashed;
}

export async function verifyPassword(password: string, userPassword: string){
  const isVerified = await compare(password, userPassword);
  return isVerified;
}

export const adminAccess = [
  "/admin",
  "/admin/expenses",
  "/admin/menu",
  "/admin/sales",
  "/admin/users",
  "/admin/user",
];

export const staffAccess = [
  "/admin",
  "/admin/expenses",
  "/admin/sales",
  "/admin/user",
]