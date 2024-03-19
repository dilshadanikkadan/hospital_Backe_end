export const currentUser = () => {


    let iduser;
    const jwtToken = localStorage.getItem('persist:root');

    try {

        if (JSON.parse(jwtToken).user !== "null" || JSON.parse(jwtToken).doctor !== "null") {
            const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

            const userId = decodedToken.id;
            iduser = userId
        }

    } catch (error) {
          console.log(error);
    }

    return iduser
}