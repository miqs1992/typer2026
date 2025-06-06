export interface CreateUserDto {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
}