
async function handler() {
    const payload = JSON.stringify({
        title: "Reminder",
        body: "Don't forget to do update your garden",
        data: {
            url: "https://ramadhan.programmingmy.com",
            id: "1",
        }
    })

    try {
        const response = await fetch("https://tunnel.programmingmy.com/api/notifications/send", {
            method: "POST",
            body: JSON.stringify({ message: payload })
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

module.exports = { handler };
