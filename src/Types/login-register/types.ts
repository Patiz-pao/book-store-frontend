export interface LoginResponse {
  data: {
    token: string;
    role: string;
    username: string;
  };
}

export interface RegisterResponse {
  customerId: string;
  username: string;
  password: string;
  role: string;
}
