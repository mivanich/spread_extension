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


if (document.URL.startsWith("https://zoloto-md.ru/")) {
    var sellWrapper = document.getElementsByClassName("wrap_sale pi-col-lg-8");
    var buyoutWrapper = document.getElementsByClassName("wrap_buy pi-col-lg-4");
    
    if ((sellWrapper && sellWrapper.length > 0) && (buyoutWrapper && buyoutWrapper.length > 0)) {
        sellWrapper = sellWrapper[0];
        buyoutWrapper = buyoutWrapper[0];
        var price_product = sellWrapper.getElementsByClassName("product_price")[0];
        var priceItem = price_product.querySelector('[itemprop=price]');
        if (!priceItem) {
            console.log("price item for sell is not found");
        } else {
            var priceStr = priceItem.getAttribute("content");
            var sellPrice = parseInt(priceStr);            
            var buyoutDiv = buyoutWrapper.getElementsByClassName("js-price-buyout")[0];            
            var byuoutValueStr = buyoutDiv.firstChild.textContent.replace(" ", '');            
            var buyoutPrice = parseInt(byuoutValueStr);            
            if (buyoutPrice && sellPrice) {
                var spread = (sellPrice - buyoutPrice) / buyoutPrice * 100
                createSpreadContainer(spread);
            } else {
                createSpreadContainer(null);
            }
        }
    } else {
        console.log("One of the sell or buyout wrappers is not found");
    }
}


if (document.URL.startsWith("https://zoloto-md.ru/")) {
    var sheet = document.createElement('style')
    sheet.innerHTML = ".product-list_item:hover .hover-price { max-height: 240px; } .product_price2>span{display:inline-block;width:67%;text-align:left;font-size:24px;font-weight:700;padding-left:10px;color:#0460de} .product_price2>label{width:33%;text-align:right}.product-list_item .product_price2>label,.product-list_item .product_price2>span{display:block;width:100%;margin-top:5px;padding-left:20px;text-align:center}.product-list_item .product_price2>label:first-child{margin-top:0}   .product_price2>span{display:inline-block;width:67%;text-align:left;font-size:24px;font-weight:700;padding-left:10px;color:#0460de}.product_price2 span>span{font-size:16px;padding-left:5px}.pi-table .product_price2>div,.product_price2 span>div{display:inline}.pi-table .product_price2>span{width:auto;font-weight:400;font-size:12px;padding-left:4px;color:#666e70}";

    document.body.appendChild(sheet);
   
    
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
                spreadActualValue.setAttribute("class", "js-price2");
                spreadActualValue.textContent = spread.toFixed(2);
                spreadValueGeneralContainer.appendChild(spreadActualValue);
                
                var percentSymbolSpan = document.createElement("span");
                percentSymbolSpan.textContent = " %";
                spreadValueGeneralContainer.appendChild(percentSymbolSpan);
            } else {
                console.log("Price not set: " + sellPriceStr + " | " + buyoutPriceStr);
            }
        }
    }
}