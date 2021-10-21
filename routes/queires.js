const { request } = require('express');
const moment = require('moment');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL = 'postgresql://emxscnsfesbxcy:911fd3b39c19e7b30c94b0965174e752c08686a2b66d5b3e77113c769aee2665@ec2-23-22-243-103.compute-1.amazonaws.com:5432/ddi7pvl5ctf0lr',
  ssl: {
    rejectUnauthorized: false
  }
});

let client = null;
(async () => {
  client = await pool.connect();
})();

const getStudents = async (req, res) => {
    try {
      const result = await client.query('SELECT student_id, firstname, lastname, dob, sex, email, epigram, status, education_status, graduate_year, major_id, public_relation_id, image_profile FROM pro.student');
      const results = { 'results': (result) ? result.rows : null };
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }

  module.exports = {
      getStudents
  }