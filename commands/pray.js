module.exports = {
  config: {
    name: "pray",
  },
  run: async (client, message, args) => {
    console.log(client.config.commands);
    console.log(client.global);
    // Feature enabled
    // Command not running
    if (
      client.config.commands.pray === true &&
      client.global.praying === false
    ) {
      if (client.global.captchadetected) {
        return;
      }

      client.rpc("update");
      // await message.delete();
      const userId = message.mentions.users.first().id;
      console.log({ userId });

      if (!userId) {
        client.global.pray = null;
        if (client.config.settings.chatfeedback) {
          await message.channel.send({
            content: "User pray was clear",
          });
        }

        console.log(
          client.chalk.blue(client.chalk.bold(`Bot`)),
          client.chalk.white(`>>`),
          client.chalk.red(`Pray`),
          client.chalk.green(`User pray id cleared`)
        );
        return;
      }

      client.global.pray = userId;
      if (client.config.settings.chatfeedback) {
        await message.channel.send({
          content: `User pray target changed to <@${userId}>`,
        });
      }

      console.log(
        client.chalk.blue(client.chalk.bold(`Bot`)),
        client.chalk.white(`>>`),
        client.chalk.red(`Pray`),
        client.chalk.green(`User pray id changed to ${userId}`)
      );
    } else {
      await message.delete();
      if (client.config.settings.chatfeedback) {
        await message.channel.send({
          content: "This feature is not enable or bot currently praying.",
        });
      }
    }
  },
};
