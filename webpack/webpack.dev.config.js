const project = require('./config');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    functional:'./js/site.js',
    design: './scss/site.scss'
  },
  output: {
    filename: '[name].js',
    publicPath: project.compiler_public_path,
    path: project.paths.dist()
  },
  devtool: project.compiler_devtool,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist|js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            cacheDirectory:true
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{loader: 'css-loader', options: { importLoaders: 1, minimize: false }},
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [
          project.paths.base() +  "/images"
        ],
        exclude: [
          project.paths.base() +  "/fonts"
        ],
        use: [
          {loader: 'file-loader',
            options: {
              hashType:'sha512',
              digestType: 'hex',
              name: '[name]-[hash].[ext]', ////[hash].[ext]
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 80
              },
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        include: [
          project.paths.base() +  "/fonts"
        ],
        exclude: [
          project.paths.base() +  "/images"
        ],
        use: [
          {loader: 'file-loader',
            options: {
              hashType:'sha512',
              digestType: 'hex',
              name: '[name]-[hash].[ext]', //[hash].[ext]
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([project.paths.dist(), 'svg'], {
      root:project.paths.base(),
      verbose: false
    }),
    new ExtractTextPlugin({
        filename:'[name].css',
        allChunks: true
        }),
    new ManifestPlugin()
    //new ExtractTextPlugin('[name]-[contenthash].css')
  ]
};
