const { getTestFindings } = require('../services/detectifyService');
const { createSubmission, getBounties } = require('../services/bugCrowdService');

module.exports.receiveWebhook = async (req, res) => {
  const event = req.body;
  // url mapping, for fetching findings
  console.log('EVENT', event);
  const url = (event.finding_url || '').replace('https://detectify.com/report', '/v2/findings');

  if (url !== '') {
    const findings = await getTestFindings(url);
    console.log('findings', findings);

    const submission = await createSubmission(findings);
    console.log('submission', submission);
    res.sendStatus(200);
  }
};

module.exports.getBounties = async (req, res) => {
  const response = await getBounties();
  res.send(JSON.stringify(response, null, 3));
};
