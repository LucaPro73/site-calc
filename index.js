function addNumber(n, input) {
    if (input.match(/%$/)) return input;
    if (!input.match(/\d$/)) return input += ` ${n}`
    else return input += n;
}
function addSymbol(s, input) {
    if (input.match(/(\d|%)$/)) return input += ` ${s}`;
    return input;
}
function addSecondary(v, input) {
    if (input.match(/\d$/)) return input += v;
    return input;
}
function erase(input) {
    if (input.match(/(\d|%)$/))
        input = input.substring(0, input.length - 1)
    else input = input.substring(0, input.length - 2)
    return input;
}
/**
 * @param {string} input 
 */
function compute(input) {
    if (!input) return "";
    const i = input
    .replace(/÷/g, "/").replace(/x/g, "*").replace(/\. /g, ".")
    .split(" ").map(el => {
        const m = el.match(/([\d\.]+)%/)
        if (m) return parseInt(m[1]) / 100;
        else return el
    }).join(" ")
    if (input === "9 + 10") return 21;
    const v = parseFloat(eval(i)).toPrecision(5)
    const extra = v.match(/\.0+$/)
    if (extra) return v.substring(0, v.length - extra[0].length)
    else return v
}

function insertEntryIntoInput(id) {
    const el = document.getElementById(id);
    if (!el) return;
    document.getElementById("input").innerText = el.querySelector(".history-result").innerText
}
function renderHistory(hist) {
    document.getElementById("history").innerHTML = `
    <h1 class="title">History<b class="clearbtn" onclick="clearHistory()">Clear</b></h1>
    ${hist.map(({ query, result }, i) => `
    <div class="entry" id="entry-${i}" onclick="insertEntryIntoInput('entry-${i}')">
        <span class="history-query">${query} =</span>
        <span class="history-result">${result}</span>
    </div>`).join("")}`
}
renderHistory(JSON.parse(localStorage.getItem("history")) || [])
function addToHistory(query, result) {
    if (query === result) return;
    const hist = JSON.parse(localStorage.getItem("history")) || []
    hist.unshift({ query, result })
    localStorage.setItem("history", JSON.stringify(hist))
    renderHistory(hist)
}
function clearHistory() {
    localStorage.setItem("history", "[]")
    renderHistory([])
}

document.addEventListener("click", (e) => {
    const el = document.getElementById(e.target.id)
    if (!el) return;
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
            input.innerText = addNumber(el.innerText, input.innerText)
            break;
        case "clear":
            input.innerText = "";
            break;
        case "plus":
        case "minus":
        case "multiply":
        case "divide":
            input.innerText = addSymbol(el.innerText, input.innerText);
            break;
        case "percent":
        case "period":
            input.innerText = addSecondary(el.innerText, input.innerText);
            break;
        case "swapsign":
            if (!input.innerText.match(/(\d|%)$/)) break;
            const temp = input.innerText.split(" ");
            const lastitem = temp[temp.length - 1];
            if (lastitem.startsWith("-")) temp[temp.length - 1] = temp[temp.length - 1].substring(1);
            else temp[temp.length - 1] = "-" + temp[temp.length - 1]
            input.innerText = temp.join(" ");
            break;
        case "erase":
            input.innerText = erase(input.innerText);
            break;
        case "equals":
            const query = input.innerText;
            input.innerText = compute(input.innerText)
            addToHistory(query, input.innerText)
            break;
    }
})

document.addEventListener('keydown', (e) => {
    const input = document.getElementById("input")
    if (e.key.match(/^\d$/)) input.innerText = addNumber(e.key, input.innerText);
    else if (["+", "-", "*"].includes(e.key)) input.innerText = addSymbol(e.key, input.innerText)
    else if (e.key === "/") input.innerText = addSymbol("÷", input.innerText)
    else if (["%", "."].includes(e.key)) input.innerText = addSecondary(e.key, input.innerText)
    else if (e.key === "Backspace") input.innerText = erase(input.innerText)
    else if (e.key === "Enter") {
        const query = input.innerText;
        input.innerText = compute(input.innerText)
        addToHistory(query, input.innerText)
    }
});