exports.resolvers = {
    Query: {
        getAllBootcampers: async (root, args, { Bootcamper }) => {
            const allBootcampers = await Bootcamper.findAll({
                order: [[ "first_name", "ASC" ]]
            });
            return allBootcampers;
        },
        getBootcampersByGender: async (root, { gender, campus }, { Bootcamper }) => {
            let query = [];
            query.push('"gender": "' + gender + '"');
            campus ? query.push(' "campus": "' + campus + '"') : 0;
            query.push(' "active": "selected"');
            let obj = JSON.parse('{ ' + query.toString() + ' }');
            console.log("DO IT ", obj);
            const results = await Bootcamper.findAll({
                where : obj,
                order : [[ "first_name", "ASC" ]]
            });
            return results;
        },
        getDay: async (root, { day }, { Day, Bootcamper }) => {
            const allDay = await Day.findAll({ 
                where : {
                    Day: day
                },
                order : [[ "Username", "ASC" ]]
            });
            const up2u = Promise.all(allDay.map(async (elem) => {
                elem.bootcamper = await Bootcamper.findOne({ where : { username: elem.Username } });
                return await elem;
            }));
            return await up2u;
        },
        getColle: async (root, { colle }, { Colle, Bootcamper }) => {
            const allColle = await Colle.findAll({ where : { Colle: colle }, order: [[ "Username", "ASC" ]]});
            const flub = Promise.all(allColle.map(async (elem) => {
                elem.bootcamper = await Bootcamper.findOne({ where: { username: elem.Username }});
                return elem;
            }));
            return await flub;
        },
        getExam: async (root, { exam }, { Exam, Bootcamper }) => {
            const allExam = await Exam.findAll({ where: { Exam: exam }, order: [[ "Username", "ASC" ]]});
            const wub = Promise.all(allExam.map(async (elem) => {
                elem.bootcamper = await Bootcamper.findOne({ where : { username: elem.Username }});
                return elem;
            }));
            return await wub;
        },
        getBootcamperDays: async (root, { username }, { Day }) => {
            const BootcamperDays = await Day.findAll({ where : { Username: username }});
            return await BootcamperDays;
        },
        getBootcamperColles: async (root, { username }, { Colle }) => {
            const BootcamperColles = await Colle.findAll({ where : { Username: username }});
            return await BootcamperColles;
        },
        getBootcamperExams: async (root, { username }, { Exam }) => {
            const BootcamperExams = await Exam.findAll({ where : { Username: username }});
            return await BootcamperExams;
        }
    },
    Mutation: {
        updateStatus: async (root, { username, status }, { Bootcamper }) => {
            console.log({ username }, { active: status });
            const bootcamper = await Bootcamper.findOne({ where : { username }}).then(async (res) => {
                if (res) {
                    return await res.update({ active: status });
                    // return update;
                }
                return null;
            });
            // const bootcamper = await Bootcamper.update({ active: status }, { where : { username : username }});
            return bootcamper;
        },
        addBootcamper: async(root, { first_name, last_name, username, email, campus, gender, ethnicity, active }, { Bootcamper }) => {
            const bootcamper = await Bootcamper.create({ first_name, last_name, username, email, campus, gender, ethnicity, active })
            return await bootcamper;
        },
        deleteBootcamper: async(root, { username }, { Bootcamper }) => {
            const bootcamper = await Bootcamper.findOne({ where : { username } })
            console.log(bootcamper)
            await Bootcamper.destroy({ where : { username } })
            return await bootcamper;
        }
    }
};
