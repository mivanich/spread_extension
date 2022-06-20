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


if (document.URL.startsWith("https://zoloto-md.ru/bullion-coins/")) {
    var labelSpread = document.createElement("label");
    
    var page = document.getElementById('page');
    
    var price_product = page.getElementsByClassName("product_price")[0]
    var priceStr = price_product.childNodes[5].content;
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

