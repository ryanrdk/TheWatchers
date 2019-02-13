exports.resolvers = {
    Query: {
        getAllBootcampers: async (root, args, { Bootcamper }) => {
            const allBootcampers = await Bootcamper.find().sort({ first_name: "asc" });
            return allBootcampers;
        },
        getBootcampersByGender: async (root, { gender, campus, ethnicity }, { Bootcamper }) => {
            if (gender) {
                if (campus) {
                    if (ethnicity) {
                        const results = await Bootcamper.find({ gender, campus, ethnicity }).sort({ first_name: "asc" });
                        return results;
                    }
                    const results = await Bootcamper.find({ gender, campus }).sort({ first_name: "asc" });
                    return results;
                }
                if (ethnicity) {
                    const results = await Bootcamper.find({ gender, ethnicity }).sort({ first_name: "asc" });
                    return results;
                }
                const results = await Bootcamper.find({ gender }).sort({ first_name: "asc" });
                return results;
            }
            else return null;
        }
    }
};

// async (root, arguments, models being used)

// // Root resolver
// var root = {
//     message: () => 'Hello World!'
// };