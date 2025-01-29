import path from 'path';
import { fileURLToPath } from 'url';

// Convert `__dirname` to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "production",
    entry: './src/index.ts',
    output: {
        filename: 'pacman-contribution-graph.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module', // Output as an ES module
        },
    },
    experiments: {
        outputModule: true, // Enable module output
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};