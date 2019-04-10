export const GET_ALL_USERS = async function () {
    // return (await fetch(`http://serverlivetest.herokuapp.com/api/applications?fields=username%0Agender%0Aethnicity%0Acampus%0Afirst_name%0Alast_name%0Aemail`)
    //     .then(res => res.json()).then(dat => {
    //         return dat.data.getAllApplications;
    //     })
    //     .then(arr => {
    //         return Promise.all(arr.map((elem) => {
    //             return fetch(`http://serverlivetest.herokuapp.com/api/statuses?username=${elem.username}`)
    //                 .then(res => res.json()).then(dat => { console.log("inside", dat.data.getAllStatuses[0]); elem.active = dat.data.getAllStatuses[0].status; return elem })
    //                 .catch(err => { return elem });
    //         }))
    //     }))

    return (await fetch(`http://serverlivetest.herokuapp.com/api/applications?fields=username%0Agender%0Aethnicity%0Acampus%0Afirst_name%0Alast_name%0Aemail`)
        .then(res => res.json()).then(dat => {
            return dat.data.getAllApplications;
        })
        .then(async (arr) => {
            const statuses = await fetch(`http://serverlivetest.herokuapp.com/api/statuses?`).then(res => res.json()).then(dat => { return dat.data.getAllStatuses })
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < statuses.length; j++) {
                    if (arr[i].username === statuses[j].username)
                        arr[i].active = statuses[j].status;
                }
                if (!arr[i].active)
                    arr[i].active = "";
            }
            return arr;
        }))
}