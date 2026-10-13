const db = require("../config/db");

//GET ALL STUDNETS LIST
const getStudents = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM students')
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found',

            })
        }
        res.status(200).send({
            success: true,
            message: "All Students Recods",
            totalStudent: data[0].length,
            data: data[0]

        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get All Student API',
            error
        })
    }
};

const getStudentByID = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid or Provide Student id"
            })
        }

        const data = await db.query("SELECT * FROM students WHERE id=?", [studentId])
        if (!data) {

            return res.status(404).send({
                success: false,
                message: "No Record found"
            });
        }


        return res.status(200).send({
            success: true,
            studentDetails: data[0]
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get student by id API",
            error
        })

    }
};

const createStudent = async (req, res) => {
    try {
        const { name, roll_no, medium, fees } = req.body
        if (!name || !roll_no || !medium || !fees) {
            return res.status(500).send({
                success: false,
                message: 'please Provide all fields'
            })
        }
        const data = await db.query("INSERT INTO students (name,roll_no,fees,medium) VALUES(?,?,?,?)", [name, roll_no, fees, medium])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Error In INSERT QUERY'
            })
        }
        res.status(200).send({
            success: true,
            message: "New Student Rrecord Created",
            

        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In Create Student API",
            error

        })

    }

};

const updateStudent = async (req, res) => {

    try {
        const studentId = req.params.id;

        if (!studentId) {

            return res.status(404).send({
                success: false,
                message: "Invalid ID or provide id",
            });

        }
        const { name, roll_no, fees, medium } = req.body
        const data = await db.query('UPDATE students SET name = ?, roll_no= ?,fees= ?,medium= ? WHERE id= ?', [name, roll_no, fees, medium, studentId]);

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error In Update Data"
            });
        }
        res.status(200).send({
            success: true,
            message: "Student Details Updated"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In Update Student API",
            error

        })
    }
};

const deleteStudent = async (req, res) => {

    try {
        const studentId = req.params.id

        if (!studentId) {

            return res.status(404).send({
                success: false,
                message: "Invalid ID or provide id",
            });

        }
      await db.query("DELETE FROM students where id = ?",[studentId])
      return res.status(200).send({
        success:true,
        message:"Student deleted successfully"
      })

    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error In Delete Student API"
        })
    }
}

module.exports = {
    getStudents,
    getStudentByID,
    createStudent,
    updateStudent,
    deleteStudent
};