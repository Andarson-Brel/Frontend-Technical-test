
document.addEventListener("DOMContentLoaded", () => {
    const collapseButton = document.querySelector(".collapse-btn");
    const sidebar = document.querySelector(".sidebar");
    const collapseIcon = document.getElementById("collapse-icon");

    collapseButton.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");

        // Toggle the icon when collapsed
        if (sidebar.classList.contains("collapsed")) {
            collapseIcon.src = "./Assets/nav-icons/arrow-collapsed.svg"; 
        } else {
            collapseIcon.src = "./Assets/nav-icons/arrow-opened.svg"; 
        }
    });
});
