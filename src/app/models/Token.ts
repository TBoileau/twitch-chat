export interface Token {
  access_token: string;
  refresh_token: string;
  expires_in: bigint;
  scopes: string[];
  token_type: string;
}
