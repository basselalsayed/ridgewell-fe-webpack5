module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV === 'development',
      },
    ],
  ],
  plugins: [
    'lodash',
    '@babel/plugin-proposal-class-properties',
    '@loadable/babel-plugin',
  ],
};
