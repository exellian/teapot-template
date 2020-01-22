const path = require('path');

module.exports = {
	entry: './src/index.ts',
	devtool: 'inline-source-map',
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
		extensions: [ '.ts', '.js' ],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'www'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'www'),
		compress: true,
		port: 4000
	}
};