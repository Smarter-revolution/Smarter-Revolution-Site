declare module "@vercel/kv" {
  type KVClient = {
    incr: (key: string) => Promise<number>;
    expire: (key: string, seconds: number) => Promise<number>;
    get: (key: string) => Promise<string | null>;
  };

  export const kv: KVClient;
}
