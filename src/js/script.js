const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

// detect and change color mode based on local storage
const setColorMode = () => {
    if (localStorage.getItem('colorMode') == 'dark') {
        setDarkMode();
        darkButton.click();
    } else if (localStorage.getItem('colorMode') == 'light') {
        setLightMode();
        lightButton.click();
    }
};

// check system os color mode
const checkMode = () => {
    if (localStorage.getItem('colorMode') == null) {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            lightButton.click();
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            darkButton.click();
        }
    }
};

// toggle color mode when os color mode change
const checkModeChange = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        checkMode();
    });
};

// add color mode class to the body
const setDarkMode = () => {
    document.querySelector('body').classList = 'dark';
};
const setLightMode = () => {
    document.querySelector('body').classList = 'light';
};

// default call function
setColorMode();
checkMode();
checkModeChange();

// get all radio buttons
const radioButtons = document.querySelectorAll('.toggle__wrapper input');
// add click event for all radio button using loop -- and set local storage when changing color
for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', (event) => {
        if (darkButton.checked) {
            localStorage.setItem('colorMode', 'dark');
            setDarkMode();
        } else {
            localStorage.setItem('colorMode', 'light');
            setLightMode();
        }
    });
}
