export interface RegisterDto {
  uniqueId: string;
  fingerHex: string;
}

export interface IdentifyUserDto {
  fingerHex: string;
}
