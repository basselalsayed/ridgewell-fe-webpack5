module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const isTargetWeb = api.caller((caller) => caller && caller.target === 'web');

  const isDev = process.env.NODE_ENV === 'development';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: 'auto',
          useBuiltIns: 'usage',
          corejs: 3.15,
          targets: {
            esmodules: true,
            ...(!isTargetWeb && {
              node: 'current',
            }),
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: isDev,
        },
      ],
    ],
    plugins: [
      'lodash',
      '@babel/plugin-proposal-class-properties',
      '@loadable/babel-plugin',
    ],
  };
};
