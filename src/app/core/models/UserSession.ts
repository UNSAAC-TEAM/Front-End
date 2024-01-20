export interface UserSession{
  sessionToken: string|null,
  name: string|null,
  lastName: string|null,
  imageUrl: string|null,
  alias: string|null,
  isLogged: boolean,
  roll: string|null
}
