import axios from 'axios';
import { parseUserString } from './UserProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const API_HOST = "localhost:3001";
axios.defaults.withCredentials = true;


//Commented parts in request bodies are because there isn't an actual backend connected right now.

/*
    This is a POST request which registers an astronaut user. Sample input parameters and values are shown below:
    {name: 'Öykü Demir', email: 'oykudemir@gmail.com', phone: '+905345814048', nationality:'Turkey', birth_date: '2003-06-01', sex:'Female'
    password: 'oykuslayqueenbossbitch'}
*/

export const registerAstronaut = async (name, email, phone, nationality, birth_date, sex, password) => {
    const body = { 'name': name, 'email': email, 'phone': phone, 'nationality': nationality, 'birth_date': birth_date, 'sex': sex, 'password': password }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/logReg/registerAstronaut`,
        headers: { 'Content-Type': 'application/json', },
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
        headers: { 'Content-Type': 'application/json', },
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

export const login = async (email, password, navigate, setUserType, setUserId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/logReg/login`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            email: email,
            password: password
        },
        withCredentials: true
    });

    if (res.status == 200) {
        if (Cookies.get('user_type') === "company") {
            setUserType('company');
            setUserId(Cookies.get('user_id'));
            navigate("/company-dashboard"); // Redirect to company dashboard
        } else {
            setUserType('astronaut');
            setUserId(Cookies.get('user_id'));
            navigate("/dashboard"); // Redirect to user dashboard
        }
    }
};

//company functions
export const getEmployees = async (companyId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/manageEmployees/getEmployees`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            selfCompanyId: companyId,
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

export const getMissionPostings = async (companyId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/missionPostings/getMissionPostings`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            companyId: companyId,
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

export const getApplications = async (companyId, searchedName, profession, minAge, maxAge, sex, minWeight, maxWeight,
    minHeight, maxHeight, nationality, missionName) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/applications/getApplications`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            companyId: companyId,
            searchedName: searchedName,
            profession: profession,
            minAge: minAge,
            maxAge: maxAge,
            sex: sex,
            minWeight: minWeight,
            maxWeight: maxWeight,
            minHeight: minHeight,
            maxHeight: maxHeight,
            nationality: nationality,
            missionName: missionName,
        },
        withCredentials: true
    });

    if (res.data == "No applications found with these filters") {
        console.log("ahah")
    }

    console.log(res.data);
    return res.data;
}

export const createMission = async (companyId, name, location, start_date, end_date, description, budget, important_notes) => {
    const body = {
        'companyId': companyId, 'name': name, 'location': location, 'start_date': start_date, 'end_date': end_date, 'description': description,
        'budget': budget,
        'important_notes': important_notes
    }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/company/createMission/`,
        headers: { 'Content-Type': 'application/json', },
        data: body,
    })
    console.log(res.data);
    return res.data
}

export const getLeadingMissions = async (companyId, name, start_date, end_date, location, min_budget, max_budget) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/ledMissions/getLedMissions`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            companyId: companyId,
            name: name,
            start_date: start_date,
            end_date: end_date,
            location: location,
            min_budget: min_budget,
            max_budget: max_budget
        },
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No missions found with these filters")
    }

    console.log(res.data);
    return res.data;
}

export const getApplicationData = async (astronaut_id, mission_id, applied_date) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/applications/getApplicationData`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            astronaut_id: astronaut_id,
            mission_id: mission_id,
            applied_date: applied_date
        },
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No applications found with these filters")
    }

    console.log(res.data);
    return res.data;
}

export const getMyBids = async (companyId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/myBids/getMyBids`,
        headers: { 'Content-Type': 'application/json' },
        params: {
           companyId: companyId,
        },
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No bids found with these filters")
    }

    console.log(res.data);
    return res.data;
}


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
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        if (res.status === 200) {
            resolve(res.data);
        }
        else if (res.status === 400 && res.data === "NOT_AUTHORIZED_USER") {  // the logged in user is not astronaut
            reject("NOT_AUTHORIZED_USER");
            // to be continued...
        }
        else if (res.status === 400 && res.data === "ER_FIND_NONE") { // there is no past mission
            resolve([]);
            // to be continued...
        }
        console.log(res.data);
    });
};
