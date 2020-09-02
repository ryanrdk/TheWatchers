exports.resolvers = {
    Query: {
        /*
        Getting all Bootcampers within the database  
        */
        getAllBootcampers: async (root, args, { pgPool }) => {
            const allBootcampers = await pgPool.query(`
                SELECT * FROM "Bootcampers" ORDER BY "first_name" ASC
            `).then(res => { return res.rows })
            return allBootcampers;
        },
        /*
        Getting all Bootcampers of a specific gender, which can be
        further filtered by campus (optional)
        */
        getBootcampersByGender: async (root, { gender, campus }, { pgPool }) => {
            let query = `WHERE "gender" = '${gender}' `;
            campus ? query += `AND "campus" = '${campus}' ` : 0;
            query += `AND "active" = 'selected' `;
            const results = await pgPool.query(`
                SELECT * FROM "Bootcampers" ${query}ORDER BY "first_name" ASC
            `).then(res => { return res.rows })
            return results;
        },
        /*
        Getting all the Bootcampers day results for a specific Day
        */
        getDay: async (root, { day }, { pgPool }) => {
            const allDay = await pgPool.query(`
                SELECT * FROM "Days" WHERE "Day" = $1 ORDER BY "Username" ASC
            `, [day]).then(res => { return res.rows })
            if (allDay) {
                const filtered_days = Promise.all(allDay.map(async (elem) => {
                    elem.bootcamper = await pgPool.query(`
                        SELECT * FROM "Bootcampers" WHERE "username" = $1 
                    `, [elem.Username]).then(res => { return res.rows[0] })
                    return await elem;
                }))
                return await filtered_days;
            }
        },
        /*
        Getting all the Bootcampers colle results for a specific Colle
        */
        getColle: async (root, { colle }, { pgPool }) => {
            const allColle = await pgPool.query(`
                SELECT * FROM "Colles" WHERE "Colle" = $1 ORDER BY "Username" ASC
            `, [colle]).then(res => { return res.rows })
            if (allColle) {
                const filtered_colle = Promise.all(allColle.map(async (elem) => {
                    elem.bootcamper = await pgPool.query(`
                        SELECT * FROM "Bootcampers" WHERE "username" = $1
                    `, [elem.Username]).then(res => { return res.rows[0] })
                    return elem;
                }))
                return await filtered_colle;
            }
        },
        /*
        Getting all the Bootcampers exam results for a specific Exam
        */
        getExam: async (root, { exam }, { pgPool }) => {
            const allExam = await pgPool.query(`
                SELECT * FROM "Exams" WHERE "Exam" = $1 ORDER BY "Username" ASC
            `, [exam]).then(res => { return res.rows })
            if (allExam) {
                const filtered_exams = Promise.all(allExam.map(async (elem) => {
                    elem.bootcamper = await pgPool.query(`
                        SELECT * FROM "Bootcampers" WHERE "username" = $1
                    `, [elem.Username]).then(res => { return res.rows[0] })
                    return elem;
                }))
                return await filtered_exams;
            }
        },
        /*
        Getting a specific Bootcamper's Day results
        */
        getBootcamperDays: async (root, { username }, { pgPool }) => {
            const BootcamperDays = await pgPool.query(`
                SELECT * FROM "Days" WHERE "Username" = $1
            `, [username]).then(res => { return res.rows })
            return await BootcamperDays;
        },
        /*
        Getting a specific Bootcamper's Colle results
        */
        getBootcamperColles: async (root, { username }, { pgPool }) => {
            const BootcamperColles = await pgPool.query(`
                SELECT * FROM "Colles" WHERE "Username" = $1
            `, [username]).then(res => { return res.rows })
            return await BootcamperColles;
        },
        /*
        Getting a specific Bootcamper's Exam results
        */
        getBootcamperExams: async (root, { username }, { pgPool }) => {
            const BootcamperExams = await pgPool.query(`
                SELECT * FROM "Exams" WHERE "Username" = $1
            `, [username]).then(res => { return res.rows })
            return await BootcamperExams;
        }
    },
    Mutation: {
        /*
        Updating a specific Bootcamper's status
        */
        updateStatus: async (root, { username, status }, { pgPool }) => {
            const bootcamper = await pgPool.query(`
                UPDATE "Bootcampers" SET "active" = $1 WHERE "username" = $2 
                RETURNING *
            `, [ status, username ]).then(res => { return res.rows[0] })
            return bootcamper;
        },
        /*
        Adding a Bootcamper
        */
        addBootcamper: async(root, { first_name, last_name, username, email, campus, gender, ethnicity, active }, { pgPool }) => {
            const bootcamper = await pgPool.query(`
                INSERT INTO "Bootcampers" ("first_name", "last_name", "username", "email", "campus", "gender", "ethnicity", "active")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
            `, [ first_name, last_name, username, email, campus, gender, ethnicity, active ]).then(res => { return res.rows[0] })
            return await bootcamper;
        },
        /*
        Deleting a Bootcamper
        */
        deleteBootcamper: async(root, { username }, { pgPool }) => {
            const bootcamper = await pgPool.query(`
                DELETE FROM "Bootcampers" WHERE "username" = $1
                RETURNING *;
            `, [ username ]).then(res => { return res.rows[0] })
            return await bootcamper;
        }
    }
};