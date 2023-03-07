const development: object = {
  'Port': '3001',
  'MongoDB': '',
  'SecretKey': ''
};

const stage: object = {
  'Port': '3001',
  'MongoDB': '',
  'SecretKey': ''
};

const production: object = {
  'Port': '3001',
  'MongoDB': '',
  'SecretKey': ''
};

const config: any = process.env.NODE_ENV == 'production' ? production : process.env.NODE_ENV == 'stage' ? stage : development;

export default {
  ...config
}
