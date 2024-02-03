// // import fetch from 'node-fetch';

// async function run() {
//   const formData = {
//     grant_type: 'authorization_code',
//     code: 'string',
//     redirect_uri: 'string'
//   };

//   const resp = await fetch(
//     `https://wwwcie.ups.com/v1/oauth/token`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: 'Basic ' + Buffer.from('testAccount536:ThisIsATestPass69!').toString('base64')
//       },
//       body: new URLSearchParams(formData).toString()
//     }
//   );

//   const data = await resp.text();
//   console.log(data);
// }

// run();
// import fetch from 'node-fetch';

async function run() {
  const formData = {
    grant_type: 'client_credentials'
  };

  const resp = await fetch(
    `https://onlinetools.ups.com/security/v1/oauth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-merchant-id': 'G2504G',
        Authorization: 'Basic ' + Buffer.from('BrNKGc2m9SOEvRWWShGsxsJ1im2Lpbmwt2AV3PQiPdvPOo1V:mwAKwTqgMltBYNG8m5z0KIOyOY0KU6O0UIWgWoY19cFSS3wu6HoCoNmAmNnAAAw3').toString('base64')
      },
      body: new URLSearchParams(formData).toString()
    }
  );

  const data = await resp.json();
  //console.log(data.access_token);




  const query = new URLSearchParams({
    locale: 'en_US',
    returnSignature: 'false',
    returnMilestones: 'false'
  }).toString();
  
  const inquiryNumber = '1ZX1Y6990348772616';
  const resp1 = await fetch(
    `https://onlinetools.ups.com/api/track/v1/details/${inquiryNumber}?${query}`,
    {
      method: 'GET',
      headers: {
        transId: 'string',
        transactionSrc: 'testing',
        Authorization: `Bearer ${data.access_token}`
      }
    }
  );
  
  const data1 = await resp1.json();
  console.log(data1.trackResponse.shipment[0].package[0].currentStatus.description);
}

run();