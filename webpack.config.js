const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /.(sass|css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /.(png|jpe?g|gif|svg|webp)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "./public/icons/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ESLintPlugin({
            extensions: ["ts", "tsx", "js"],
            context: path.resolve(dirname, "src"),
            cache: true,
            emitWarning: true,
            failOnError: false
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "public")
        },
        compress: true,
        port: 3002
    }
};
