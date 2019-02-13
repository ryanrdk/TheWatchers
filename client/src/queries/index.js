const GRAPHQL_API = 'http://localhost:4000/graphql';

export const GET_ALL_BOOTCAMPERS = function (component) {
    // var ans = null;
    const query = `{
        getAllBootcampers {
            _id
            first_name
            last_name
            username
            email
            gender
            campus
            ethnicity
            active
        }
        }`
    fetch(GRAPHQL_API, {
        method: 'POST',
        body: JSON.stringify({
            query
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(result => {
            component.current.updateStats(result.data.getAllBootcampers)
        })
}

export const GET_BOOTCAMPERS_BY_GENDER = function (component, gender, doCount, campus, ethnicity) {
    var camp_str;
    var ethn_str;
    if (doCount === undefined) { doCount = false };
    if (campus === undefined) { campus = null; camp_str = null } else camp_str = `"${campus}"`
    if (ethnicity === undefined) { ethnicity = null; ethn_str = null } else ethn_str = `"${ethnicity}"`
    const query = `
    query ($gender: String!, $campus: String, $ethnicity: String) {
        getBootcampersByGender(gender: $gender, campus: $campus, ethnicity: $ethnicity) {
            first_name
            last_name
            gender
            ethnicity
            campus
        }
    }`

    const variables = `{  "gender": "${gender}", "campus": ${camp_str}, "ethnicity" : ${ethn_str}}`
    fetch(GRAPHQL_API, {
        method: 'POST',
        body: JSON.stringify({
            //query: "query ($gender: String!, $campus: String, $ethnicity: String) {  getAllFemaleBootcampers(gender: $gender, campus: $campus, ethnicity: $ethnicity) {    first_name    last_name    gender    ethnicity    campus }}",
            query,
            variables//: {  "gender": "female", "campus": null}
        }),
        headers: {
            'content-type': 'application/json',
        }
    }).then(response => response.json())
        .then(result => {
            console.log("heeeeeeerrreeee", result)
            component.current.updateStats(result.data.getBootcampersByGender)
            if (doCount && campus) {
                var white_count = 0;
                var black_count = 0;
                var coloured_count = 0;
                var indian_count = 0;
                var chinese_count = 0
                var dataQL = result.data.getBootcampersByGender;
                for (var elem in dataQL) {
                    if (dataQL[elem].ethnicity === 'white') white_count++;
                    if (dataQL[elem].ethnicity === 'black') black_count++;
                    if (dataQL[elem].ethnicity === 'coloured') coloured_count++;
                    if (dataQL[elem].ethnicity === 'indian') indian_count++;
                    if (dataQL[elem].ethnicity === 'chinese') chinese_count++;
                }
                component.current.updateDemoCount(campus, gender, white_count, black_count, coloured_count, indian_count, chinese_count);
            }
            console.log("jdjdsjsdsjd", component.current.state)
        })
}