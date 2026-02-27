const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
    console.log(`${client.user.tag} göreve hazır!`);
});

// Eğitim/Denetim Başvuru Komutu
client.on('messageCreate', async (message) => {
    if (message.content === '!egitim-baslat') {
        const embed = new EmbedBuilder()
            .setTitle('🪖 Askeri Eğitim Onay Paneli')
            .setDescription(`**Aday:** ${message.author}\n**Durum:** Yetkili Onayı Bekleniyor...\n\n*Lütfen aşağıdaki butonları kullanarak işlemi onaylayın veya reddedin.*`)
            .setColor('DarkGreen')
            .setFooter({ text: 'Kara Kuvvetleri Komutanlığı' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('onay_asker')
                    .setLabel('Eğitimi Onayla')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('red_asker')
                    .setLabel('Eğitimi Reddet')
                    .setStyle(ButtonStyle.Danger),
            );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// Onay-Red İşlemleri
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'onay_asker') {
        const editedEmbed = new EmbedBuilder()
            .setTitle('✅ Eğitim Onaylandı')
            .setDescription(`**Asker:** ${interaction.user}\n**Durum:** Eğitime Alındı.`)
            .setColor('Green');
        await interaction.update({ embeds: [editedEmbed], components: [] });
    } 
    
    if (interaction.customId === 'red_asker') {
        const editedEmbed = new EmbedBuilder()
            .setTitle('❌ Eğitim Reddedildi')
            .setDescription(`**İşlem Yapan Yetkili:** ${interaction.user}\n**Durum:** Talep reddedildi.`)
            .setColor('Red');
        await interaction.update({ embeds: [editedEmbed], components: [] });
    }
});

// Buraya Token'ını ekleyeceğiz ama Koyeb üzerinden güvenli şekilde yapacağız
client.login(process.env.DISCORD_TOKEN);
