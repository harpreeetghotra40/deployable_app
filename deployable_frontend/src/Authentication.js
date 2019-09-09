function loginRequestOptions(email, password){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                email,
                password
            }
        })
    }
    return requestOptions;
}

function signUpRequestOptions(name, email, password, github_profile_link){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name,
                email,
                password,
                github_profile_link
            }
        })
    }
    return requestOptions;
}


export default class Authentication{

    // Very helpful:
    // https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#authentication-service-js
    fromLocalStorage = () => {
        const item = localStorage.getItem('currentUser');
        if ((item === null) || (item === undefined) || (item === "undefined")) {
            console.log('from Authentication: No cached login creds.');
            return null;
        }
        const parsed = JSON.parse(item);
        return parsed;
    }

    login = async (loginOptions) => {
        const requestOptions = loginRequestOptions(loginOptions.email, loginOptions.password);
        const response = await fetch("http://localhost:3000/login", requestOptions);
        const response_1 = await response.json();
        console.assert(response_1 != null);
        console.assert(response_1 !== undefined);
        console.assert(response_1 !== "undefined");
        if (response_1.errors === undefined) {
            console.assert(response_1.jwt !== undefined);
            localStorage.setItem('currentUser', JSON.stringify(response_1.jwt));
        }
        else{
            console.log(response_1.errors.message[0])
        }
        return response_1;
    }

    signup = async (signUpOptions) => {
        const requestOptions = signUpRequestOptions(signUpOptions.name, signUpOptions.email, signUpOptions.password, signUpOptions.github_profile_link);
        const response = await fetch("http://localhost:3000/users", requestOptions);
        const response_1 = await response.json();
        console.assert(response_1 != null);
        console.assert(response_1 !== undefined);
        console.assert(response_1 !== "undefined");
        if (response_1.errors === undefined) {
            localStorage.setItem('currentUser', JSON.stringify(response_1.jwt));
        }else{
            console.log(response_1.errors.message[0])
        }
        return response_1;
    }
}