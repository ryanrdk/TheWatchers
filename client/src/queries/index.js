const GRAPHQL_API = 'http://localhost:4000/graphql';

export const GET_ALL_BOOTCAMPERS = function(component) {
  // let ans = null;
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
  }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (result.data !== null && result.data !== undefined) {
        if (component.current !== null && component.current !== undefined) {
          component.current.updateStats(result.data.getAllBootcampers);
        }
      }
    });
};

export const GET_BOOTCAMPERS_BY_GENDER = function(component, gender, campus) {
  let camp_str;
  if (campus === undefined) {
    campus = null;
    camp_str = null;
  } else camp_str = `"${campus}"`;
  const query = `
    query ($gender: String!, $campus: String) {
      getBootcampersByGender(gender: $gender, campus: $campus) {
        first_name
        last_name
        gender
        ethnicity
        campus
      }
    }`;

  const variables = `{  "gender": "${gender}", "campus": ${camp_str}}`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      let white_count = 0;
      let black_count = 0;
      let coloured_count = 0;
      let indian_count = 0;
      let chinese_count = 0;
      let dataQL = result.data.getBootcampersByGender;
      for (let elem in dataQL) {
        if (dataQL[elem].ethnicity === 'white') white_count++;
        if (dataQL[elem].ethnicity === 'black') black_count++;
        if (dataQL[elem].ethnicity === 'coloured') coloured_count++;
        if (dataQL[elem].ethnicity === 'indian') indian_count++;
        if (dataQL[elem].ethnicity === 'chinese') chinese_count++;
      }
      if (result.data !== null && result.data !== undefined) {
        if (component.current !== null && component.current !== undefined) {
          component.current.updateDemoCount(
            campus,
            gender,
            white_count,
            black_count,
            coloured_count,
            indian_count,
            chinese_count
          );
          component.current.updateStats(component.current.state.demoCount);
        }
      }
    });
};
