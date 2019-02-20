exports.resolvers = {
    Query: {
        getAllBootcampers: async (root, args, { Bootcamper }) => {
            const allBootcampers = await Bootcamper.find().sort({ first_name: "asc" });
            return allBootcampers;
        },
        getBootcampersByGender: async (root, { gender, campus}, { Bootcamper }) => {
            let query = [];
            query.push('"gender": "' + gender + '"');
            campus ? query.push(' "campus": "' + campus + '"') : 0;
            query.push(' "active": "selected"');
            let obj = JSON.parse('{ ' + query.toString() + ' }')
            const results = await Bootcamper.find(obj).sort({ first_name: "asc" });
            return results;
        }
    }
};