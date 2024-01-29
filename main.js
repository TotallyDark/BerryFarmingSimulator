const RED =
  "https://www.cmu.edu/brand/brand-guidelines/images/colors-carnegie-red-600x600.png";
const GREEN =
  "https://www.triboropaint.com/cdn/shop/products/32A431_600x600_crop_center.png?v=1615316829";
const BROWN =
  "https://www.shenandoahpaint.com/cdn/shop/products/8A6348_600x600_crop_center.png?v=1606783900";
var audio = new Audio('https://www.fesliyanstudios.com/play-mp3/1166');

const BASEUPGRADEPRICE=1;
const SPARKITPRICE =1;
const CATTIVAPRICE = 1;
const LIFMUNKPRICE =1;
const FUDDLERPRICE =1;

let RANDGROWTIME = 30;
let GROWBUTTON;
let COUNTER = 0;
let MONEY = 0;
let PALAMOUNT = 0;
let PALBOXNUM = 1;
let AUTOHARVEST = false;
let AUTOPLANT = false;
let AUTOSELL = false;

let LIFMUNKAMOUNT = 0;
let FUDDLERAMOUNT = 0;
let CATTIVAAMOUNT = 0;
let SPARKITAMOUNT = 0;

let CMONEY = getCookie("CMONEY");
if (CMONEY) {
  MONEY = parseInt(CMONEY);
}
var CCOUNTER = getCookie("CCOUNTER");
if (CCOUNTER) {
  COUNTER = parseInt(CCOUNTER);
}
document.getElementById("BASEUPGRADE").addEventListener("click", function () {
  if(MONEY >=BASEUPGRADEPRICE) {
    addPalBox();
    MONEY = MONEY -BASEUPGRADEPRICE;
  } else {
    alert("Not Enough Money!")
  }
  if (PALBOXNUM >= 6) {
    document.querySelector("#BASEUPGRADE").style.display = "none";
  }
});

document.getElementById("KNIFE").addEventListener("dblclick", (event) => {
  for(let i =0; document.getElementsByClassName("PALS")[i] != null; i++) {
    document.getElementsByClassName("PALS")[i].innerHTML = '';
  }
  
  audio.play();
  PALAMOUNT = 0;
  AUTOHARVEST = false;
  AUTOPLANT = false;
  AUTOSELL = false;

  LIFMUNKAMOUNT = 0;
  FUDDLERAMOUNT = 0;
  CATTIVAAMOUNT = 0;
  
  
  SPARKITAMOUNT = 0;
  checkForAmount("#LIFMUNK", LIFMUNKAMOUNT);
  checkForAmount("#FUDDLER", FUDDLERAMOUNT);
  checkForAmount("#CATTIVA", CATTIVAAMOUNT);
});

document.getElementById("LIFMUNK").addEventListener("click", function () {
  if(MONEY >=LIFMUNKPRICE) {
    MONEY = MONEY - LIFMUNKPRICE;
    document.getElementById("MONEY").innerText = "Money Amount: " + MONEY;
    document.getElementById("COUNTER").innerText = "Berry Amount: " + COUNTER;
    LIFMUNKAMOUNT = LIFMUNKAMOUNT + 1;
  if (
    insertIntoPalBox(
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/palworld/c/c0/T_Carbunclo_icon_normal.png?"
    ) === false
  ) {
    alert("Not Enough Room in Pal Box!");
  } else {
    checkForAmount("#LIFMUNK", LIFMUNKAMOUNT);
    AUTOPLANT = true;
    console.log(document.getElementById("GROWBUTTON").style.display);
    }
  }else {
    alert("Not Enough Money!")
  }
});

document.getElementById("CATTIVA").addEventListener("click", function () {
  if(MONEY >=CATTIVAPRICE) {
    MONEY = MONEY - CATTIVAPRICE;
    document.getElementById("MONEY").innerText = "Money Amount: " + MONEY;
    document.getElementById("COUNTER").innerText = "Berry Amount: " + COUNTER;
  CATTIVAAMOUNT = CATTIVAAMOUNT + 1;

  if (
    insertIntoPalBox(
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/palworld/7/79/T_PinkCat_icon_normal.png?width=325"
    ) === false
  ) {
    alert("Not Enough Room in Pal Box!");
  } else {
    checkForAmount("#CATTIVA", CATTIVAAMOUNT);
    AUTOSELL = true;
  }
  }else{
    alert("Not Enough Money!")
  }
});
  
document.getElementById("FUDDLER").addEventListener("click", function () {
  if(MONEY >=FUDDLERPRICE) {
    MONEY = MONEY - FUDDLERPRICE;
    document.getElementById("MONEY").innerText = "Money Amount: " + MONEY;
    document.getElementById("COUNTER").innerText = "Berry Amount: " + COUNTER;
  FUDDLERAMOUNT = FUDDLERAMOUNT + 1;

  if (
    insertIntoPalBox(
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/palworld/f/fb/T_CuteMole_icon_normal.png?width=960"
    ) === false
  ) {
    alert("Not Enough Room in Pal Box!");
  } else {
    checkForAmount("#FUDDLER", FUDDLERAMOUNT);
    AUTOHARVEST = true;
    if (document.getElementById("HARVESTBUTTON").style.display === "inline-block") {
      harvest();
      document.getElementById("HARVESTBUTTON").style.display = "none";
    }
  }
  } else {
    alert("Not Enough Money!")
  }
});

document.getElementById("SPARKIT").addEventListener("click", function () {
  if(MONEY >=SPARKITPRICE) {
    MONEY = MONEY - SPARKITPRICE;
    document.getElementById("MONEY").innerText = "Money Amount: " + MONEY;
    document.getElementById("COUNTER").innerText = "Berry Amount: " + COUNTER;
  if (
    insertIntoPalBox(
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/palworld/e/e7/T_ElecCat_icon_normal.png?width=325"
    ) === false
  ) {
    alert("Not Enough Room in Pal Box!");
  }
  SPARKITAMOUNT = SPARKITAMOUNT + 1;
  } else {
    alert("Not Enough Money!")
  }
});

function addPalBox() {
  PALBOXNUM = PALBOXNUM + 1;
  BOXNUM = "#PAL".concat(PALBOXNUM);
  document.querySelector(BOXNUM).style.display = "inline-block";
}
function insertIntoPalBox(imgSrc) {
  console.log(PALAMOUNT);
  if (PALAMOUNT < PALBOXNUM) {
    BOXNUM = "#PAL".concat(PALAMOUNT + 1);
    var img = document.createElement("img");
    img.src = imgSrc;
    img.width = 50;
    img.draggable="true" 
    img.ondragstart="drag(event)"
    var src = document.querySelector(BOXNUM);
    src.appendChild(img);
    PALAMOUNT = PALAMOUNT + 1;
    return true;
  } else {
    return false;
  }
}

function checkForAmount(id, varName) {
  if (varName > 0) {
    document.querySelector(id).style.display = "none";
    return true;
  } else {
    document.querySelector(id).style.display = "inline-block";
    return false;
  }
}
function grow() {
  hideShowGROWBUTTON();
  changeImage();
  setTime();
  display = document.querySelector("#TIMER");
  startTimer(RANDGROWTIME, display);
}
document.getElementById("GROWBUTTON").addEventListener("click", function () {
  if(AUTOPLANT) {
    hideShowGROWBUTTON();
  }
  grow();
});
document.getElementById("SELLBERRIES").addEventListener("click", function () {
  if (COUNTER > 0) {
    COUNTER = COUNTER - 1;
    MONEY = MONEY + 1;
    setCookie("CCOUNTER", COUNTER, 30);
    setCookie("CMONEY", MONEY, 30);

    document.getElementById("MONEY").innerText = "Money Amount: " + MONEY;
    document.getElementById("COUNTER").innerText = "Berry Amount: " + COUNTER;
  } else {
    alert("No Berries to Sell!");
  }
});
document.getElementById("HARVESTBUTTON").addEventListener("click", function () {
  if(AUTOHARVEST) {
    hideShowHARVESTBUTTON();
  }
  harvest();
});

function harvest() {
  COUNTER = COUNTER + parseInt(Math.random() * 3 + 1);
  setCookie("CCOUNTER", COUNTER, 30);
  setCookie("CMONEY", MONEY, 30);

  document.getElementById("COUNTER").innerText = "Berry Amount: " + COUNTER;
  changeImage();
  hideShowHARVESTBUTTON();
  hideShowGROWBUTTON();
  console.log(AUTOPLANT);
  if(AUTOSELL) {
     
    console.log("AUTOSELLING")
      while(COUNTER >0) {
        COUNTER = COUNTER - 1;
        MONEY = MONEY + 1;
        document.getElementById("MONEY").innerText = "Money Amount: " + MONEY;
        document.getElementById("COUNTER").innerText = "Berry Amount: " + COUNTER;
      }
       
  }
  if (AUTOPLANT) {
    //https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
    setTimeout(function() {
      grow();
}, 2000);
  }

  
}
//https://stackoverflow.com/questions/16903605/hide-button-after-click-with-existing-form-on-page
function hideShowGROWBUTTON() {
  if (
    document.getElementById("GROWBUTTON").style.display != "none" ||
    AUTOPLANT === true
  ) {
    document.getElementById("GROWBUTTON").style.display = "none";
  } else {
    document.getElementById("GROWBUTTON").style.display = "inline-block";
  }
}
function hideShowHARVESTBUTTON() {
  if (
    document.getElementById("HARVESTBUTTON").style.display != "none" ||
    AUTOHARVEST === true
  ) {
    document.getElementById("HARVESTBUTTON").style.display = "none";
  } else {
    document.getElementById("HARVESTBUTTON").style.display = "inline-block";
  }
}

function changeImage() {
  if (document.getElementById("BERRYFARM").src == BROWN) {
    document.getElementById("BERRYFARM").src = GREEN;
  } else if (document.getElementById("BERRYFARM").src == GREEN) {
    document.getElementById("BERRYFARM").src = RED;
  } else if (document.getElementById("BERRYFARM").src == RED) {
    document.getElementById("BERRYFARM").src = BROWN;
  }
}
function setTime() {
  const growTime = 30 - SPARKITAMOUNT * 5;
  RANDGROWTIME = parseInt(Math.random() * 20 + growTime);
  const d = new Date();
  document.getElementById("GROWTIME").innerText =
    "Grow time: 00:" + RANDGROWTIME;
}

//https://jsfiddle.net/wr1ua0db/544/
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var refreshId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = 0;
      changeImage();
      if (AUTOHARVEST === false) {
        hideShowHARVESTBUTTON();
      } else {
        setTimeout(function() {
        harvest();
}, 2000);

      }
      clearInterval(refreshId);
    }
  }, 1000);
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
