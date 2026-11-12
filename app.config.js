module.exports = ({ config }) => {
  if (process.env.APP_VARIANT !== 'test') return config;
  return {
    ...config,
    name: 'QualiBoom Test',
    android: {
      ...config.android,
      package: 'ca.qualiverifie.app.test',
    },
  };
};
