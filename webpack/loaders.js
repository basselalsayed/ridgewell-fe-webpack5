const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const isProd = process.env.NODE_ENV === 'production';

const cssRegex = /\.(sa|sc|c)ss$/;
const cssModuleRegex = /\.module.(sa|sc|c)ss$/;
const cssModuleOptions = {
  exportLocalsConvention: 'camelCaseOnly',
  ...(isProd
    ? { localIdentName: '[contenthash:base64:8]' }
    : { getLocalIdent: getCSSModuleLocalIdent }),
};
const babelLoaderClient = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: process.env.NODE_ENV === 'production',
        compact: process.env.NODE_ENV === 'production',
        ...(!isProd && {
          plugins: ['react-refresh/babel'],
        }),
      },
    },
  ],
};
const babelLoaderServer = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: process.env.NODE_ENV === 'production',
        compact: process.env.NODE_ENV === 'production',
      },
    },
  ],
};

// images
const assetResourceLoader = {
  test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
  type: 'asset/resource',
};

// Fonts and SVGs
const assetInlineLoader = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
  type: 'asset/inline',
};

const cssLoader = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    !isProd && require.resolve('css-hot-loader'),
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        modules: false,
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isProd,
        importLoaders: 2,
        modules: false,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProd,
      },

      // ...(isProd
      //   ? {
      //       options: {
      //         sourceMap: true,
      //       },
      //     }
      //   : {}),
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProd,
      },

      // ...(isProd
      //   ? {
      //       options: {
      //         sourceMap: true,
      //       },
      //     }
      //   : {}),
    },
  ],
  sideEffects: true,
};

const cssModuleLoaderClient = {
  test: cssRegex,
  // exclude: cssRegex,
  use: [
    !isProd && require.resolve('css-hot-loader'),
    {
      loader: MiniCssExtractPlugin.loader,
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
          ...cssModuleOptions,
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProd,
      },

      // ...(isProd
      //   ? {
      //       options: {
      //         sourceMap: true,
      //       },
      //     }
      //   : {}),
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProd,
      },

      // ...(isProd
      //   ? {
      //       options: {
      //         sourceMap: true,
      //       },
      //     }
      //   : {}),
    },
  ].filter(Boolean),
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isProd,
        importLoaders: 2,
        esModule: true,
        modules: {
          auto: true,
          namedExport: true,
          ...cssModuleOptions,
          exportOnlyLocals: true,
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProd,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProd,
      },
    },
  ],
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isProd,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProd,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProd,
      },
    },
  ],
};

module.exports = {
  client: [
    {
      oneOf: [
        babelLoaderClient,
        assetResourceLoader,
        assetInlineLoader,
        // cssLoader,
        cssModuleLoaderClient,
      ],
    },
  ],
  server: [
    {
      oneOf: [
        babelLoaderServer,
        assetResourceLoader,
        assetInlineLoader,
        cssLoaderServer,
        cssModuleLoaderServer,
      ],
    },
  ],
};
