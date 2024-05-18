export default {
  async registerCoach(ctx, data) {
    const userID = ctx.rootGetters.userID;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    // Result will be stored in the variable only when the request is done
    const response = await fetch(
      `https://find-a-coach-vue-course-app-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userID}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    if (!response.ok) {
      // error...
    }

    ctx.commit('registerCoach', {
      id: userID,
      ...coachData,
    });
  },

  async loadCoaches(ctx) {
    const response = await fetch(
      `https://find-a-coach-vue-course-app-default-rtdb.europe-west1.firebasedatabase.app/coaches.jso`
    );

    // Here we have to await `json()` because it's a promise method
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    Object.keys(responseData).forEach((coachKey) => {
      const coach = {
        id: coachKey,
        firstName: responseData[coachKey].firstName,
        lastName: responseData[coachKey].lastName,
        description: responseData[coachKey].description,
        hourlyRate: responseData[coachKey].hourlyRate,
        areas: responseData[coachKey].areas,
      };

      coaches.push(coach);
    });

    ctx.commit('setCoaches', coaches);
  },
};
