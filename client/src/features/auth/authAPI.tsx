import { ErrorMessage, LoggedinUser, RegisterUser } from "../models/Modal";

export function creatUser(userData: RegisterUser) {
  return new Promise<{ data: LoggedinUser }>(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO : on sever it will only return relevent information(not password)
    resolve({ data });
  });
}

export function checkUser(loginInfo: LoggedinUser) {
  return new Promise<{ data: LoggedinUser }>(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) resolve({ data: data[0] });
      else reject({ message: "Invalid Credentials" } as ErrorMessage);
    } else {
      reject({ message: "Invalid Credentials" } as ErrorMessage);
    }
  });
}
