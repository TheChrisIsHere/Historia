function keepAlive()
  {
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 5000;
    
    app.get('/', (req, res) => res.send('Bot Is Online!!'));
    
    app.listen(port, () =>
        console.log(`Your app is listening to http://localhost:${port}`)
    ); 
  }

module.exports = { keepAlive }
