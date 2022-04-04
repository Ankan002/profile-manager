const idToken = JSON.parse(localStorage.getItem("id-token"));
if (!idToken) window.location.replace("/advanced-wd/profile-manager/src/login");

const profileSection = document.querySelector(".profile-section");
const loadingComponent = document.querySelector(".loading-component");
const logOutButton = document.querySelector(".logout-btn");

const getUser = async () => {
    try {
        const response = await fetch(
            "http://localhost/advanced-wd/profile-manager/src/php/get-user.php",
            {
                method: "POST",
                body: JSON.stringify({
                    userId: idToken,
                }),
            }
        );

        const data = await response.json();

        if (!data?.success) {
            window.location.replace("/advanced-wd/profile-manager/src/login");
            return;
        }

        loadingComponent.remove();

        const userName = document.createElement("h2");
        userName.classList.add(
            "loading-component",
            "text-[#FE6639]",
            "md:text-2xl",
            "lg:text-3xl",
            "text-xl",
            "font-fira-code",
            "text-center"
        );
        userName.innerText = data?.name;
        profileSection.insertBefore(userName, profileSection.children[0]);

        const userEmail = document.createElement("h2");
        userEmail.classList.add(
            "loading-component",
            "text-[#FE6639]",
            "md:text-xl",
            "lg:text-2xl",
            "text-lg",
            "font-fira-code",
            "text-center",
            "mt-2"
        );
        userEmail.innerText = data?.email;
        profileSection.insertBefore(userEmail, profileSection.children[1]);
    } catch (error) {
        console.log(error);
        window.location.replace("/advanced-wd/profile-manager/src/login");
    }
};
getUser();

const logOut = () => {
    localStorage.removeItem("id-token");
    window.location.replace("/advanced-wd/profile-manager/src/login");
};

logOutButton.addEventListener("click", () => logOut());
