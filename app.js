function createSpreadContainer(spread) {
    var pricesContainer = document.getElementsByClassName("pr-wrap product_price-box pi-row    product_price-box__discount")[0];
    pricesContainer = pricesContainer.firstElementChild;
    
    var spreadDivContainer = document.createElement("div");
    spreadDivContainer.setAttribute("class", "wrap_buy pi-col-lg-4");
    pricesContainer.appendChild(spreadDivContainer);
    
    var pSpreadElem = document.createElement("p");
    pSpreadElem.setAttribute("class", "title_sale");
    pSpreadElem.textContent="Спред";
    
    spreadDivContainer.appendChild(pSpreadElem);
    
    var divProductSpread = document.createElement("div");
    divProductSpread.setAttribute("class", "product_price product_price__buyout");
    spreadDivContainer.appendChild(divProductSpread);
    
    var spreadSpan = document.createElement("span");
    divProductSpread.appendChild(spreadSpan);
    
    var divSpreadValue = document.createElement("div");
    divSpreadValue.setAttribute("class", "js-price-buyout");
    
    if (spread != null) {
        divSpreadValue.textContent = spread.toFixed(2);
        spreadSpan.appendChild(divSpreadValue);
        
        var percentSymbolSpan = document.createElement("span");
        percentSymbolSpan.textContent = "%"
        spreadSpan.appendChild(percentSymbolSpan);
    } else {
        divSpreadValue.textContent = "-";
        spreadSpan.appendChild(divSpreadValue);
    }
}


if (false && document.URL.startsWith("https://zoloto-md.ru/bullion-coins/")) { // TODO: uncomment
    var labelSpread = document.createElement("label");
    
    var page = document.getElementById('page');
    
    var price_product = page.getElementsByClassName("product_price")[0]
    var priceStr = price_product.childNodes[5].content; // THAT CAUSES ISSUE ON THE PAGES, DIFFERENT FROM PAGES WITH A SINGLE COIN
    var sellPrice = parseInt(priceStr);
    
    var buyoutDiv = page.getElementsByClassName("js-price-buyout")[0];
    
    var byuoutValueStr = buyoutDiv.firstChild.textContent.replace(" ", '');
    
    var buyoutPrice = parseInt(byuoutValueStr);
    
    if (buyoutPrice && sellPrice) {
        var spread = (sellPrice - buyoutPrice) / buyoutPrice * 100
        createSpreadContainer(spread);
    } else {
        createSpreadContainer(null);
    }
}


if (document.URL.startsWith("https://zoloto-md.ru/")) {
    /*var cssRule = document.styleSheets[2].cssRules[3455];
    if (!cssRule) {
        console.log("cssRule 3455 is not found");
    } else {
        cssRule.style.maxHeight = '240px'; // change constants!
    }*/
    
    var sheet = document.createElement('style')
    sheet.innerHTML = ".product-list_item:hover .hover-price { max-height: 240px; }";
    document.body.appendChild(sheet);
    
    var sheet2 = document.createElement('style')
    sheet2.innerHTML = ".product_price2>span{display:inline-block;width:67%;text-align:left;font-size:24px;font-weight:700;padding-left:10px;color:#ff9112}";
    document.body.appendChild(sheet2);
   
    
    var coins = document.getElementsByClassName("pi-col-lg-4 pi-col-md-4 pi-col-xs-6");
    if (coins) {
        for (var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            var sell = coin.getElementsByClassName("js-price")[0]
            var buyout = coin.getElementsByClassName("js-price-buyout")[0]
            
            var sellPriceStr = sell ? sell.textContent : null;
            var buyoutPriceStr = buyout ? buyout.textContent : null;
            
            if (sellPriceStr && buyoutPriceStr) {
                var sellPrice = parseInt(sellPriceStr.replace(" ", ""));
                var buyoutPrice = parseInt(buyoutPriceStr.replace(" ", ""));
                // console.log("sell: " + sellPrice + ", buy: " + buyoutPrice);
                var spread = (sellPrice - buyoutPrice) / buyoutPrice * 100;
                console.log("Spread: " + spread.toFixed(2));
                
                var hoverPrice = coin.getElementsByClassName("hover-price")[0];
                var spreadGeneralContainer = document.createElement("div");
                spreadGeneralContainer.setAttribute("class", "product_price2");
                hoverPrice.appendChild(spreadGeneralContainer);
                
                var spreadDescription = document.createElement("label");
                spreadDescription.textContent = "Спред";
                spreadGeneralContainer.appendChild(spreadDescription);
                
                var spreadValueGeneralContainer = document.createElement("span");
                spreadGeneralContainer.appendChild(spreadValueGeneralContainer);
                
                var spreadActualValue = document.createElement("span");
                spreadActualValue.setAttribute("class", "js-price-club2");
                spreadActualValue.textContent = spread.toFixed(2) + " %";
                spreadValueGeneralContainer.appendChild(spreadActualValue);
                
                // hoverPrice.firstElementChild.remove(); // TODO: maybe make something with it? 
                
                
            } else {
                console.log("Price not set: " + sellPriceStr + " | " + buyoutPriceStr);
            }
            
            //console.log("Coin " + i + ". Sell: " + sell.textContent + ", buyout " + (buyout ? buyout.textContent : "undefined"));
        }
    }
}