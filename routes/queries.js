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
    w.province,
    w.country,
    wh."position"
    from
    student s
  inner join major m on m.major_id = s.major_id 
  inner join faculty f on f.faculty_id = m.faculty_id 
  inner join campus c on c.campus_id = f.campus_id 
  inner join workplace_history wh on wh.student_id = s.student_id 
  inner join workplace w on w.workplace_id = wh.workplace_id 
  where s.major_id ='${req.params.major_id}' and f.faculty_id ='${req.params.faculty_id}' and c.campus_id ='${req.params.campus_id}' and s.graduate_year ='${req.params.graduate_year}' and wh.finish_work is null`);
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



module.exports = {
  // admin //
  getEvent,
  getEventBypublic_realation_id,
  createEvent,
  updateEvent,
  deleteEvent,
  getuserloginemailsystem,
  getuserinsystem,
  getLatLongAllForAdmin,

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

  updateEpigramStatus,
  updateEmail,
  updateImage_profile,
  updatefinishwork,

  createWork,
  createWorkBefore,

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
  deleteWorkplace_history
}
