export type LocationResponse = {
  lat: number;
  lon: number;
};

export interface RegionPayload {
  lat: number;
  lon: number;
}

export interface RegionResponse {
  id: string;
  sggnm: string;
  sidonm: string;
}

export interface OutfitPayload {
  lat: number;
  lon: number;
  eventType: number;
  gender: string;
}

export interface fileResponse {
  fileId: string;
  originalFilename: string;
  contentType: string;
  fileMetadata: string;
  size: number;
  presignedUrl: string;
  uploadedAt: Date;
}

export interface OutfitResponse {
  id: string;
  eventType: string;
  temperatureRange: string;
  fileMetadata: fileResponse[];
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface CategoryResponse {
  content: Category[];
}
