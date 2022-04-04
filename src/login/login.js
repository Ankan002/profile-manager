import {isEmail} from "../helpers/is-email.js";

const idToken = localStorage.getItem("id-token");
if(idToken) window.location.replace("/advanced-wd/profile-manager/src");

const signInBtn = document.querySelector(".sign-in-btn");
const emailInput = document.querySelector(".user-email");
const passwordInput = document.querySelector(".user-password");

let signingIn = false;

const signIn = async() => {
    if(signingIn) return;

    if(!isEmail(emailInput.value.trim())) {
        showToast("Email invalid", false);
        return;
    }

    if(passwordInput.value.trim().length < 8){
        showToast("Length of password must be at least 8", false);
        return;
    }

    try{
        signingIn = true;
        signInBtn.classList.add("bg-[#E1A2A1]");

        const response = await fetch("http://localhost/advanced-wd/profile-manager/src/php/sign-in.php", {
            method: "POST",
            body: JSON.stringify({
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            })
        });

        const data = await response.json();

        if (!data?.success) {
            showToast(data?.error, false);
            emailInput.value = "";
            passwordInput.value = "";
            signingIn = false;
            signInBtn.classList.remove("bg-[#E1A2A1]");
            return;
        }

        signingIn = false;
        signInBtn.classList.remove("bg-[#E1A2A1]");

        localStorage.setItem("id-token", JSON.stringify(data?.idToken));

        emailInput.value = "";
        passwordInput.value = "";

        window.location.replace("/advanced-wd/profile-manager/src");
    }
    catch(error){
        console.log(error);
        showToast("Internal Server Error!!", false);
        signingIn = false;
        signInBtn.classList.remove("bg-[#E1A2A1]");
    }
}

const showToast = (message, success) => {
    Toastify({
        text: message,
        duration: 1500,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: success ? "#FD5430" : "#FD5430",
            color: "#16151C",
            fontFamily: '"Fira Code", monospace',
            fontWeight: "600"
        },
    }).showToast();
};

signInBtn.addEventListener("click", () => signIn());