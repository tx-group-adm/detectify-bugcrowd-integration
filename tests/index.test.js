const fetch = require('node-fetch');

const { Response } = jest.requireActual('node-fetch');
const { makeHeaders, signatureHeaders, getTestFindings } = require('../services/detectifyService');
const { getBounties, createSubmission, scoreCalculation } = require('../services/bugCrowdService');
const { submissionMock, findingsMock, bountiesMock } = require('./mocks');

jest.mock('node-fetch');

// testing keys
const apiKey = '10840b0f938942feafb7186de74b9682';
const secretKey = '0vyTnawJRFn0Q9tWLTM188Olizc72JczHSXoIlsPQIc=';

test('Checking for signature headers', () => {
  const signatureHeadersResult = {
    'X-Detectify-Signature': '6jpu6S4cQwEY4uLk+xELSe1RhajVJP0QEDpGWZ5T+U0=',
    'X-Detectify-Timestamp': 1519829567,
  };
  expect(signatureHeaders(apiKey, secretKey, 'GET', '/v2/domains/', 1519829567, null)).toStrictEqual(signatureHeadersResult);
});

test('scoreCalculation', () => {
  expect(scoreCalculation(2)).toBe(1);
  expect(scoreCalculation(4.4)).toBe(3);
  expect(scoreCalculation(7)).toBe(5);
  expect(scoreCalculation('null value')).toBe(NaN);
});

test('make header from signature', () => {
  const resultHeader = {
    'X-Detectify-Key': apiKey,
    'X-Detectify-Signature': '6jpu6S4cQwEY4uLk+xELSe1RhajVJP0QEDpGWZ5T+U0=',
    'X-Detectify-Timestamp': 1519829567,
  };
  expect(
    makeHeaders({
      apiKey,
      secretKey,
      method: 'GET',
      path: '/v2/domains/',
      timestamp: 1519829567,
      body: null,
    })
  ).toStrictEqual(resultHeader);
});

beforeEach(() => {
  fetch.mockClear();
});

test('getTestFindings', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(findingsMock))));

  const url = '/v2/findings/report/36df7ce57023ca2ftest/e31bd6160eaf1d212db348cc9test/66bcf6d0-4ca0-42ae-test/';
  const response = await getTestFindings(url);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(response).toMatchSnapshot();
  expect(response).toEqual(findingsMock);
});

test('getBounties', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(bountiesMock))));

  const response = await getBounties();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(response).toMatchSnapshot();
  expect(response).toEqual(bountiesMock);
  expect(response).toHaveProperty('uuid');
  expect(fetch).toHaveBeenCalledWith('https://api.bugcrowd.com/bounties', {
    headers: {
      Accept: 'application/vnd.bugcrowd+json',
      Authorization: `Token ${process.env.BUG_CROWD_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
});

test('createSubmission', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(submissionMock))));
  const response = await createSubmission(findingsMock);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(response).toEqual(submissionMock);
  expect(fetch).toHaveBeenCalledWith(`https://api.bugcrowd.com/bounties/${process.env.BOUNTY_UUID}/submissions`, {
    headers: {
      Accept: 'application/vnd.bugcrowd+json',
      Authorization: `Token ${process.env.BUG_CROWD_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      submission: {
        title: findingsMock.title,
        bug_url: findingsMock.found_at,
        description_markdown: findingsMock.definition.description,
        priority: scoreCalculation(findingsMock.score[0].score),
        substate: 'unresolved',
        extra_info_markdown: findingsMock.definition.risk,
        researcher_email: 'security@tx.group',
      },
    }),
  });
  expect(response).toMatchSnapshot();
});
