module.exports = {
    config: {
        name: "Logout 🗝️",
        aliases: ["logout"],
    },
    run: async (client, message, args) => {
        await message.channel.send({ content: "Ready to logout :) please login again" });

        await client.logout()
        logger.info("RPC", "Logout", true);
        process.exit(0);
    }

};
