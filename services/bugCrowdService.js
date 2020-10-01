const fetch = require('node-fetch');

const BugCrowdEndpoint = 'https://api.bugcrowd.com';
const headers = {
  Accept: 'application/vnd.bugcrowd+json',
  'Content-Type': 'application/json',
  Authorization: `Token ${process.env.BUG_CROWD_TOKEN}`,
};

module.exports.createSubmission = async (findings) => {
  // bounty_uuid 357a81ca-92b7-4b60-9548-5a64533c5cca
  // to get this uuid you should run first (GET) https://api.bugcrowd.com/bounties route
  const path = `/bounties/${process.env.BOUNTY_UUID}/submissions`;
  const url = `${BugCrowdEndpoint}${path}`;
  const body = {
    submission: {
      title: findings.title,
      bug_url: findings.found_at,
      description_markdown: findings.definition.description,
      priority: scoreCalculation(findings.score[0].score),
      substate: 'unresolved',
      extra_info_markdown: findings.definition.risk,
      researcher_email: 'security@tx.group',
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  return res.json();
};

module.exports.getBounties = async () => {
  const path = '/bounties';
  const url = `${BugCrowdEndpoint}${path}`;

  const res = await fetch(url, {
    method: 'GET',
    headers,
  });
  return res.json();
};

function scoreCalculation(score) {
  switch (true) {
    case score <= 3.9:
      return 1;
    case score > 3.9 && score <= 6.9:
      return 3;
    case score > 6.9:
      return 5;
    default:
      return Math.floor(score);
  }
}
module.exports.scoreCalculation = scoreCalculation;
