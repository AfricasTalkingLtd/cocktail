var options = {
  AT : {
    username : 'USERNAME',
    apiKey   : 'KEY',
    format   : 'json'
  },

  mysql: {
    port: '3306',
    host: 'localhost',
    db  : 'cocktail',
    user: 'root',
    pass: 'root'
  },

  redis: {
    port: '6709',
    host: 'localhost'
  }
};

module.exports = options;
