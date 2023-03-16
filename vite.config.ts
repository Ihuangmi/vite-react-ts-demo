import path from "path";
import { ConfigEnv, loadEnv, UserConfig } from "vite";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const { VITE_PUBLIC_PATH } = env;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    envPrefix: "VITE_",
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "./src") },
        {
          find: "config",
          replacement: path.resolve(__dirname, "./config"),
        },
        {
          find: /^~/,
          replacement: `${path.resolve(__dirname, "./node_modules")}/`,
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: '127.0.0.1',
      port: 8888,
      open: true
    }
  };
};
