declare namespace NodeJS {
  export interface ProcessEnv {
    MONGODB_URI: string;
    DB_NAME: string;
    LIARA_BUCKET_NAME: string;
    LIARA_ENDPOINT: string;
    LIARA_ACCESS_KEY: string;
    LIARA_SECRET_KEY: string;
    SESSION: string;
    API_ID: number;
    API_HASH: string
  }
}
