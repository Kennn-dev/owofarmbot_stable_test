module.exports = {
	config: {
		name: "say",
	},
	run: async (client, message, args) => {
		// Say owo every 10s
		console.log(
			client.chalk.blue(client.chalk.bold(`Bot`)),
			client.chalk.white(`>>`),
			client.chalk.red(`Say`),
		);
		setInterval(async function () {

			await message.channel.send({
				content: "owo",
			});
		}, 30_000);



	},
};
