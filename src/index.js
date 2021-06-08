document.addEventListener("DOMContentLoaded", () => {
    const browseDiv = document.querySelector("#browse-nonprofits")
    const detailedInfoDiv = document.querySelector("#detailed-info")
    const nameElement = document.querySelector("#name")
    const imageElement = document.querySelector("#image")
    const descriptionElement = document.querySelector("#description")
    const donationsElement = document.querySelector("#donations")
    const donationForm = document.querySelector("#donation-form")
    const donationInput = document.querySelector("input#donations")
    const nonprofitID = document.querySelector("#nonprofitID")
    const url = "http://localhost:3000/nonprofits"

    /*
    grab the div with id #browse-nonprofits
    fetch data from the server
    iterate through all records
        create a span element
        add non-profit's name to span
    */
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            data.forEach(nonprofit => {
                const span = document.createElement("span")
                span.innerHTML = nonprofit.name
                browseDiv.append(span)

                /*
                    grab the detailed-info div and store in variable
                    listen to each span for a click
                        populate the detailed info with the appropriate nonprofit
                        p tag gets nonprofit name
                        img tag gets nonprofit logo
                        description p gets description
                        span on h4 gets the donations
                */
                span.addEventListener("click", () => {
                    nameElement.innerHTML = nonprofit.name
                    imageElement.src = nonprofit.image
                    descriptionElement.innerHTML = nonprofit.description
                    donationsElement.innerHTML = nonprofit.donations
                    nonprofitID.value = nonprofit.id
                })
            })
        })
        
    /*
        grab the form and store it in a variable
        listen to the donate form
            get the donation amount from the page
            Patch the new donation value to the server
            update the donations field on the html
    */
    donationForm.addEventListener("submit", event => {
        event.preventDefault()
        const donationAmt = donationInput.value

        const configurationObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                donations: parseInt(donationAmt) + parseInt(donationsElement.innerText)
            })
        }
        
        fetch(`${url}/${nonprofitID.value}`, configurationObject)
            .then(resp => resp.json())
            .then(data => {
                donationsElement.innerHTML = data.donations
            })
        
        donationInput.value = ""

    })

})
