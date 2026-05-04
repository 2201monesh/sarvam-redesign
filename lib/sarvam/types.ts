export interface TTSRequest {
  text: string;
  target_language_code: string;
  speaker?: string;
  model?: "bulbul:v2" | "bulbul:v3";
  pace?: number;
  speech_sample_rate?: number;
  // bulbul:v2 only
  pitch?: number;
  loudness?: number;
  enable_preprocessing?: boolean;
  // bulbul:v3 only
  temperature?: number;
}

export interface TTSResponse {
  audios: string[];
  request_id?: string;
}
