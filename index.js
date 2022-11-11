    const  TelegramApi = require('node-telegram-bot-api')

    const token='5652462438:AAGjNIBDmsMgn08Uj73CoENhAOaRJVMUE5o'

    const bot = new TelegramApi(token, {polling:true})

    const startGame =async (chatId) =>{
        await  bot.sendMessage(chatId,'Угадай число:)')
                const randomNumber= Math.floor(Math.random()* 10)
                chats[chatId]=randomNumber;
                await bot.sendMessage(chatId,'Отгадывай',gameOptions );
    }

    const chats = {}

    bot.setMyCommands([
        {command: '/start', description:'Начальное приветствие'},
        {command: '/start_game', description:'поиграем?'},
        {command: '/info', description:'информация'}
    ]

    )

    



    const start=() => {
        bot.on('message', async msg=>{ 
            const text =msg.text;
            const chatId =  msg.chat.id;
    
            
            if (text==='/start'){
           return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}, это мой первый бот. Пока что он в стадии разработки, но скоро все будет:)`);}
    
           if (text==='/info'){
            return bot.sendMessage(chatId, ` ${msg.from.first_name}, Угадай число) `  );}

            if (text==='/start_game'){
                return startGame(chatId);
            }
            return bot.sendMessage(chatId, 'Выбери команду');
        })

        bot.on('callback_query', async msg => {
            const data= msg.data;
            const chatId = msg.message.chat.id;
            if(data === '/again'){
                return startGame(chatId)
            }
            if(data === chats[chatId]){
                return bot.sendMessage(chatId, `ты угадал цифру ${chats[chatId]}!!! Поздравляю`,againOptions)
            }   else   {
                return bot.sendMessage(chatId, `К сожалению ты не отгадал цифру ${chats[chatId]} возможно, вам еще повезет`,againOptions);
            }
        })
    }
    start()