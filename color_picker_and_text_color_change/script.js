function changeColor() {
    let selectedText = window.getSelection();
    if (selectedText.rangeCount > 0) {
        let range = selectedText.getRangeAt(0);
        let span = document.createElement("span");
        span.style.color = document.getElementById("colorPicker").value;
        span.appendChild(range.extractContents());
        range.insertNode(span);
    }
}

function addText() {
    let text = document.getElementById("newText").value;
    if (text.trim() !== "") {
        let textContainer = document.getElementById("text-container");
        textContainer.innerHTML += " " + text;
        document.getElementById("newText").value = ""; // Clear input
    }
}







        // mode change 
        const darkMode = () =>{
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
        }
        const lightMode = ()=>{
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
        }
        document.getElementById('dark_btn').addEventListener('click',darkMode);
        document.getElementById('light_btn').addEventListener('click',lightMode);