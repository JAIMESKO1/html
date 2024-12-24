let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');  // Fixed class name

menu.onclick = () => {  // Fixed event name
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');  // Fixed class name
}
