import axios from 'axios';

const API_HOST = "localhost:3001"

//Commented parts in request bodies are because there isn't an actual backend connected right now.

/*
    This is a POST request which registers an astronaut user. Sample input parameters and values are shown below:
    {name: 'Öykü Demir', email: 'oykudemir@gmail.com', phone: '+905345814048', nationality:'Turkey', birth_date: '2003-06-01', sex:'Female'
    password: 'oykuslayqueenbossbitch'}
*/

export const registerAstronaut = async (name, email, phone, nationality, birth_date, sex, password) => {
    const body = { 'name': name, 'email': email, 'phone': phone, 'nationality': nationality ,'birth_date':birth_date, 'sex':sex, 'password': password }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/logReg/registerAstronaut`,
        headers: {'Content-Type': 'application/json',},
        data: body,
    })
    console.log(res.data);
    return res.data
}

/*
    This is a POST request which registers a company user. Sample input parameters and values are shown below:
    {name: 'DataBoss', email: 'databossadmin@gmail.com', phone: '+905345814048', password: 'oykuslayqueenbossbitch'}
*/

export const registerCompany = async (name, email, phone, password) => {
    const body = { 'name': name, 'email': email, 'phone': phone, 'password': password }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/logReg/registerCompany`,
        headers: {'Content-Type': 'application/json',},
        data: body,
    })
    console.log(res.data);
    return res.data
}

/*
    This is a POST request which logs a user in. A cookie will be assigned to the user according to the user's type. 
    Sample input parameters and values are shown below:
    {email: 'databossadmin@gmail.com', password: 'oykuslayqueenbossbitch'}
*/

export const login = async (email, password) => {
    const body = {'email': email, 'password': password }
    /*let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/logReg/login`,
        headers: {'Content-Type': 'application/json',},
        data: body,
        withCredentials: true
    })
    if (res.data && res.data.redirect) {
        // Manually handle the redirect
        window.location.href = res.data.redirect;
    }
    console.log(res.data);
    return res.data*/
    console.log(body);
}