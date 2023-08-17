const fs = require('fs');
const nodex12 = require('node-x12');


// Read the EDI file content
const ediContent = fs.readFileSync('./riteaid-850.edi', 'utf-8');

// Initialize the X12Parser
const parser = new nodex12.X12Parser();

const delimiters = new nodex12.X12Interchange({
  elementDelimiter: '*',
  segmentTerminator: '~'
});

// Parse the EDI content
const parsedEdi = parser.parse(ediContent, delimiters);

// console.log({parsedEdi});

// Access the functionalGroups array
const functionalGroups = parsedEdi.functionalGroups;

const map = {
  poNumber: 'BEG03',
  poDate: 'BEG05',
  RiteAidEdiTradingPartner: 'REF02',
  buyerName: 'PER02',
  buyerPhone: 'PER04',
  itemDescription: 'PID05'
  
}

functionalGroups.forEach(group => {
  group.transactions.forEach(transaction => {
    console.log(transaction.toObject(map));
  })
})
