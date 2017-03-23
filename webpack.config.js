var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// 打包入口文件
	entry: ['webpack-hot-middleware/client', './client/js/index.js'],
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	// 按照模板生成html用于被插入bundle.js，自动引入bundle.js
	plugins: [
	    new HtmlWebpackPlugin({
	      title: 'pic fight',
	      template: 'client/index.html',
	      // 是否插入script等标签
    	  inject: true,
	    }),
	    // new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin()
	],
	// 模块配置
	module: {
		// 配置加载器
		loaders: [
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.css$/, loader: ['style-loader', 'css-loader']},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
                    loader: 'babel-loader',
                    // todo 环境变量设置
        			// options: {
          	// 			presets: ['env']
        			}
      		},
		]
	},
	// 防止打包vue报错，error: You are using the runtime-only build of Vue where the template compiler is not available. 
	resolve: {
	    alias: {
	        vue: 'vue/dist/vue.js'
	    }
	}
}