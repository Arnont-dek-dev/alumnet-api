const { request } = require('express');
const { firebase } = require('googleapis/build/src/apis/firebase');
const moment = require('moment');
const { token } = require('morgan');
const admin = require('firebase-admin')

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

// --------- CRUD All Table -------------- //

// --------------- Table Student ------------------//
const getStudents = async (req, res) => {
  try {
    const result = await client.query(`SELECT student_id, firstname, lastname, dob, sex, email, epigram, status, education_status, graduate_year, major_id, public_relation_id, image_profile FROM student`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createStudents = async (req, res) => {
  try {
    console.log(req.body);
    const result = await client.query(`INSERT INTO student (student_id, firstname, lastname, dob, sex, email, epigram, status, education_status, graduate_year, major_id, public_relation_id, image_profile) 
      VALUES('${req.body.student_id}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.dob}', '${req.body.sex}', '${req.body.email}', '${req.body.epigram}', 
      '${req.body.status}', '${req.body.education_status}', '${req.body.graduate_year}', ${req.body.major_id}, ${req.body.public_relation_id}, '${req.body.image_profile}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateStudents = async (req, res) => {
  try {
    const result = await client.query(`UPDATE student SET student_id='${req.body.student_id}', firstname='${req.body.firstname}', lastname='${req.body.lastname}', 
      dob='${req.body.dob}', sex='${req.body.sex}', email='${req.body.email}', epigram='${req.body.epigram}', status='${req.body.status}',education_status='${req.body.education_status}', 
      graduate_year='${req.body.graduate_year}', major_id=${req.body.major_id}, public_relation_id=${req.body.public_relation_id}, image_profile='${req.body.image_profile}' 
      where student_id = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteStudents = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM student WHERE  student_id='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}



// --------------- Table Adddress ------------------//
const getAddress = async (req, res) => {
  try {
    const result = await client.query(`SELECT address_id, student_id, name, house_number, soi, street, tumbon, amphone, province, postcode, country, lattitude, longitude FROM address`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createAddress = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO address (student_id, "name", house_number, soi, street, tumbon, amphone, province, postcode, country, lattitude, longitude) 
    VALUES('${req.body.student_id}', '${req.body.name}', '${req.body.house_number}', '${req.body.soi}', '${req.body.street}', '${req.body.tumbon}', '${req.body.amphone}',
     '${req.body.province}', '${req.body.postcode}', '${req.body.country}', ${req.body.lattitude}, ${req.body.longitude})`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateAddress = async (req, res) => {
  try {
    const result = await client.query(`UPDATE address SET  student_id='${req.body.student_id}', "name"='${req.body.name}', house_number='${req.body.house_number}', 
    soi='${req.body.soi}', street='${req.body.street}', tumbon='${req.body.tumbon}',amphone='${req.body.amphone}', province='${req.body.province}', postcode='${req.body.postcode}', 
    country='${req.body.country}', lattitude=${req.body.lattitude}, longitude=${req.body.longitude}  where student_id = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteAddress = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM address WHERE student_id='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


// --------------- Table Admin ------------------//
const getAdmin = async (req, res) => {
  try {
    const result = await client.query(`SELECT email, faculty_id, campus_id, firstname, lastname FROM "admin"`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    // client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createAdmin = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO "admin" (email, faculty_id, campus_id, firstname, lastname) VALUES('${req.body.email}', ${req.body.faculty_id}, 
    ${req.body.campus_id}, '${req.body.firstname}', '${req.body.lastname}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateAdmin = async (req, res) => {
  try {
    const result = await client.query(`UPDATE "admin" SET email='${req.body.email}', faculty_id=${req.body.faculty_id}, campus_id=${req.body.campus_id}, 
    firstname='${req.body.firstname}', lastname='${req.body.lastname}' where email = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteAdmin = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM "admin" WHERE email = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


// --------------- Table campus ------------------//
const getCampus = async (req, res) => {
  try {
    const result = await client.query(`SELECT campus_id, "name" FROM campus`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createCampus = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO campus ("name") VALUES('${req.body.name}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateCampus = async (req, res) => {
  try {
    const result = await client.query(`UPDATE campus SET "name"='${req.body.name}' where name = '${req.params.id}' `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteCampus = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM campus WHERE  "name"='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


// --------------- Table faculty ------------------//
const getFaculty = async (req, res) => {
  try {
    const result = await client.query(`SELECT faculty_id, "name", campus_id FROM faculty`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createFaculty = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO faculty ("name", campus_id) VALUES('${req.body.name}', ${req.body.campus_id})`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateFaculty = async (req, res) => {
  try {
    const result = await client.query(`UPDATE faculty SET  "name"='${req.body.name}', campus_id=${req.body.campus_id} where name = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteFaculty = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM faculty WHERE  "name"='${req.params.id}' `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


// --------------- Table major ------------------//
const getMajor = async (req, res) => {
  try {
    const result = await client.query(`SELECT major_id, "name", faculty_id FROM major`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createMajor = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO major ("name", faculty_id) VALUES('${req.body.name}', ${req.body.faculty_id})`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateMajor = async (req, res) => {
  try {
    const result = await client.query(`UPDATE major SET "name"='${req.body.name}', faculty_id=${req.body.faculty_id} where name = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteMajor = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM major WHERE  "name"='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


// --------------- Table Public Relation ------------------//
const getPublic_relation = async (req, res) => {
  try {
    const result = await client.query(`SELECT public_relation_id, title, "content", image, start_activity, finish_activity, graduate_year, status, major_id, create_by FROM public_relation`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    // client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createPublic_relation = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO public_relation (title, "content", image, start_activity, finish_activity, graduate_year, status, major_id, create_by) 
    VALUES('${req.body.title}', '${req.body.content}', '${req.body.image}', '${req.body.start_activity}', '${req.body.finish_activity}', '${req.body.graduate_year}',
     '${req.body.status}', ${req.body.major_id}, '${req.body.create_by}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updatePublic_relation = async (req, res) => {
  try {
    const result = await client.query(`UPDATE public_relation SET  title='${req.body.title}', "content"='${req.body.content}', image='${req.body.image}', 
    start_activity='${req.body.start_activity}', finish_activity='${req.body.finish_activity}', graduate_year='${req.body.graduate_year}', status='${req.body.status}', 
    major_id=${req.body.major_id}, create_by='${req.body.create_by}' where public_relation_id = '${req.params.id}' `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deletePublic_relation = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM public_relation WHERE  public_relation_id=${req.params.id} `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

// --------------- Table Student Contact ------------------//
const getStudent_contact = async (req, res) => {
  try {
    const result = await client.query(`SELECT student_contact_id, student_id, contact_type, contact_url FROM student_contact`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createStudent_contact = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO student_contact (student_id, contact_type, contact_url) 
    VALUES('${req.body.student_id}', '${req.body.contact_type}', '${req.body.contact_url}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateStudent_contact = async (req, res) => {
  try {
    const result = await client.query(`UPDATE student_contact SET  student_id='${req.body.student_id}', contact_type='${req.body.contact_type}', 
    contact_url='${req.body.contact_url}' where student_contact_id = ${req.params.id}`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteStudent_contact = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM student_contact WHERE student_contact_id=${req.params.id}    `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

// --------------- Table Workplace ------------------//
const getWorkplace = async (req, res) => {
  try {
    const result = await client.query(`SELECT workplace_id, "name", house_number, soi, street, tumbon, amphone, province, postcode, country, lattitude, longitude FROM workplace`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    // client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createWorkplace = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO workplace ("name", house_number, soi, street, tumbon, amphone, province, postcode, country, lattitude, longitude) 
    VALUES('${req.body.name}', '${req.body.house_number}', '${req.body.soi}', '${req.body.street}', '${req.body.tumbon}', '${req.body.amphone}', '${req.body.province}', 
    '${req.body.postcode}', '${req.body.country}', ${req.body.lattitude}, ${req.body.longitude})`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateWorkplace = async (req, res) => {
  try {
    const result = await client.query(`UPDATE workplace SET  "name"='${req.body.name}', house_number='${req.body.house_number}', soi='${req.body.soi}', street='${req.body.street}', tumbon='${req.body.tumbon}',
     amphone='${req.body.amphone}', province='${req.body.province}', postcode='${req.body.postcode}', country='${req.body.country}', 
     lattitude=${req.body.lattitude}, longitude=${req.body.longitude} where workplace_id = ${req.params.id}`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteWorkplace = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM workplace WHERE  workplace_id=${req.params.id} `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

// --------------- Table Workplace History ------------------//
const getWorkplace_history = async (req, res) => {
  try {
    const result = await client.query(`SELECT workplace_history_id, workplace_id, student_id, "position", start_work, finish_work FROM workplace_history`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    // client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createWorkplace_history = async (req, res) => {
  try {
    const result = await client.query(`INSERT INTO workplace_history (workplace_id, student_id, "position", start_work, finish_work) 
    VALUES(${req.body.workplace_id}, '${req.body.student_id}', '${req.body.position}', '${req.body.start_work}', '${req.body.finish_work}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateWorkplace_history = async (req, res) => {
  try {
    const result = await client.query(`UPDATE workplace_history SET  student_id='${req.body.student_id}', "position"='${req.body.position}', 
    start_work='${req.body.start_work}', finish_work='${req.body.finish_work}' where workplace_history_id = ${req.params.id} `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deleteWorkplace_history = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM workplace_history WHERE workplace_history_id=${req.params.id}`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

// --------------- Table messaging ------------------//
const getmessaging = async (req, res) => {
  try {
    const result = await client.query(`SELECT student_id, token_id FROM messaging`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createmessaging = async (req, res) => {
  try {
    console.log(req.body);
    const result = await client.query(`INSERT INTO messaging (student_id, token_id) VALUES('${req.body.student_id}', '${req.body.token_id}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updatemessaging = async (req, res) => {
  try {
    const result = await client.query(`UUPDATE messaging SET token_id='${req.body.token_id}' where student_id = '${req.params.id}`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const deletemessaging = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM messaging WHERE student_id='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


// ------------------- Get By ID -------------------- //

const getStudents_byId = async (req, res) => {
  try {
    const result = await client.query(`SELECT student_id, firstname, lastname, dob, sex, email, epigram, status, education_status, graduate_year, major_id, public_relation_id, image_profile FROM public.student where email = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getStudents_feed = async (req, res) => {
  try {
    const result = await client.query(`select 
    s.firstname,
    s.lastname,
    s.image_profile,
    w."name" as workplace,
    wh."position",
    wh.start_work 
    from
    student s
  inner join major m on m.major_id = s.major_id 
  inner join faculty f on f.faculty_id = m.faculty_id 
  inner join campus c on c.campus_id = f.campus_id 
  inner join workplace_history wh on wh.student_id = s.student_id 
  inner join workplace w on w.workplace_id = wh.workplace_id 
  where s.major_id ='${req.params.major_id}' and f.faculty_id ='${req.params.faculty_id}' and c.campus_id ='${req.params.campus_id}' and s.graduate_year ='${req.params.graduate_year}' ORDER BY 
  wh.start_work DESC `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getStudents_classdirectory = async (req, res) => {
  try {
    const result = await client.query(`select 
    distinct ON ( s.student_id) email,
    s.firstname,
    s.lastname,
    s.image_profile,
    a.province,
    a.country
    from
    student s
  inner join major m on m.major_id = s.major_id 
  inner join faculty f on f.faculty_id = m.faculty_id 
  inner join campus c on c.campus_id = f.campus_id 
  inner join address a on a.student_id = s.student_id
  where s.major_id ='${req.params.major_id}' and f.faculty_id ='${req.params.faculty_id}' and c.campus_id ='${req.params.campus_id}' and s.graduate_year ='${req.params.graduate_year}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getStudents_alldetail = async (req, res) => {
  try {
    const result = await client.query(`select 
    distinct ON (s.email) email,
    s.firstname,
    s.lastname,
    s.image_profile,
    s.major_id,
    s.graduate_year,
    m.faculty_id,
    f.campus_id,
    m."name" as major,
    f."name" as faculty,
    c."name" as campus
    from student s
  inner join major m on m.major_id = s.major_id 
  inner join faculty f on f.faculty_id = m.faculty_id 
  inner join campus c on c.campus_id = f.campus_id 
  where s.email = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getStudents_timeline = async (req, res) => {
  try {
    const result = await client.query(`select
    image_profile,
    wh.start_work,
    w."name",
    wh.position
  from
    student s
  inner join workplace_history wh on
    wh.student_id = s.student_id
  inner join workplace w on
    w.workplace_id = wh.workplace_history_id
  where
    s.student_id = '${req.params.id}'
  ORDER BY 
    wh.start_work DESC`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getAdminByemail = async (req, res) => {
  try {
    const result = await client.query(`SELECT email, faculty_id, campus_id, firstname, lastname FROM public."admin" where email = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getSearch = async (req, res) => {
  try {
    const result = await client.query(`SELECT  firstname, lastname,image_profile,student_id FROM student
    where firstname like '${req.params.firstname}%' or lastname like '${req.params.lastname}%'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getStudentcontactByid = async (req, res) => {
  try {
    const result = await client.query(`SELECT student_contact_id, student_id, contact_type, contact_url FROM student_contact where student_id = '${req.params.id}' order by contact_type  `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getSearchByGuess = async (req, res) => {
  try {
    const result = await client.query(`select
    s.firstname,
    s.lastname,
    s.image_profile,
    m."name" as major,
    f."name" as faculty,
    c."name" as campus,
    s.graduate_year 
  from
    student s
  inner join major m on
    m.major_id = s.major_id
  inner join faculty f on
    f.faculty_id = m.faculty_id
  inner join campus c on
    c.campus_id = f.campus_id
  where
    firstname like '${req.params.firstname}%'
    or lastname like '${req.params.lastname}%'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


const getLatLongByid = async (req, res) => {
  try {
    const result = await client.query(`SELECT lattitude, longitude FROM address where student_id ='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}
const getLatLongAll = async (req, res) => {
  try {
    const result = await client.query(`select
    a.lattitude,
    a.longitude ,
    s.firstname ,
    s.lastname
  from
    address a
  inner join student s on
    s.student_id = a.student_id
  where
    s.student_id != '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getLocationByid = async (req, res) => {
  try {
    const result = await client.query(`SELECT  "Province", amphone, tumbon, code FROM code_csv where code = '${req.params.id}' `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getLocationByStudentid = async (req, res) => {
  try {
    const result = await client.query(`SELECT tumbon, amphone, province, postcode FROM address where student_id ='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getmessagingByid = async (req, res) => {
  try {
    const result = await client.query(`SELECT student_id, token_id FROM messaging where student_id='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}





//  --------------------------- Edit By Section ------------------ // 
const updateEpigramStatus = async (req, res) => {
  try {
    const result = await client.query(`UPDATE student SET epigram='${req.body.epigram}', status='${req.body.status}' where student_id = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateImage_profile = async (req, res) => {
  try {
    const result = await client.query(`UPDATE student SET  image_profile='${req.body.image_profile}' where student_id='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updatefinishwork = async (req, res) => {
  try {
    const time = moment().locale('th').format();
    const result = await client.query(`update workplace_history set finish_work = '${time}'
    where student_id = '${req.params.student_id}' and finish_work is null`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    console.log(time);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateLatLong = async (req, res) => {
  try {
    const result = await client.query(`UPDATE address SET lattitude=${req.params.lat}, longitude=${req.params.long} where student_id = '${req.params.student_id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


const getdetailUniversity = async (req, res) => {
  try {
    const result = await client.query(`SELECT  s.student_id ,s.firstname ,s.lastname , m."name" as "major", f."name"as "faculty", c."name"as "campus"
    FROM major m
    inner join faculty f on f.faculty_id = m.faculty_id 
    inner join campus c on c.campus_id = f.campus_id 
    inner join student s on s.major_id = m.major_id 
    where s.student_id = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getdetailprofile = async (req, res) => {
  try {
    const result = await client.query(`SELECT s.firstname, s.lastname, s.epigram, s.status, s.image_profile, m."name" as "major" ,c."name" as "campus",s.graduate_year ,w."name" as "workplace", wh.position, a.province, a.country
    FROM student s inner join major m on s.major_id = m.major_id 
    inner join faculty f on f.faculty_id = m.faculty_id 
    inner join campus c on c.campus_id = f.campus_id 
    inner join workplace_history wh on wh.student_id = s.student_id
    inner join workplace w on w.workplace_id = wh.workplace_id
    inner join address a on a.student_id = s.student_id
    where wh.student_id = '${req.params.id}' and wh.finish_work is null`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    // const result = await client.query(`SELECT student_id, firstname, lastname, dob, sex, email, epigram, status, education_status, graduate_year, major_id, public_relation_id, image_profile FROM public.student where email = '${req.body.email}'`);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateEmail = async (req, res) => {
  try {
    const result = await client.query(`UPDATE public.student SET email='${req.body.email}' where student_id = '${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateAddressLocation = async (req, res) => {
  try {
    const result = await client.query(`UPDATE address SET  tumbon='${req.body.tumbon}', amphone='${req.body.amphone}', province='${req.body.province}', postcode='${req.body.postcode}', country='${req.body.country}' where student_id ='${req.params.id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}



// ---------------------------- Create By Section ---------------------- //

const createWork = async (req, res) => {
  try {
    const time = moment().locale('th').format();
    // const start_work = to_timestamp(req.body.start_work, 'YYYY-MM-DD')
    const result = await client.query(`with company as(INSERT INTO workplace (name) VALUES('${req.body.name}')

    )
    INSERT INTO workplace_history (student_id, "position", start_work ) VALUES('${req.body.student_id}', '${req.body.position}', 
    '${req.body.start_work}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createWorkBefore = async (req, res) => {
  try {
    const time = moment().locale('th').format();
    // const start_work = to_timestamp(req.body.start_work, 'YYYY-MM-DD')
    const result = await client.query(`with company as(INSERT INTO workplace (name) VALUES('${req.body.name}')

    )
    INSERT INTO workplace_history (student_id, "position", start_work , finish_work) VALUES('${req.body.student_id}', '${req.body.position}', 
    '${req.body.start_work}','${req.body.finish_work}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const createAddressByid = async (req, res) => {
  try {
    const time = moment().locale('th').format();
    // const start_work = to_timestamp(req.body.start_work, 'YYYY-MM-DD')
    const result = await client.query(`INSERT INTO address (student_id, tumbon, amphone, province, postcode, country) 
    VALUES('${req.params.id}', '${req.body.tumbon}', '${req.body.amphone}', '${req.body.province}', '${req.body.postcode}', '${req.body.country}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


////////////////  Delete section By ID  ///////////////////

const deleteStudentContactType = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM student_contact WHERE  student_contact_id= ${req.params.id} `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}



/////////////// additional section admin //////////////////

const createEvent = async (req, res) => {
  try {
    const result = await client.query(`	insert into
    public_relation (title,"content",image,start_activity,finish_activity,graduate_year,status,faculty_id,create_by,link_file)
    values('${req.body.title}','${req.body.content}','${req.body.image}','${req.body.start_activity}','${req.body.finish_activity}','${req.body.graduate_year}','${req.body.status}',
    ${req.body.faculty_id},'${req.body.create_by}','${req.body.link_file}')`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const updateEvent = async (req, res) => {
  try {
    const result = await client.query(`update public_relation set
    title = '${req.body.title}',
    "content" = '${req.body.content}',
    image = '${req.body.image}',
    start_activity = '${req.body.start_activity}',
    finish_activity = '${req.body.finish_activity}',
    graduate_year = '${req.body.graduate_year}',
    status = '${req.body.status}',
    faculty_id = ${req.body.faculty_id},
    create_by = '${req.body.create_by}',
    link_file = '${req.body.link_file}'
    where public_relation_id = ${req.params.id}`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getEvent = async (req, res) => {
  try {
    const result = await client.query(`select public_relation_id,title,"content",image,start_activity,finish_activity,link_file from public_relation where faculty_id = '${req.params.id}' ORDER BY 
    start_activity DESC`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getEventBypublic_realation_id = async (req, res) => {
  try {
    const result = await client.query(`select public_relation_id,title,"content",image,start_activity,finish_activity,link_file from public_relation where faculty_id = '${req.params.faculty_id}' and public_relation_id = ${req.params.public_relation_id} ORDER BY 
    start_activity DESC`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


const deleteEvent = async (req, res) => {
  try {
    const result = await client.query(`DELETE FROM public_relation WHERE public_relation_id = ${req.params.id}`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getuserloginemailsystem = async (req, res) => {
  try {
    const result = await client.query(`SELECT count(email) 
    FROM student
    where email != ''`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getuserinsystem = async (req, res) => {
  try {
    const result = await client.query(`SELECT count(student_id) 
    FROM student`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getLatLongAllForAdmin = async (req, res) => {
  try {
    const result = await client.query(`select
    a.lattitude,
    a.longitude ,
    s.firstname ,
    s.lastname
from
	student s
	inner join major m on m.major_id = s.major_id 
	inner join faculty f on f.faculty_id = m.faculty_id 
	inner join campus c on c.campus_id = f.campus_id 
	inner join address a on a.student_id = s.student_id 
	inner join "admin" a2 on a2.faculty_id = f.faculty_id 
	where f.faculty_id = ${req.params.id}`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}


const countStudentUsedSystem = async (req, res) => {
  try {
    const result = await client.query(`select  count(email) email from student s where email != '' `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const countStudentWork = async (req, res) => {
  try {
    const result = await client.query(`select
    m.name, 
   count(distinct(wh.student_id))
 from
   student s
 inner join workplace_history wh on
   wh.student_id = s.student_id
 inner join major m on
   m.major_id = s.major_id
 inner join faculty f on
   f.faculty_id = m.faculty_id
 inner join campus c on
   c.campus_id = f.campus_id
 where
   f.faculty_id = '${req.params.id}'
 group by
   m.major_id ,
   m.name`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}
const countStudentWorkByPosition = async (req, res) => {
  try {
    const result = await client.query(`select
      wh."position" ,
      count(distinct(wh.student_id))
    from
      student s
    inner join workplace_history wh on
      wh.student_id = s.student_id
    inner join major m on
      m.major_id = s.major_id
    inner join faculty f on
      f.faculty_id = m.faculty_id
    inner join campus c on
      c.campus_id = f.campus_id
    inner join workplace_history wh2 on
      wh.student_id = s.student_id
    where
      f.faculty_id = '${req.params.id}'
    group by
      m.major_id ,
      wh."position" `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const countStudentAddress = async (req, res) => {
  try {
    const result = await client.query(`select
    a.province ,
    count(distinct(a.student_id))
  from
    student s
  inner join major m on
    m.major_id = s.major_id
  inner join faculty f on
    f.faculty_id = m.faculty_id
  inner join campus c on
    c.campus_id = f.campus_id
  inner join address a on
    a.student_id = s.student_id
  inner join "admin" a2 on
    a2.faculty_id = f.faculty_id
  where
    f.faculty_id = '${req.params.id}'
  group by
    a.province`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const countStudentGraduteyear = async (req, res) => {
  try {
    const result = await client.query(`select
    count(s.graduate_year) ,
    s.graduate_year
  from
    student s
  inner join major m on
    m.major_id = s.major_id
  inner join faculty f on
    f.faculty_id = m.faculty_id
  inner join campus c on
    c.campus_id = f.campus_id
  where
    f.faculty_id = '${req.params.id}'
  group by
    s.graduate_year `);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}

const getTokenonlyByid = async (req, res) => {
  try {
    const result = await client.query(`select 
	m.token_id
from
	messaging m
inner join student s on
	s.student_id = m.student_id
inner join major m2 on
	m2.major_id = s.major_id
inner join faculty f on
	f.faculty_id = m2.faculty_id
inner join campus c on
	c.campus_id = f.campus_id
inner join "admin" a on
	a.faculty_id = f.faculty_id
where
	a.faculty_id = '${req.params.faculty_id}'
	and a.campus_id = '${req.params.campus_id}'`);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}




/////////////////////////////////////// google sheet ///////////////////////////////////////////



const deletegooglesheet = async (req, res) => {
  // BEFORE RUNNING:
  // ---------------
  // 1. If not already done, enable the Google Sheets API
  //    and check the quota for your project at
  //    https://console.developers.google.com/apis/api/sheets
  // 2. Install the Node.js client library by running
  //    `npm install googleapis --save`

  const { google } = require('googleapis');
  const sheets = google.sheets('v4');

  async function main() {
    const authClient = await authorize();
    const request = {
      // The ID of the spreadsheet to update.
      spreadsheetId: "1L0p43e9RCRS_0sjcz7xz35Uoi5Ev2PxklGUGHeLPSlA",  // TODO: Update placeholder value.

      // The A1 notation of the values to clear.
      range: "Sheet1!A2:L300",  // TODO: Update placeholder value.

      resource: {
        // TODO: Add desired properties to the request body.
      },

      auth: authClient,
    };

    try {
      // console.log(authClient);
      // console.log(request);
      const response = (await sheets.spreadsheets.values.clear(request)).data;
      // TODO: Change code below to process the `response` object:
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
  }
  console.log("hello");
  main();

  async function authorize() {
    // TODO: Change placeholder below to generate authentication credentials. See
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    let authClient = 'nongnont.170442@gmail.com';

    if (authClient == null) {
      throw Error('authentication failed');
    }

    return authClient;
  }
}


///////// notification /////
const serviceAccount = require('../alumnet-project-firebase-adminsdk-d6mkt-39c820e946.json')
const databaseURL = 'https://alumnet-project-default-rtdb.firebaseio.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
})

const notification = async (req, res) => {
  const admin = require('firebase-admin')
  const { google } = require('googleapis')
  const axios = require('axios')
  const ProjectId = "alumnet-project";

  const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'
  const SCOPES = [MESSAGING_SCOPE]


  const URL =
    `https://fcm.googleapis.com/v1/projects/${ProjectId}/messages:send`
  // const deviceToken =[
  //       'cMhoX5SvBQzkdPFwmdNbmp:APA91bESjvXp95sxRqFroUSHUzEQg0yplFGbg5TfxsGmZ43ZFTxRCEDPiGlxAdyq3CX-v1wUlmwUP1-0PhHDqSn3VsrZyKzMGv4okmkc_htIY4GZokWAdtfYIMiTML0ldZb4jesluOTJ',
  //       'e58PJOhZUdsNFNC4HEdh9j:APA91bGf0CQw7VZj0lOzVEBLhCwdtCdnJAN8xcEaewUWo-Sc5qznVdjuaUJz7LoTjCWBLJ_EHXdQAa63lkVk_7VnKAdzr7fqHyDcHfIDfSBVy-hWJU92Lsgnr9YpXFeHXOqAEGyYJdy_'
  // ]




  // These registration tokens come from the client FCM SDKs.

  const deviceToken =
    'cMhoX5SvBQzkdPFwmdNbmp:APA91bESjvXp95sxRqFroUSHUzEQg0yplFGbg5TfxsGmZ43ZFTxRCEDPiGlxAdyq3CX-v1wUlmwUP1-0PhHDqSn3VsrZyKzMGv4okmkc_htIY4GZokWAdtfYIMiTML0ldZb4jesluOTJ'
    ;
  // const topic = 'highScores';
  // // Subscribe the devices corresponding to the registration tokens to the
  // // topic.
  // getMessaging().subscribeToTopic(registrationTokens, topic)
  //   .then((response) => {
  //     // See the MessagingTopicManagementResponse reference documentation
  //     // for the contents of response.
  //     console.log('Successfully subscribed to topic:', response);
  //   })
  //   .catch((error) => {
  //     console.log('Error subscribing to topic:', error);
  //   });

  //   // The topic name can be optionally prefixed with "/topics/".



  // // See documentation on defining a message payload.
  // const message = {
  //   notification: {
  //     title: `'${req.body.title}}'`,
  //     body: `'${req.body.content}'`
  //   },
  //   topic: topic
  // };

  // // Send a message to devices subscribed to the combination of topics
  // // specified by the provided condition.
  // getMessaging().send(message)
  //   .then((response) => {
  //     // Response is a message ID string.
  //     console.log('Successfully sent message:', response);
  //   })
  //   .catch((error) => {
  //     console.log('Error sending message:', error);
  //   });





  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: databaseURL
  // })

  function getAccessToken() {
    return new Promise(function (resolve, reject) {
      var key = serviceAccount
      var jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      )
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err)
          return
        }
        resolve(tokens.access_token)
      })
    })
  }

  async function init() {
    const body = {
      message: {
        data: { key: 'value' },
        notification: {
          title: `'${req.body.titles}'`,
          body: `'${req.body.content}'`
        },
        webpush: {
          headers: {
            Urgency: 'high'
          },
          notification: {
            requireInteraction: 'true'
          }
        },
        token: deviceToken
      }
    }

    try {
      const accessToken = await getAccessToken()
      console.log('accessToken: ', accessToken)
      const { data } = await axios.post(URL, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log('name: ', data.name)
    } catch (err) {
      console.log('err: ', err.message)
    }
  }
  // for (let index = 0; index < deviceToken.length; index++) {
  //   const element = deviceToken[index];

  //   console.log(element);

  // }
  init()
}













module.exports = {

  // notification //
  notification,

  //google sheet //

  deletegooglesheet,


  // admin //
  getEvent,
  getEventBypublic_realation_id,
  createEvent,
  updateEvent,
  deleteEvent,
  getuserloginemailsystem,
  getuserinsystem,
  getLatLongAllForAdmin,
  countStudentUsedSystem,
  countStudentWork,
  countStudentAddress,
  countStudentGraduteyear,
  countStudentWorkByPosition,
  getTokenonlyByid,

  getStudents_byId,
  getdetailUniversity,
  getdetailprofile,
  getStudents_feed,
  getStudents_alldetail,
  getStudents_timeline,
  getAdminByemail,
  getStudents_classdirectory,
  getSearch,
  getStudentcontactByid,
  getSearchByGuess,
  getLatLongByid,
  getLatLongAll,
  getLocationByid,
  getLocationByStudentid,
  getmessagingByid,


  updateEpigramStatus,
  updateEmail,
  updateImage_profile,
  updatefinishwork,
  updateLatLong,
  updateAddressLocation,

  createWork,
  createWorkBefore,
  createAddressByid,

  deleteStudentContactType,

  getStudents,
  createStudents,
  updateStudents,
  deleteStudents,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getCampus,
  createCampus,
  updateCampus,
  deleteCampus,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getMajor,
  createMajor,
  updateMajor,
  deleteMajor,
  getPublic_relation,
  createPublic_relation,
  updatePublic_relation,
  deletePublic_relation,
  getStudent_contact,
  createStudent_contact,
  updateStudent_contact,
  deleteStudent_contact,
  getWorkplace,
  createWorkplace,
  updateWorkplace,
  deleteWorkplace,
  getWorkplace_history,
  createWorkplace_history,
  updateWorkplace_history,
  deleteWorkplace_history,
  getmessaging,
  createmessaging,
  updatemessaging,
  deletemessaging
}
