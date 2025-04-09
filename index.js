document.addEventListener("click", (ev) => {
    const el = document.getElementById(ev.target.id)
    if (!el) return;
    console.log(el)
    const input = document.getElementById("input")
    switch (el.id) {
        case "zero":
        case "one":
        case "two":
        case "three":
        case "four":
        case "five":
        case "six":
        case "seven":
        case "eight":
        case "nine":
            if (input.innerText.match(/%$/)) break;
            if (!input.innerText.match(/\d$/)) input.innerText += ` ${el.innerText}`
            else input.innerText += el.innerText;
            break;
        case "clear":
            input.innerText = "";
            break;
        case "plus":
        case "minus":
        case "multiply":
        case "divide":
            if (input.innerText.match(/(\d|%)$/)) input.innerText += ` ${el.innerText}`;
            break;
        case "percent":
        case "period":
            if (input.innerText.match(/\d$/)) input.innerText += el.innerText;
            break;
        case "swapsign":
            if (!input.innerText.match(/(\d|%)$/)) break;
            const temp = input.innerText.split(" ");
            const lastitem = temp[temp.length - 1];
            if (lastitem.startsWith("-")) temp[temp.length - 1] = temp[temp.length - 1].substring(1);
            else temp[temp.length - 1] = "-" + temp[temp.length - 1]
            input.innerText = temp.join(" ");
        case "erase": 
        if (input.innerText.match(/(\d|%)$/)) 
            input.innerText = input.innerText.substring(0, input.innerText.length - 1)
        else input.innerText = input.innerText.substring(0, input.innerText.length - 2)
    }
})