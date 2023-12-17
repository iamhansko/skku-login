const axios = require('axios');
const cheerio = require('cheerio');

module.exports.login = async (id, pwd) => {
    const loginUrl = 'https://sugang.skku.edu/skku/login?attribute=loginChk';
    const loginForm = { lang: 'KO', id, pwd };
    const infoUrl = 'https://sugang.skku.edu/skku/core?attribute=frame';

    if ( !id ) throw new Error('Student Id is Empty');
    if ( !pwd ) throw new Error('Password is Empty');

    try {
        const loginResponse = await axios.post(loginUrl, loginForm, {
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        });
    
        const infoResponse = await axios.post(infoUrl, {}, {
            headers: { 'Cookie' : loginResponse.headers['set-cookie'].join('; ') }
        })
    
        const $ = cheerio.load(infoResponse.data);
        const studentData = $('.tableList3 > tbody > tr').toArray().reduce((total, item) => { total.push($(item).children('td').text()); return total; }, []);
    
        return {
            name : studentData[3],
            id : studentData[4],
            degree : studentData[5],
            major : studentData[6]
        }
    } catch(error) {
        throw new Error('Login Failed');
    }
};