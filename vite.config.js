import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: '/obstacle-game-js/',
    root: resolve(__dirname, 'src/client'),
    plugins: [
        tailwindcss(),
    ],

    build: {
        rollupOptions: {
            outDir: resolve(__dirname, 'client/dist'),
            emptyOutDir: true,
            /*
            input: {
                // clé “single” sert le index.html à la racine
                single: resolve(__dirname, 'src/client/index.html'),
                // clé “multi” sert ton index.html de multiplayer
                multi:  resolve(__dirname, 'src/client/multiplayer/index.html')
            }*/
        }
    }
});
