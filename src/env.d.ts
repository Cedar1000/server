declare global {
  namespace NodeJs {
    interface ProcessEnv {
      DATABASE_LOCAL: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
