import { isEmail } from "../helpers/is-email.js";

const idToken = JSON.parse(localStorage.getItem("id-token"));
if (idToken) window.location.replace("/advanced-wd/profile-manager/src");

const signUpButton = document.querySelector(".sign-up-btn");
const userName = document.querySelector(".user-name");
const emailInput = document.querySelector(".user-email");
const passwordInput = document.querySelector(".user-password");
const verifyPassword = document.querySelector(".verify-password");

let userLoading = false;

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
            fontWeight: "600",
        },
    }).showToast();
};

const signUp = async () => {
    if (userLoading) return;

    if (userName.value.trim().length < 3) {
        showToast(
            "I think your parents gave you a name that has at least 3 characters...",
            false
        );
        return;
    }

    if (!isEmail(emailInput.value.trim())) {
        showToast("Email invalid", false);
        return;
    }

    if (passwordInput.value.trim().length < 8) {
        showToast("Length of password must be at least 8", false);
        return;
    }

    if (passwordInput.value.trim() !== verifyPassword.value.trim()) {
        showToast(
            "Re-Entered password may be same as the actual password...",
            false
        );
        return;
    }

    try {
        userLoading = true;
        signUpButton.classList.add("bg-[#E1A2A1]");

        const response = await fetch(
            "http://localhost/advanced-wd/profile-manager/src/php/sign-up.php",
            {
                method: "POST",
                body: JSON.stringify({
                    name: userName.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value.trim(),
                }),
            }
        );

        const data = await response.json();

        console.log(data);

        if (!data?.success) {
            showToast(data?.error, false);
            userName.value = "";
            emailInput.value = "";
            passwordInput.value = "";
            verifyPassword.value = "";
            userLoading = false;
            signUpButton.classList.remove("bg-[#E1A2A1]");
            return;
        }

        userLoading = false;
        signUpButton.classList.remove("bg-[#E1A2A1]");

        localStorage.setItem("id-token", JSON.stringify(data?.idToken));

        userName.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        verifyPassword.value = "";

        window.location.replace("/advanced-wd/profile-manager/src");
    } catch (error) {
        console.log(error);
        showToast("Internal Server Error", false);
        userLoading = false;
        signUpButton.classList.remove("bg-[#E1A2A1]");
    }
};

signUpButton.addEventListener("click", () => signUp());
