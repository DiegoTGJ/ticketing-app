import request from "supertest";
import { app } from "../../app";

const route = "/api/users/signup";
it("returns a 201 on succesful signup", async () => {
  return request(app)
    .post(route)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("return a 400 with an invalid email", async () => {
  return request(app)
    .post(route)
    .send({
      email: "test@.com",
      password: "asdsadsads",
    })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post(route)
    .send({
      email: "test@test.com",
      password: "12",
    })
    .expect(400);
});

it("sets a cookie after succesful signup", async () => {
  const res = await request(app)
    .post(route)
    .send({
      email: "test@test.com",
      password: "1233",
    })
    .expect(201);
  expect(res.get("Set-Cookie")).toBeDefined();
});

it("returns method not allowed with method other than POST", async () => {
  const res = await request(app)
    .put(route)
    .send({
      email: "test@test.com",
      password: "1233",
    })
    .expect(405);
});
