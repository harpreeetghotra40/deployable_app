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

export function postProjectToDB(newProject){
    fetch("http://localhost:3000/users/projects", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${localCreds()}`
        },
        body: JSON.stringify({
            new_project: newProject
        })
    })
}



export function postBlogToDB(newBlog){
    fetch("http://localhost:3000/users/blogs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${localCreds()}`
        },
        body: JSON.stringify({
            new_blog: newBlog
        })
    })
}

export function editDescInDB(project, newDesc){
    console.log(project)
    fetch("http://localhost:3000/projects/description", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${localCreds()}`
        },
        body: JSON.stringify({
            project: project,
            project_description: newDesc
        })
    })
}



