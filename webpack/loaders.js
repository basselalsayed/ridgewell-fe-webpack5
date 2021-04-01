const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = [
  {
    oneOf: [
      // javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            ...(!isProd
              ? {
                  options: {
                    plugins: ['react-refresh/babel'],
                  },
                }
              : {}),
          },
        ],
      },
      // images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        // test: /\.(scss|css)$/,
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
              importLoaders: 2,
              esModule: true,
              modules: {
                auto: true,
                namedExport: true,
              },
            },
          },
          {
            loader: 'postcss-loader',
            ...(isProd
              ? {
                  options: {
                    sourceMap: true,
                  },
                }
              : {}),
          },
          {
            loader: 'sass-loader',
            ...(isProd
              ? {
                  options: {
                    sourceMap: true,
                  },
                }
              : {}),
          },
        ],
      },
    ],
  },
];
