const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
	mode: "development",
	entry: ["./src/Master.tsx"],
	devtool: "source-map",
	output: {
        pathinfo: true,
		filename: 'bundle.js',
		path: path.resolve (__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			}
		],
	},
	resolve: {
		modules: [
			path.resolve(__dirname, "src"),
			path.resolve(__dirname, "node_modules"),
		],
		extensions: ['.tsx', '.ts', '.js']
	},
	devtool: 'source-map',
	devServer: {
		static: path.join(__dirname, 'dist'),
		open: false,
		compress: false,
		port: 9000,
		client: {
			overlay: true // Optional: Displays errors in the browser
		}
	},
	plugins: [

		new HtmlWebpackPlugin ({
			template: './index.html',
		}),

		new CopyPlugin ({
			patterns: [
				{ from: "*.min.css", to: "Styles", context: "Public/Styles" },
				{ from: "*", to: "Images", context: "Public/Images" }
			]
		})
	],
};