const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Courses = require('../models/courses')
const {secret} = require('../config/config').jwt


async function getCourseObject() {
	const firstCourse = await Courses.findOne({
		course: 'first course'
	})
	const secondCourse = await Courses.findOne({
		course: 'second course'
	})
	const thirdCourse = await Courses.findOne({
		course: 'third course'
	})
	const baseCurseObject = {...firstCourse, ...secondCourse, ...thirdCourse}
	return baseCurseObject
}

function createUserData(curseObj, userCurses) {
	const cursesData = []
	if (userCurses.first_course) {
		cursesData.push(curseObj.firstCourse)   
	}
	else if (userCurses.second_course) {
		cursesData.push(curseObj.secondCourse)   
	}
	else if (userCurses.third_course) {
		cursesData.push(curseObj.thirdCourse)
	}
	console.log(cursesData)
	return cursesData
}

const checkCourses = async (req, res) => {
	const userId = jwt.verify(req.params.token, secret)
	const user = await User.findOne({
		_id: userId.id
	})
	const userCourses  = user.course

	const baseCurseObject = getCourseObject()
	const dataCurses = createUserData(baseCurseObject, userCourses)
 
	try {                          
		res.status(200).json({data: dataCurses + 'Curses have been sent'})
	} catch (e) {
		res.status(400).json('error, can`t send course`s data:' + err)
	}   
}

module.exports = {
	checkCourses
}