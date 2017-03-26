var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')

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
	    new webpack.NoErrorsPlugin(),
	    new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           eslint: {
		      // 以更友好的格式输出eslint错误信息
		      formatter: require('eslint-friendly-formatter')
		   },
		    // 非vue文件中的纯样式部分的postcss配置
		    postcss: [
				// 添加浏览器前缀
				autoprefixer({browsers: '> 1%'})
			],
		    // vue-loader配置
			vue: {
				// vue文件中的loader配置
				// loaders: {
					// 使用eslint-loader, babel-loader加载vue文件中的js部分,注意顺序是【右往左】!
					// js: 'babel!eslint'
				// },
				// postcss配置,把vue文件中的样式部分,做后续处理
				postcss: [
					// 添加浏览器前缀
					autoprefixer({browsers: '> 1%'})
				],
				// 不使用默认的autoprefixer
				autoprefixer: false
			},
         }
       })
	],
	// 模块配置
	module: {
		// 配置加载器
		loaders: [
			{
				test: /\.vue$/,
				loader: ['vue-loader', 'eslint-loader']
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
                loader: ['babel-loader', 'eslint-loader'],
      		},
      		{
			    test: /\.styl$/,
			    loader: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
			},
      		// 字体文件加载器，不加会出现如下错误
      		// ERROR in ./~/iview/dist/styles/fonts/ionicons.eot?v=2.0.0
  			// Module parse failed: /Users/sjn/my-own-projects/picFight/node_modules/iview/dist/styles/fonts/ionicons.eot?v=2.0.0 Unexpected character '�' (1:0)
			// You may need an appropriate loader to handle this file type.
      		{
		        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
		        loader: 'file-loader'
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