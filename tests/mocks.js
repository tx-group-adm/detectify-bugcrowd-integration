const findingsMock = {
  uuid: 'e26b149d-a124-44a6-a6c0-test',
  report_token: '11ed472293aa5c466adc6afa3b0etest',
  scan_profile_token: '36df7ce57023ca2fa70716test',
  signature: 'ca0f490a28802de0b1ef231816test',
  url: 'https://detectify.com/report/36df7ce57023ca2fa707160test/11ed472293aa5c466adc6afa3b0e7test/e26b149d-a124-44a6-a6c0-testS/',
  title: 'JavaScript webpack sourcemap disclosure',
  found_at: 'https://login-igr.tagesanzeiger.ch/_next/static/chunks/commons.5459f0bd41ac674979bc.js.map',
  timestamp: '2020-08-16T01:48:47Z',
  definition: {
    uuid: 'd36ce0b7-9540-4cba-97c3-test',
    description: 'Are you aware of that this file exists? This file may contain sensitive information.',
  },
  score: [
    {
      version: '2.0',
      score: 3.3,
      vector: 'AV:N/AC:L/Au:N/C:P/I:N/A:N/E:U/RL:OF/RC:UC',
    },
  ],
};

const submissionMock = {
  uuid: 'ac0ca949-4c0c-409e-8162-test',
  bounty_brief_id: 14829,
  bounty_code: 'apitest-6dy5n',
  bug_url: 'https://login-igr.tagesanzeiger.ch/_next/static/chunks/commons.5459f0bd41ac674979bc.js.map',
  caption: 'JavaScript webpack sourcemap disclosure',
  description_markdown: 'Are you aware of that this file exists? This file may contain sensitive information.',
  submitted_at: '2020-08-16T01:52:49.796Z',
  source: 'api',
  substate: 'unresolved',
  title: 'JavaScript webpack sourcemap disclosure',
  bounty: {
    bounty_type: 'ongoing',
    code: 'apitest-6dy5n',
    custom_field_labels: [],
    name: 'api_test',
  },
};

const bountiesMock = {
  bounty_type: 'ongoing',
  code: 'apitest-6dy5n',

  description_markdown:
    'Our company recognizes the importance of security, privacy and community, and values the input of hackers acting in good-faith to help us maintain a high standard for our users. This includes encouraging responsible vulnerability research and the disclosure of security vulnerabilities. ',

  name: 'api_test',

  targets_overview_markdown:
    "Testing is only authorized on the targets listed as In-Scope. _Any domain/property of {company} not listed in the targets section is out of scope. This includes any/all subdomains not listed above._ If you believe you've identified a vulnerability on a system outside the scope, please reach out to support@bugcrowd.com before submitting. ----- ##Access: ###Credentials: ##Focus Areas: - one - two ----- ##Out-of-Scope - one - two ------ ##Safe Harbor: **When conducting vulnerability research according to this policy, we consider this research to be:** - Authorized in accordance with the Computer Fraud and Abuse Act (CFAA) (and/or similar state laws), and we will not initiate or support legal action against you for accidental, good faith violations of this policy; - Exempt from the Digital Millennium Copyright Act (DMCA), and we will not bring a claim against you for circumvention of technology controls; - Exempt from restrictions in our Terms & Conditions that would interfere with conducting security research, and we waive those restrictions on a limited basis for work done under this policy; and - Lawful, helpful to the overall security of the Internet, and conducted in good faith. - You are expected, as always, to comply with all applicable laws. _If at any time you have concerns or are uncertain whether your security research is consistent with this policy, please inquire via support@bugcrowd.com before going any further._ ",
  tagline: 'Bug Bounty Program - Powered by Bugcrowd',

  uuid: '357a81ca-92b7-4b60-9548-test',
  organization: {
    name: 'TX Group',
    uuid: '7d844c76-6444-4b01-aecc-test',
  },
};

module.exports = {
  submissionMock,
  findingsMock,
  bountiesMock,
};
