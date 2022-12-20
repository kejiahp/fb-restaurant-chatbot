const url = `${window.location.origin}/profile/setup-user-fb-profile`

const submitButton = document.querySelector("#submitFacebookProfile")

submitButton.addEventListener('click', (e)=>{
    e.preventDefault()
    
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
})