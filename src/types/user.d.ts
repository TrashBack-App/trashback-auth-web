interface UserResponse {
  path: string;
  result: LoginResponse;
  status: boolean;
  statusCode: number;
}

interface LoginResponse {
  refreshToken: string;
  token: string;
  user: {
    fullName: string;
  };
}
