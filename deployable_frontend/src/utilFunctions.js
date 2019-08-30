import Authentication from './Authentication'

function localCreds() {
    let newAuth = new Authentication()
    return newAuth.fromLocalStorage();
  
  }

export function postAboutToDB(about){
    fetch("http://localhost:3000/users/about", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${localCreds()}`
        },
        body: JSON.stringify({
            about_me: about,
        })
    })
    .then(newPortfolio => newPortfolio.json())
    .then(newPortfolio => newPortfolio)
}

export function postSkillToDB(newSkill){
    fetch("http://localhost:3000/users/skills", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${localCreds()}`
        },
        body: JSON.stringify({
            skill_name: newSkill
        })
    })
    .then(res => res.json())
    .then(skills => skills)
}


