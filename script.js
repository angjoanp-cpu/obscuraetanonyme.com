document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

    /* GOOGLE APPS SCRIPT */

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbx0LUeUU0Jtjga8VM5CrvaNjrjmVEJdE_ZPRjkpJKOA10A6EEJMAifu93GNlPtGMitg2A/exec";


    /* CURRENT YEAR */

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* HEADER SCROLL */

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
        handleHeaderScroll,
        { passive: true }
    );


    handleHeaderScroll();



    /* MOBILE MENU */

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const mainNav =
        document.getElementById(
            "mainNav"
        );


    function openMenu() {

        if (
            !menuToggle ||
            !mainNav
        ) {
            return;
        }


        mainNav.classList.add(
            "is-open"
        );


        document.body.classList.add(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

    }


    function closeMenu() {

        if (
            !menuToggle ||
            !mainNav
        ) {
            return;
        }


        mainNav.classList.remove(
            "is-open"
        );


        document.body.classList.remove(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

    }


    if (
        menuToggle &&
        mainNav
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuToggle.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }



    /* CLOSE MENU WITH ESCAPE */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );



    /* CLOSE MOBILE MENU IF SCREEN RETURNS TO DESKTOP */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMenu();

            }

        }
    );



    /* REVEAL ON SCROLL */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
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


    } else {


        revealElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }



    /* SMOOTH INTERNAL LINKS */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth",

                    block:
                        "start"

                });


                history.replaceState(
                    null,
                    "",
                    targetId
                );

            }
        );

    });



    /* PRIVATE ACCESS FORM */

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


                formMessage.classList.remove(
                    "success",
                    "error"
                );


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


                    formMessage.classList.add(
                        "error"
                    );


                    emailInput.focus();


                    return;

                }



                submitButton.disabled = true;


                submitButton.textContent =
                    "Sending…";


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

                            method:
                                "POST",

                            mode:
                                "no-cors",

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


                    formMessage.classList.add(
                        "success"
                    );


                    signupForm.reset();


                } catch (error) {


                    console.error(
                        "Private Access submission error:",
                        error
                    );


                    formMessage.textContent =
                        "We could not submit your request. Please try again.";


                    formMessage.classList.add(
                        "error"
                    );


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
