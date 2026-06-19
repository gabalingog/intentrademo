// scripts/convertCatalog.js
const ExcelJS = require('exceljs')
const fs = require('fs')

const SHEETS = ['JACKETS & VESTS - clothing all ', 'TOPS - clothing all gender', 'PANTS & SHORTS - clothing all g', 'ACCESSORIES - clothing all gend']

async function run() {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile('src/data/mammut_catalog-2.xlsx')
  const all = []
  for (const sheetName of SHEETS) {
    const ws = wb.getWorksheet(sheetName)
    const headers = ws.getRow(1).values.slice(1)
    ws.eachRow((row, rowNum) => {
      if (rowNum === 1) return
      const values = row.values.slice(1)
      const obj = {}
      headers.forEach((h, i) => { obj[h] = values[i] ?? null })
      if (obj.product_name) all.push(obj)
    })
  }
  fs.writeFileSync('src/data/products.json', JSON.stringify(all, null, 2))
}
run()