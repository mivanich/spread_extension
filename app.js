function calcSpreadStr(sell, buyout) {
    return ((sell - buyout) / buyout * 100).toFixed(2);
}

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

function parseZolotoMdPrice(priceStr) {
    try {
        return parseInt(priceStr.replace(" ", ""));
    } catch (e) {
        return null;
    }
}

if (document.URL.startsWith("https://zoloto-md.ru/")) {
    { // show value for a main coin on a page
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
                
                var buyoutPrice = null;
                if (buyoutDiv) {
                    var byuoutValueStr = buyoutDiv.firstChild.textContent.replace(" ", '');            
                    var buyoutPrice = parseInt(byuoutValueStr);
                }
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
    
    { // show spreads for coins in a catalog page
        var sheet = document.createElement('style')
        sheet.innerHTML = ".product-list_item:hover .hover-price { max-height: 240px; } .product_spread>span{display:inline-block;width:67%;text-align:left;font-size:24px;font-weight:700;padding-left:10px;color:#0460de} .product_spread>label{width:33%;text-align:right}.product-list_item .product_spread>label,.product-list_item .product_spread>span{display:block;width:100%;margin-top:5px;padding-left:20px;text-align:center}.product-list_item .product_spread>label:first-child{margin-top:0}   .product_spread>span{display:inline-block;width:67%;text-align:left;font-size:24px;font-weight:700;padding-left:10px;color:#0460de}.product_spread span>span{font-size:16px;padding-left:5px}.pi-table .product_spread>div,.product_spread span>div{display:inline}.pi-table .product_spread>span{width:auto;font-weight:400;font-size:12px;padding-left:4px;color:#666e70}";

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
                    spreadGeneralContainer.setAttribute("class", "product_spread");
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
    
    {   // show spread for additional coins on a main-coin page
        var allAuxCoins = document.getElementsByClassName("js-product product-list_item");
        if (allAuxCoins && allAuxCoins.length > 0) {
            for (var i = 0; i < allAuxCoins.length; i++) {
                var coin = allAuxCoins[i];
                var buyoutElement = coin.getElementsByClassName("js-price-buyout");
                var sellElement = coin.getElementsByClassName("js-price");
                
                if ((!buyoutElement || buyoutElement.length == 0) || (!sellElement || sellElement.length == 0)) {
                    continue;
                }
                buyoutElement = buyoutElement[0];
                sellElement = sellElement[0];
                
                buyoutPriceStr = buyoutElement.textContent;
                sellPriceStr = sellElement.textContent;
                
                var buyoutPrice = parseZolotoMdPrice(buyoutPriceStr);
                var sellPrice = parseZolotoMdPrice(sellPriceStr);
                
                if (!buyoutPrice || !sellPrice) {
                    continue;
                }
                
                var spread = (sellPrice - buyoutPrice) / buyoutPrice * 100;
                
                var hoverPrice = sellElement.parentElement.parentElement.parentElement;
                var spreadGeneralContainer = document.createElement("div");
                spreadGeneralContainer.setAttribute("class", "product_spread");
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
            }
        }
    }    
}

//  document.getElementsByClassName('coins-tile__prices')
if (document.URL.startsWith("https://www.zolotoy-zapas.ru/")) {
    var sheet = document.createElement('style')
    
    sheet.innerHTML = ".card__table-spread td {color: #0460de;} .card_cell-spread .card_cell-spread {display: none;} @media (min-width: 1139px) and (max-width: 1919px) {.card__table-spread {width: 254px;}} @media only screen and (max-width: 610px) { .card_features .card__table-spread, .card_features .card__table-sale, .card_features .card__table-purchase { border: 1px solid #999; width: 100%; } .card_features .card__table-sale td, .card_features .card__table-spread td, .card_features .card__table-purchase td { padding: 0 3%; } .card_features .card__table-sale { margin-bottom: 20px; } .card_features .card__cell-award-val._empty {text-align: center;} .card_features .card__cell-award::before {top: 4px;} .card_features th.card__cell-state { padding-left: 9px; } }@media (min-width: 991px) and (max-width: 1279px) {.card_features .card__table-spread td,{ padding: 0 2%; } .card_features .card__table-spread .card__cell-cost { padding-left: 10%; }";
    
    document.body.appendChild(sheet);
    
    const cardMarket = document.querySelector('.card__market');
    if (cardMarket) {
        const sellTable = cardMarket.querySelector('.card__table-purchase');
        const buyoutTable = cardMarket.querySelector('.card__table-sale');
        
        const sellElem = sellTable.querySelector('td.card__cell-cost');
        const buyoutElem = buyoutTable.querySelector('td.card__cell-cost');
        
        let spreadTable = document.createElement('table');
        spreadTable.className = 'card__table-spread';
        cardMarket.appendChild(spreadTable);
        
        let thead = document.createElement('thead');
        spreadTable.appendChild(thead);
        
        let th1 = document.createElement('th');
        th1.textContent="Спред";
        th1.className = 'card__cell-cost';
        let th2 = document.createElement('th');
        // th2.textContent="Спред за унцию";
        th2.className = 'card__cell-award';
        let th3 = document.createElement('th');
        th3.textContent=' ';
        let trHead = document.createElement('tr');
        thead.appendChild(trHead);
        trHead.appendChild(th1);
        trHead.appendChild(th2);
        trHead.appendChild(th3);
        
        let tbody = document.createElement('tbody');
        spreadTable.appendChild(tbody);
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        
        let tdCoinSpred = document.createElement('td');
        tdCoinSpred.className='card__cell-cost';
        tr.appendChild(tdCoinSpred);
        
        let tdExchangeSpread = document.createElement('td');
        tdExchangeSpread.className='card__cell-exchange-spread';
        tr.appendChild(tdExchangeSpread);
        
        
        if (sellElem && buyoutElem) {
            const sellPrice = parseInt(sellElem.textContent.trim().replaceAll(' ', ''));
            const buyoutPrice = parseInt(buyoutElem.textContent.trim().replaceAll(' ', ''));        
            tdCoinSpred.textContent=calcSpreadStr(sellPrice, buyoutPrice) + "%";
        } else {
            tdCoinSpred.textContent="-";
        }
    }
}