document.getElementById("caesar").addEventListener("click",function(){
    let text=document.getElementById("plain").value.replace(/\s+/g,"");
    let key=parseInt(document.getElementById("key").value);
  
    if(isNaN(key)){
        alert("Please enter a valid number");
        return;
    }
    let arrd=[];
    let steps="";
    for(let i=0;i<text.length;i++){
        let t1= text.charCodeAt(i)-97;
        let ans=t1+key;
        let fans=ans%26;
        arrd.push(String.fromCharCode(fans+97));

        steps += `(${t1} + ${key}) mod 26 = ${fans} → ${String.fromCharCode(fans + 97)}<br>`;
    }
    document.getElementById("output").innerHTML = steps;
    document.getElementById("decription").innerHTML=arrd.join("");

})


document.getElementById("play").addEventListener("click",function(){
    
 let text = document.getElementById("plain").value.toUpperCase().replace(/\s+/g,"").replace(/J/g,"I");
    let keyInput = document.getElementById("key").value.toUpperCase().replace(/\s+/g,"").replace(/J/g,"I");

    if (!text || !keyInput) {
        alert("Enter plain text and key!");
        return;
    }

    let keysquare =[];
    let used = new Set();
    for(let ch of keyInput +"ABCDEFGHIKLMNOPQRSTUVWXYZ"){
        if(!used.has(ch)){
            keysquare.push(ch);
            used.add(ch);
        }
        if(keysquare.length===25) break;
    }

    let keySquareHTML = "<h3>Key Square:</h3><table>";
    for(let i = 0; i < 5; i++) {
        keySquareHTML += "<tr>";
        for(let j = 0; j < 5; j++) {
            keySquareHTML += `<td>${keysquare[i*5 + j]}</td>`;
        }
        keySquareHTML += "</tr>";
    }
    keySquareHTML += "</table>";
    document.getElementById("keysquare").innerHTML = keySquareHTML;

    let digraphs = [];
    for (let i = 0; i < text.length; i += 2) {
        let a = text[i];
        let b = text[i+1] || "X";
        if (a === b) { 
            b = "X"; 
            i--; 
        }
        digraphs.push(a + b);
    }

    document.getElementById("digrams").innerHTML = `<h3>Digrams:</h3><p>${digraphs.join(" - ")}</p>`;

    let steps = "";
    let cipher = "";
       for (let pair of digraphs) {
        let aIndex = keysquare.indexOf(pair[0]);
        let bIndex = keysquare.indexOf(pair[1]);

        let aRow = Math.floor(aIndex/5), aCol = aIndex%5;
        let bRow = Math.floor(bIndex/5), bCol = bIndex%5;

        let c1, c2;

        if (aRow === bRow) { 
            c1 = keysquare[aRow*5 + (aCol+1)%5];
            c2 = keysquare[bRow*5 + (bCol+1)%5];
        } else if (aCol === bCol) { 
            c1 = keysquare[((aRow+1)%5)*5 + aCol];
            c2 = keysquare[((bRow+1)%5)*5 + bCol];
        } else { 
            c1 = keysquare[aRow*5 + bCol];
            c2 = keysquare[bRow*5 + aCol];
        }

        cipher += c1 + c2;
        steps += `${pair[0]}${pair[1]} → ${c1}${c2}<br>`;
    }

    document.getElementById("output").innerHTML = steps;
    document.getElementById("decription").innerHTML = cipher;
})


// document.getElementById("hill").addEventListener("click",function(){
    
// })


// document.getElementById("Vignere").addEventListener("click",function(){
    
// })


// document.getElementById("rail").addEventListener("click",function(){
    
// })