import { ErrorResponse } from "react-router-dom";
import { ErrorMessage, LoggedinUser, RegisterUser } from "../../models/Modal";

export function creatUser(userData: RegisterUser) {
  return new Promise<{ data: LoggedinUser }>(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
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
    try {
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err: ErrorMessage = await response.json();
        reject(reject(err));
      }
    } catch (err) {
      reject({ err });
    }
  });
}

export function signOut(userId: string) {
  return new Promise<{ data: string }>(async (resolve) => {
    // TODO : on sever we will remove user session info
    resolve({ data: "success" });
  });
}
