export interface User {
  name_user: string;
  email_user: string;
  password_user: string;
  type_user: 'COMPANY' | 'CLIENT' | 'ADMIN';
  cif_user: string | null;
}
