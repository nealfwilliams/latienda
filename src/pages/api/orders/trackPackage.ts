async function run(){
const query = new URLSearchParams({
    locale: 'en_US',
    returnSignature: 'false',
    returnMilestones: 'false'
  }).toString();
  
  const inquiryNumber = '1ZX1Y6990348772616';
  const resp = await fetch(
    `https://wwwcie.ups.com/api/track/v1/details/${inquiryNumber}?${query}`,
    {
      method: 'GET',
      headers: {
        transId: 'string',
        transactionSrc: 'testing',
        Authorization: `Bearer ${data.access_token}`
      }
    }
  );
  
  const data = await resp.text();
  console.log(data);
}

run();