const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports =
{
    get: async (config, discordConfig, command, param) => {

        if (command === 'bot_add') command = 'bot_quota_mode normal; bot_add';
        if (command === 'bot_kick') command = 'bot_quota 0; bot_kick';
        if (command === 'maps') command = 'maps *';
        if (command === 'restartgame') command = 'mp_restartgame 10';
        if (command === 'warmup' && param === "0") command = 'mp_warmup_end 10';
        if (command === 'warmup' && param === "1") command = 'mp_warmup_start 3';

        let rconCommand = ` --host ${discordConfig.get('server')} --port ${discordConfig.get('port')} --password ${discordConfig.get('password')} ${command} `;
        if (param) rconCommand += param;
        // ToDo: Handle error
        const { stdout, stderr } = await exec(config.get('RCON_CLI_PATH') + rconCommand);
        return stdout;
    }
};