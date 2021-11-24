var express = require('express');
var router = express.Router();
const db = require('./queries');

//  ---------  Router CRUD ALL Table ---------- //
router.get('/student',db.getStudents);
router.post('/student',db.createStudents);
router.put('/student/:id',db.updateStudents);
router.delete('/student/:id',db.deleteStudents);

router.get('/address',db.getAddress);
router.post('/address',db.createAddress);
router.put('/address/:id',db.updateAddress);
router.delete('/address/:id',db.deleteAddress);

router.get('/admin',db.getAdmin);
router.post('/admin',db.createAdmin);
router.put('/admin/:id',db.updateAdmin);
router.delete('/admin/:id',db.deleteAdmin);

router.get('/campus',db.getCampus);
router.post('/campus',db.createCampus);
router.put('/campus/:id',db.updateCampus);
router.delete('/campus/:id',db.deleteCampus);

router.get('/faculty',db.getFaculty);
router.post('/faculty',db.createFaculty);
router.put('/faculty/:id',db.updateMajor);
router.delete('/faculty/:id',db.deleteFaculty);

router.get('/major',db.getMajor);
router.post('/major',db.createMajor);
router.put('/major/:id',db.updateMajor);
router.delete('/major/:id',db.deleteMajor);

router.get('/public_relation',db.getPublic_relation);
router.post('/public_relation',db.createPublic_relation);
router.put('/public_relation/:id',db.updatePublic_relation);
router.delete('/public_relation/:id',db.deletePublic_relation);

router.get('/student_contact',db.getStudent_contact);
router.post('/student_contact',db.createStudent_contact);
router.put('/student_contact/:id',db.updateStudent_contact);
router.delete('/student_contact/:id',db.deleteStudent_contact);

router.get('/workplace',db.getWorkplace);
router.post('/workplace',db.createWorkplace);
router.put('/workplace/:id',db.updateWorkplace);
router.delete('/workplace/:id',db.deleteWorkplace);

router.get('/workplace_history',db.getWorkplace_history);
router.post('/workplace_history',db.createWorkplace_history);
router.put('/workplace_history/:id',db.updateWorkplace_history);
router.delete('/workplace_history/:id',db.deleteWorkplace_history);

// -------------- get By ID ------------------ //
router.get('/student/:id',db.getStudents_byId);
router.get('/student/infomation/:id',db.getdetailUniversity);
router.get('/student/profile/:id',db.getdetailprofile);
router.get('/student/feed/:major_id/:faculty_id/:campus_id/:graduate_year',db.getStudents_feed);
router.get('/student/classdirectory/:major_id/:faculty_id/:campus_id/:graduate_year',db.getStudents_classdirectory);
router.get('/student/detail/:id',db.getStudents_alldetail);
router.get('/student/timeline/:id',db.getStudents_timeline);
router.get('/admin/:id',db.getAdminByemail);
router.get('/student/search/:firstname/:lastname',db.getSearch);
router.get('/student/studentcontact/:id',db.getStudentcontactByid);
router.get('/student/latlongbyid/:id',db.getLatLongByid);
router.get('/student/latlongall/:id',db.getLatLongAll);

// --------------- Guess ------------------ //
router.get('/search/:firstname/:lastname',db.getSearchByGuess);


//  --------------------------- Edit By Section ------------------ // 
router.put('/student/epigram_status/:id',db.updateEpigramStatus);
router.put('/student/updateemail/:id', db.updateEmail);
router.put('/student/image_profile/:id',db.updateImage_profile);
router.put('/student/currentjob/:student_id',db.updatefinishwork);

// ------------------------------- Create By Section ------------------- //
router.post('/student/workplace',db.createWork);
router.post('/student/workplacebefore',db.createWorkBefore);


// ------------------------------- Admin ------------------- //
router.post('/admin/createevent',db.createEvent);
router.put('/admin/updateevent/:id',db.updateEvent);
router.delete('/admin/deleteevent/:id',db.deleteEvent);
router.get('/admin/getevent/:id',db.getEvent);
router.get('/admin/geteventbyid/:faculty_id/:public_relation_id',db.getEventBypublic_realation_id);
router.get('/admin/getuserloginemailsystem',db.getuserloginemailsystem);
router.get('/admin/getuserinsystem',db.getuserinsystem);
router.get('/admin/latlong',db.getLatLongAllForAdmin);




module.exports = router;