module.exports = {
  apps: [
    {
      name: "yantrix-web",
      cwd: "/home/USERNAME/apps/web",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "yantrix-admin",
      cwd: "/home/USERNAME/apps/admin",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
    {
      name: "yantrix-api",
      cwd: "/home/USERNAME/apps/api",
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        // Public origin embedded in stored file URLs (e.g. uploaded media).
        // Must match the domain the API is actually reachable at.
        API_URL: "https://api.yantrixlab.com",
      },
    },
  ],
};
