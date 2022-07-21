export default interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  gender: string;
  type: string;
  password: string;
  passwordConfirm: string | undefined;
  dob: string;
  passwordResetTokenExpires: Date;
  passwordChangedAt: Date;
  passwordResetToken: string;
  active: Boolean;
}
