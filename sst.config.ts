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
    const vapid_public_key = new sst.Secret("NEXT_PUBLIC_VAPID_PUBLIC_KEY");
    const vapid_private_key = new sst.Secret("VAPID_PRIVATE_KEY");

    const cron_reminder = new sst.aws.Cron("CronReminder", {
      schedule: "cron(0 14 * * ? *)", // 2:00 PM UTC
      function: {
        handler: "lambda/cron.handler",
        environment: {
          NEXT_PUBLIC_VAPID_PUBLIC_KEY: vapid_public_key.value,
          VAPID_PRIVATE_KEY: vapid_private_key.value,
        }
      },
    })


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
