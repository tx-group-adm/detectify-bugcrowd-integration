const { getFindings } = require('../services/detectifyService');
const { createSubmission, getBounties } = require('../services/bugCrowdService');
const { errorHandling } = require('../utils/index');

module.exports.receiveWebhook = async (req, res) => {
  try {
    const event = req.body;
    // url mapping, for fetching findings
    console.log('EVENT', event);
    const url = (event.finding_url || '').replace('https://detectify.com/report', '/v2/findings');
    console.log('URL', url);
    if (url !== '') {
      const findings = await getFindings(url);
      console.log('findings', findings);

      const submission = await createSubmission(findings);
      console.log('submission', submission);
      res.sendStatus(200);
    }
  } catch (error) {
    errorHandling(error.message, error, res);
  }
};

module.exports.getBounties = async (req, res) => {
  const response = await getBounties();
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).send(JSON.stringify(response, null, 3));
};
