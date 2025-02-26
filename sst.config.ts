/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ramadhan-todo-next",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "hakim-tech",
        },
        cloudflare: true
      }
    };
  },
  async run() {
    const db_conn = new sst.Secret("DATABASE_URL");
    const cloudflare_zone = new sst.Secret("CLOUDFLARE_ZONE");

    new sst.aws.Nextjs("ramadhan-todo-next", {
      environment: {
        DATABASE_URL: db_conn.value,
      },
      domain: {
        name: "ramadhan.programmingmy.com",
        dns: sst.cloudflare.dns({
          zone: cloudflare_zone.value,  
        })
      }
    });
  },
});
