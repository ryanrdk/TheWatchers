exports.resolvers = {
    Query: {
        getAllBootcampers: async (root, args, { pgPool }) => {
            // const allBootcampers = await Bootcamper.find().sort({ first_name: "asc" });
            const allBootcampers = await pgPool.query(`
                SELECT * FROM "Bootcampers" ORDER BY "first_name" ASC
            `).then(res => { return res.rows })
            return allBootcampers;
        },
        getBootcampersByGender: async (root, { gender, campus }, { pgPool }) => {
            // query.push('"gender": "' + gender + '"');
            // campus ? query.push(' "campus": "' + campus + '"') : 0;
            // query.push(' "active": "selected"');
            // let obj = JSON.parse('{ ' + query.toString() + ' }')
            let query = `WHERE "gender" = '${gender}' `;
            campus ? query += `AND "campus" = '${campus}' ` : 0;
            query += `AND "active" = 'selected' `;
            // const results = await Bootcamper.find(obj).sort({ first_name: "asc" });
            const results = await pgPool.query(`
                SELECT * FROM "Bootcampers" ${query}ORDER BY "first_name" ASC
            `).then(res => { return res.rows })
            return results;
        },
        getDay: async (root, { day }, { pgPool }) => {
            // const allDay = await Day.find({ Day: day }).sort({ Username: "asc" });
            const allDay = await pgPool.query(`
                SELECT * FROM "Days" WHERE "Day" = $1 ORDER BY "Username" ASC
            `, [day]).then(res => { return res.rows })
            if (allDay) {
                const up2u = Promise.all(allDay.map(async (elem) => {
                    // elem.bootcamper = await Bootcamper.findOne({ username: elem.Username });
                    elem.bootcamper = await pgPool.query(`
                        SELECT * FROM "Bootcampers" WHERE "username" = $1 
                    `, [elem.Username]).then(res => { return res.rows[0] })
                    return await elem;
                }))
                return await up2u;
            }
        },
        getColle: async (root, { colle }, { pgPool }) => {
            // const allColle = await Colle.find({ Colle: colle }).sort({ Username: "asc" });
            const allColle = await pgPool.query(`
                SELECT * FROM "Colles" WHERE "Colle" = $1 ORDER BY "Username" ASC
            `, [colle]).then(res => { return res.rows })
            if (allColle) {
                const flub = Promise.all(allColle.map(async (elem) => {
                    // elem.bootcamper = await Bootcamper.findOne({ username: elem.Username });
                    elem.bootcamper = await pgPool.query(`
                        SELECT * FROM "Bootcampers" WHERE "username" = $1
                    `, [elem.Username]).then(res => { return res.rows[0] })
                    return elem;
                }))
                return await flub;
            }
        },
        getExam: async (root, { exam }, { pgPool }) => {
            // const allExam = await Exam.find({ Exam: exam }).sort({ Username: "asc" });
            const allExam = await pgPool.query(`
                SELECT * FROM "Exams" WHERE "Exam" = $1 ORDER BY "Username" ASC
            `, [exam]).then(res => { return res.rows })
            if (allExam) {
                const wub = Promise.all(allExam.map(async (elem) => {
                    // elem.bootcamper = await Bootcamper.findOne({ username: elem.Username });
                    elem.bootcamper = await pgPool.query(`
                        SELECT * FROM "Bootcampers" WHERE "username" = $1
                    `, [elem.Username]).then(res => { return res.rows[0] })
                    return elem;
                }))
                return await wub;
            }
        },
        getBootcamperDays: async (root, { username }, { pgPool }) => {
            // const BootcamperDays = await Day.find({ Username: username })
            const BootcamperDays = await pgPool.query(`
                SELECT * FROM "Days" WHERE "Username" = $1
            `, [username]).then(res => { return res.rows })
            return await BootcamperDays;
        },
        getBootcamperColles: async (root, { username }, { pgPool }) => {
            // const BootcamperColles = await Colle.find({ Username: username })
            const BootcamperColles = await pgPool.query(`
                SELECT * FROM "Colles" WHERE "Username" = $1
            `, [username]).then(res => { return res.rows })
            return await BootcamperColles;
        },
        getBootcamperExams: async (root, { username }, { pgPool }) => {
            // const BootcamperExams = await Exam.find({ Username: username })
            const BootcamperExams = await pgPool.query(`
                SELECT * FROM "Exams" WHERE "Username" = $1
            `, [username]).then(res => { return res.rows })
            return await BootcamperExams;
        }
    },
    Mutation: {
        updateStatus: async (root, { username, status }, { pgPool }) => {
            // const bootcamper = await Bootcamper.findOneAndUpdate({ username }, { $set: { active: status } }, { new: true });
            const bootcamper = await pgPool.query(`
                UPDATE "Bootcampers" SET "active" = $1 WHERE "username" = $2 
                RETURNING *
            `).then(res => { return res.rows[0] })
            return bootcamper;
        },
        addBootcamper: async(root, { first_name, last_name, username, email, campus, gender, ethnicity, active }, { pgPool }) => {
            // const bootcamper = await Bootcamper.create({ first_name, last_name, username, email, campus, gender, ethnicity, active })
            const bootcamper = await pgPool.query(`
                INSERT INTO "Bootcampers" ("first_name", "last_name", "username", "email", "campus", "gender", "ethnicity", "active")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
            `, [ first_name, last_name, username, email, campus, gender, ethnicity, active ]).then(res => { return res.rows[0] })
            return await bootcamper;
        },
        deleteBootcamper: async(root, { username }, { pgPool }) => {
            // const bootcamper = await Bootcamper.findOne({ where : { username } })
            const bootcamper = await pgPool.query(`
                DELETE FROM "Bootcampers" WHERE "username" = $1
                RETURNING *;
            `, [ username ]).then(res => { return res.rows[0] })
            console.log(bootcamper)
            return await bootcamper;
        }
    }
};