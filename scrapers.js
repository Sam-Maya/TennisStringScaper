const puppeteer = require('puppeteer')
const fs = require('fs')

const fields = [
    'String',
    'Material',
    'Stiffness (lb/in)',
    'Tension Loss (%)',
    'Spin Potential'
]

let allStringsData = []

let table = []

const finalObject = {};


async function scrapeString(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

//loops through the 5 td of the string and console logs each
    for(let j = 2; j <= 736; j++){
        for( let i = 1; i <= 5; i++){
            const [el] = await page.$x(`//*[@id="searchresults"]/tbody/tr[${j}]/td[${i}]`)
            const td = await el.getProperty('textContent')
            const tdItem = await td.jsonValue()

            table.push(tdItem)
        }
        
        const string = fields.reduce((obj, field, fieldIndex) => ({ ...obj, [field] : table[fieldIndex]}), {})
   
        allStringsData.push(string)
        
        table = []

    }

    allStringsData.forEach((item) => {
        finalObject[item["String"]] = item;
    })

    fs.writeFileSync('stringDataBase.js', JSON.stringify(finalObject, null, 2) , 'utf-8')
    
    browser.close()
}

scrapeString('http://127.0.0.1:5500/index.html')
