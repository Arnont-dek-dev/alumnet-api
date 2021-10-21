const { request } = require('express');
const moment = require('moment');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL = 'postgresql://emxscnsfesbxcy:911fd3b39c19e7b30c94b0965174e752c08686a2b66d5b3e77113c769aee2665@ec2-23-22-243-103.compute-1.amazonaws.com:5432/ddi7pvl5ctf0lr',
  ssl: {
    rejectUnauthorized: false
  }
});

