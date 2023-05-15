export default function colourFunction() {
var myselect = document.getElementById("select1"),
colour = myselect.options[myselect.selectedIndex].className;
myselect.className = colour;
myselect.blur(); //This just unselects the select list without having to click somewhere else on the page
}