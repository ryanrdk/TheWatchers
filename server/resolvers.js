exports.resolvers = {
    Query: {
        getAllBootcampers: async (root, args, { Bootcamper }) => {
            const allBootcampers = await Bootcamper.find().sort({ first_name: "asc" });
            return allBootcampers;
        }
    }
};

// async (root, arguments, models being used)

// // Root resolver
// var root = {
//     message: () => 'Hello World!'
// };