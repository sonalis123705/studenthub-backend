const db = require("../config/db")

// const getDashboard = async (req, res) => {
//     try {
//         const data = db.query(`
//     SELECT
//         COUNT(*) AS totalStudents,
//         COALESCE(SUM(fees), 0) AS totalFees
//     FROM students
// `);

//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'No Records found',

//             })
//         }
//         res.status(200).send({
//             success: true,
//             message: "All Students Recods",
//             totalStudent: data[0].length,
//             data: data[0]

//         })

//     }
//     catch (error) {
//         res.status(200).send({
//             success: false,
//             message: 'Error in Get All Student API',
//             error
//         })
//     }

// }

const getDashboard = async (req, res) => {
    try {
        // 1. Get Dashboard Statistics
        const [data] = await db.query(`
            SELECT
                COUNT(*) AS totalStudents,
                COALESCE(
                    SUM(CAST(fees AS DECIMAL(10,2))), 0
                ) AS totalFees,
                COUNT(DISTINCT class) AS totalClasses
            FROM students
        `);

        // 2. Get Recent Students
        const [recentStudents] = await db.query(`
            SELECT
                name,
                roll_no,
                class,
                medium,
                fees
            FROM students
            ORDER BY roll_no DESC
            LIMIT 5
        `);

        // 3. Send Response
        res.status(200).send({
            success: true,
            message: "Dashboard data fetched successfully",
            data: {
                ...data[0],
                recentStudents: recentStudents
            }
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Get Dashboard API",
            error: error.message
        });
    }
};

module.exports = { getDashboard };

