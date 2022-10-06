require('dotenv').cofig();
function keepAlive()
  {
    const express = require('express');
    const app = express();
    
    app.get('/', (req, res) => res.send('Bot Is Online!!'));
    
    app.listen(process.env.PORT, () =>
        console.log(`Your app is listening to http://localhost:${port}`)
    ); 
  }

module.exports = { keepAlive }
