// require your node module
const bot = require("puppeteer");
// var openBrowser = require('open-web-browser');
const fs = require("fs");
// const useProxy = require('puppeteer-page-proxy')   
const useProxy = require('puppeteer-page-proxy');

//we will set the proxy user name and password 
let proxyUsername = "gMo4XNwjx";
let proxyPassword = "7LHAxLObMY5";


// we will be getting a random item from a link (json file)
async function getRandomItem(link){
    let data = await fs.readFileSync(link,  "utf-8")
    let processedData = JSON.parse(data)
    let processDataLength = processedData.length;
    let urlIndex = Math.floor(Math.random() * processDataLength)
    return (processedData[urlIndex])
}

async function runAdsenseBot(){

    const botConfiguration = {
        headless: false
    }

    let userAgent = await getRandomItem('./assets/list-of-UA.json')
    console.log("we have picked a user agent", userAgent)  

    let url = await getRandomItem('./assets/list-of-links.json')
    console.log("we have picked a link", url)  

    let proxy = await getRandomItem("./assets/list-of-proxy.json")
    console.log("we have picked this proxy;", proxy)

    const chromeBrowser = await bot.launch(botConfiguration)
    
    try{
        const chromeBrowserPage = await chromeBrowser.newPage()
        await useProxy(chromeBrowserPage,"socks://gMo4XNwjx:7LHAxLObMY5@syd.socks.ipvanish.com:1080") 
        await chromeBrowserPage.setUserAgent(userAgent)
        await chromeBrowserPage.goto("http://whoer.net/")
    }catch (e){
    
    } finally {
        setTimeout( function(){
            chromeBrowser.close()
            runAdsenseBot
        },10000 )
    }  
}

runAdsenseBot()