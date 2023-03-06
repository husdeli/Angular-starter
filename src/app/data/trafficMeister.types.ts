export interface VehicleDto {
  id: number;
  type: string;
  brand: string;
  colors: string[];
  img: string;
}

export type FetchDataDto = VehicleDto[];
