
async function handler() {
    const payload = JSON.stringify({
        title: "Peringatan",
        body: "Mari kita lengkapi checklist sunnah Ramadan kita untuk hari ini",
        data: {
            url: "https://ramadhan.programmingmy.com",
            id: "1",
        }
    })

    // create authorization header
    const authHeader = process.env.CRON_AUTH_TOKEN;

    try {
        const response = await fetch("https://ramadhan.programmingmy.com/api/notifications/send", {
            method: "POST",
            body: JSON.stringify({ message: payload }),
            headers: {
                "Authorization": `Bearer ${authHeader}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to send notifications");
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Notifications sent successfully" })
        }

    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error sending notifications" })
        }
    }
}

export { handler };
