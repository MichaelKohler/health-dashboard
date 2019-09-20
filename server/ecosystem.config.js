module.exports = {
  apps: [{
    name: "health-dashboard",
    script: "./server/index.js",
    env: {
      NODE_ENV: "production",
      DEBUG: "health:*",
    },
  }],
};
