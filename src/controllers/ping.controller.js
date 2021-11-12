module.exports = class PingController {
    static async index(message, args) {
        const m = await message.channel.send('Pong!');
        m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}
