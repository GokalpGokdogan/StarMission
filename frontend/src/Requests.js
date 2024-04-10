import axios from 'axios';

const API_HOST = "localhost:3001";
axios.defaults.withCredentials = true;

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
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/logReg/login`,
        headers: {'Content-Type': 'application/json'},
        params: {
            email: email,
            password: password
        },
        withCredentials: true
    });
    if (res.status === 200) {
        // Manually handle the redirect
        window.location.href = '/dashboard';
    }
    console.log(res.data);
};

/*
    This is a GET request which get past missions for specific astronaut.
    No inputs are required;
    btw bu taslak ha.. baya saçma bu, frontçular bura sizde skjfhk -Tevfo xoxo
*/

export const getPastMissions = async () => {

    return new Promise(async (resolve, reject) => {
        let res = await axios({
            method: 'get',
            url: `http://${API_HOST}/astronaut/getMissionInfo/getPastMissions`,
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });
        if (res.status === 200) {
            resolve(res.data);
        }
        else if(res.status === 400 && res.data === "NOT_AUTHORIZED_USER"){  // the logged in user is not astronaut
            reject("NOT_AUTHORIZED_USER");
            // to be continued...
        }
        else if(res.status === 400 && res.data === "ER_FIND_NONE"){ // there is no past mission
            resolve([]);
            // to be continued...
        }
        console.log(res.data);
    });
};
