const skku = require('./skku');

(async() => {
    const id = '';
    const pwd = '';
    
    const result = await skku.login(id, pwd);
    console.log('result : ', result);
})();