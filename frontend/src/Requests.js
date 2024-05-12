import axios from 'axios';
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

export const logout = async (navigate, setUserType, setUserId) => {

        // Clear user data from cookies or local storage
        Cookies.remove('user_type');
        Cookies.remove('user_id');
        
        // Reset user state in the app
        setUserType(null);
        setUserId(null);

        // Redirect to login page or home page
        navigate("/");

};

//company functions
export const getEmployees = async (companyId, searchedName, profession, minAge, maxAge, 
    sex, minWeight, maxWeight, minHeight, maxHeight, nationality) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/manageEmployees/getEmployees`,
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
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

export const getEmployeeData = async (astronautId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/manageEmployees/getEmployeeData`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            astronautId: astronautId,
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

export const getPartnerMissions = async (companyId, searchedName, startDate, endDate, location, 
    leadingCompanyName, minBudget, maxBudget) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/missionPostings/getPartnerMissions`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            companyId: companyId,
            searchedName: searchedName,
            startDate: startDate,
            endDate: endDate,
            location: location,
            leadingCompanyName: leadingCompanyName,
            minBudget: minBudget,
            maxBudget: maxBudget,
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

export const getMissionData = async (missionId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/missionPostings/getMissionData`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            missionId: missionId,
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

export const getAstronautData = async (astronautId) => {
    let res = await axios({
        method: 'get',
        // IT IS NOT AN EMPLOYEE????? getAstronautData or something?
        url: `http://${API_HOST}/company/manageEmployees/getEmployeeData`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            astronautId: astronautId,
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

export const getMissionOfAstronaut = async (astronautId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/astronaut/getMissionInfo/getCurrentMissionExtract`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            astronautId: astronautId,
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

export const rejectApplication = async (astronautId, missionId) => {
    const body = {
        'astronautId': astronautId,
        'missionId': missionId,
    }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/company/applications/rejectApplication`,
        headers: { 'Content-Type': 'application/json', },
        data: body,
    })
    console.log(res.data);
    return res.data
}

export const acceptApplicationC = async (astronautId, missionId, salary, startDate) => {
    const body = {
        'astronautId': astronautId,
        'missionId': missionId,
        'salary': salary,
        'startDate': startDate,
    }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/company/applications/acceptApplicationC`,
        headers: { 'Content-Type': 'application/json', },
        data: body,
    })
    console.log(res.data);
    return res.data
}

export const acceptApplication = async (astronautId, missionId, salary, startDate) => {
    const body = {
        'astronautId': astronautId,
        'missionId': missionId,
        'salary': salary,
        'startDate': startDate,
    }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/company/applications/acceptApplicationC`,
        headers: { 'Content-Type': 'application/json', },
        data: body,
    })
    console.log(res.data);
    return res.data
}

export const fireEmployee = async (astronautId, missionId) => {
    const body = {
        'astronautId': astronautId,
        'missionId': missionId,
    }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/company/manageEmployees/fireEmployee`,
        headers: { 'Content-Type': 'application/json', },
        data: body,
    })
    console.log(res.data);
    return res.data
}

export const getApplications = async (companyId, searchedName, profession, minAge, maxAge, sex, minWeight, maxWeight,
    minHeight, maxHeight, nationality, missionName) => {
        console.log(searchedName);
        console.log(companyId);
        
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

export const getBiddingCompanies = async (missionId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/myBids/getBiddingCompanies`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            missionId: missionId,
        },
        withCredentials: true
    });
    if (res.status == 204) {
        console.log("No bidding companies found with these filters")
    }

    console.log(res.data);
    return res.data;
}

export const getIncomingBids = async (missionId) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/company/manageIncomingBids/getIncomingBids`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            missionId: missionId,
        },
        withCredentials: true
    });
    if (res.status == 204) {
        console.log("No incoming bids found with these filters")
    }

    console.log(res.data);
    return res.data;
}

export const getMissionNames = async (companyId) => {
    let res = await axios({
        method: 'get',
        // IT IS NOT AN EMPLOYEE????? getAstronautData or something?
        url: `http://${API_HOST}/company/applications/getMissionNames`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            companyId: companyId,
        },
        withCredentials: true
    });

    console.log(res.data);
    return res.data;
};

// Astronaut functions


export const getCurrentMission = async () => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/astronaut/getMissionInfo/getCurrentMission`,
        headers: { 'Content-Type': 'application/json' },
        params: {},
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No current missions available for this astronaut")
    }
    else if (res.status == 401) {
        console.log("NOT_AUTHORIZED_USER")
    }
    else if(res.status == 400){
        console.log("An error occurred in get current missions for astronaut" + res.data);
    }
    else {
        console.log(res.data);
    }
    return res.data;

}

export const getPastMissions = async () => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/astronaut/getMissionInfo/getPastMissions`,
        headers: { 'Content-Type': 'application/json' },
        params: {},
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No past missions available for this astronaut")
    }
    else if (res.status == 401) {
        console.log("NOT_AUTHORIZED_USER")
    }
    else if(res.status == 400){
        console.log("An error occurred in get past missions for astronaut" + res.data);
    }
    else {
        console.log(res.data);
    }
    return res.data;
}


export const getRecentMissions = async (searchedName, startDate, endDate, location,
    leadingCompanyName, minBudget, maxBudget) => {
    const query = { searchedName: searchedName, startDate: startDate, endDate: endDate, location: location,
                    leadingCompanyName: leadingCompanyName, minBudget: minBudget, maxBudget: maxBudget}
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/astronaut/getMissionInfo/getRecentMissions`,
        headers: { 'Content-Type': 'application/json' },
        params: query,
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No mission postings found with these filters")
    }
    else if (res.status == 400) {
        console.log("An error occurred in get mission postings with filters" + res.data);
    }
    else if(res.status == 401){
        console.log("NOT_AUTHORIZED_USER")
    }
    else {
        console.log(res.data);
    }
    return res.data;
}


export const applyToMission = async (mission_id, cover_letter) => {
    const body = { 'mission_id': mission_id, 'cover_letter': cover_letter }

    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/astronaut/manageApplications/applyToMission`,
        headers: { 'Content-Type': 'application/json' },
        data: body,
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No mission postings found with these filters")
    }
    else if (res.status == 400) {
        console.log("An error occurred in get mission postings with filters" + res.data);
    }
    else if(res.status == 401){
        console.log("NOT_AUTHORIZED_USER")
    }
    else if(res.status == 409){
        console.log("Application is already made and in progress.")
    }
    else {
        console.log(res.data);
    }
    return res.data;
}

// start_date, end_date, mission_id, application_status
export const getApplicationsAstro = async (startDate, endDate, missionId, applicationStatus) => {
    let res = await axios({
        method: 'get',
        url: `http://${API_HOST}/astronaut/manageApplications/getApplications`,
        headers: { 'Content-Type': 'application/json' },
        params: {
            start_date: startDate,
            end_date: endDate,
            mission_id: missionId,
            application_status: applicationStatus
        },
        withCredentials: true
    });

    if (res.status == 204) {
        console.log("No applications found with these filters")
    }
    else if (res.status == 400) {
        console.log("An error occurred in get applications for astronaut" + res.data);
    }
    else {
        console.log(res.data);
    }
    return res.data;
} 


