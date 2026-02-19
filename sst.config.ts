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
          profile: "hakimtech",
        },
        cloudflare: true
      }
    };
  },
  async run() {
    const db_conn = new sst.Secret("DATABASE_URL");
    const cloudflare_zone = new sst.Secret("CLOUDFLARE_ZONE");
    const cron_auth_token = new sst.Secret("CRON_AUTH_TOKEN");
    const gemini_api = new sst.Secret("GEMINI_API");

    const stage = $app.stage;

    new sst.aws.Cron("CronReminder", {
      schedule: "cron(0 11 * * ? *)", // 11am UTC = 7pm Singapore
      function: {
        handler: "lambda/cron.handler",
        runtime: "nodejs20.x",
        environment: {
          CRON_AUTH_TOKEN: cron_auth_token.value,
          GEMINI_API: gemini_api.value,
        }
      },
    });

    const sunnah_cloudflare_zone = new sst.Secret("SUNNAH_CLOUDFLARE_ZONE");
    new sst.aws.Nextjs("sunnah-garden-next", {
      environment: {
        DATABASE_URL: db_conn.value,
      },
      domain: stage === "production" ? {
        name: "app.sunnahgarden.my",
        dns: sst.cloudflare.dns({
          zone: sunnah_cloudflare_zone.value,
        }),
      } : undefined,
    });
  },
});
