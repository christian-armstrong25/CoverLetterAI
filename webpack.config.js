const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: "./src/script.js",
	output: {
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.wasm$/,
				type: "webassembly/sync",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	experiments: {
		syncWebAssembly: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			inject: "body",
			filename: "index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
	],
	devServer: {
		static: "./dist",
	},
};
