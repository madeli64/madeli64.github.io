const myImage = document.querySelector("img");

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if(mySrc === "images/firefox-logo.png") {
        myImage.setAttribute("src", "images/firefox-logo2.png");
    } else {
        myImage.setAttribute("src", "images/firefox-logo.png");
    }
}

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Please enter your name:");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Mozilla is coll, ${myName}`;
    }
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Mozilla is coll, ${storedName}`;
}

myButton.onclick = setUserName;

// myButton.onclick = () => {
//     setUserName();
// }