document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GOOGLE APPS SCRIPT
    ====================================================== */

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxxJIWpYbL0XMxXSwMydbzlLOdgujaZkQCAnvtQbMnX0y9soYushByj1ajxVgneyYuG/exec";


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL
    ====================================================== */

    const header =
        document.querySelector(".site-header");


    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 70) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const mainNav =
        document.getElementById(
            "mainNav"
        );


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.toggle(
                        "active"
                    );

                menuToggle.classList.toggle(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );


        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "active"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =====================================================
       CLOSE MENU WITH ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mainNav &&
                menuToggle
            ) {

                mainNav.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       REVEAL ON SCROLL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });


    /* =====================================================
       PRIVATE ACCESS FORM
    ====================================================== */

    const signupForm =
        document.getElementById(
            "signupForm"
        );

    const emailInput =
        document.getElementById(
            "email"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );

    const submitButton =
        document.getElementById(
            "submitButton"
        );


    if (
        signupForm &&
        emailInput &&
        formMessage &&
        submitButton
    ) {

        signupForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const email =
                    emailInput
                        .value
                        .trim();


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !email ||
                    !emailPattern.test(email)
                ) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                    return;

                }


                if (
                    GOOGLE_SCRIPT_URL ===
                    "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
                ) {

                    formMessage.textContent =
                        "Private Access is not connected yet.";

                    return;

                }


                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending";

                formMessage.textContent =
                    "Submitting your request...";


                try {

                    const formData =
                        new URLSearchParams();

                    formData.append(
                        "email",
                        email
                    );

                    formData.append(
                        "source",
                        "Obscura et Anonyme Website"
                    );


                    await fetch(
                        GOOGLE_SCRIPT_URL,
                        {
                            method: "POST",
                            mode: "no-cors",

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded"
                            },

                            body:
                                formData.toString()
                        }
                    );


                    formMessage.textContent =
                        "Your Private Access request has been received.";

                    signupForm.reset();


                } catch (error) {

                    console.error(
                        "Private Access submission error:",
                        error
                    );


                    formMessage.textContent =
                        "We could not submit your request. Please try again.";

                } finally {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Enter";

                }

            }
        );

    }

});
