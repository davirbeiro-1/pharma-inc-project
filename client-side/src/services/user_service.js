import axios from "axios";

export const userService = {
  getUsers,
  getUserById,
  updateUserById,
};

async function getUsers() {
  try {
    return await (
      await axios.get("http://localhost:3000/v1/users", {
        params: {
          _limit: 50,
        },
      })
    ).data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(userId) {
  try {
    return await (
      await axios.get(`http://localhost:3000/v1/users/${userId}`)
    ).data;
  } catch (error) {
    console.error(error);
  }
}

async function updateUserById(user) {
  delete user.fullName;
  try {
    return await axios.put(`http://localhost:3000/v1/users/${user.userId}`, {
      name: user.name,
      location: user.location,
      gender: user.gender,
      phone: user.phone,
      email: user.email,
      nat: user.nationality,
      id: {
        value: user.id.value,
      },
      dob: {
        age: calculateAge(user.birth),
        date: dateString2Date(user.birth),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function calculateAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString2Date(dateString));
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function dateString2Date(date) {
  const splitedDates = date.split("/");
  const dateInOrder = [splitedDates[1], splitedDates[0], splitedDates[2]];
  return new Date(dateInOrder);
}
