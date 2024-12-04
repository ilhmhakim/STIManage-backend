// @ts-ignore
import supertest from 'supertest'
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";


describe('POST /api/v1/registration', () => {
    it('Menerima request register User saat semua datanya valid', async () => {
        const response = await supertest(web)
            .post("/api/v1/registration")
            .send({
                username: "test1234",
                password: "Abc1234#",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
    });
});

describe('POST /api/v1/login', () => {
    it('Menerima request login User saat semua datanya valid', async () => {
        const response = await supertest(web)
            .post("/api/v1/login")
            .send({
                username: "test1234",
                password: "Abc1234#",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.access_token).toBeDefined();
        expect(response.body.data.refresh_token).toBeDefined();
    });
});

describe('POST /api/v1/refresh', () => {
    it('Menerima access token yang baru', async () => {
        const response = await supertest(web)
            .post("/api/v1/refresh")
            .send({
                refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNjA4NTQ5LCJleHAiOjE3MzMyMTMzNDl9.iSRgYbIeNYaiWahnvZI0vZSfWE0w_KFF2vXgIkmoJQc"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.access_token).toBeDefined();
    });
});

describe('DELETE /api/v1/logout', () => {
    it('Download seluruh tasks', async () => {
        const response = await supertest(web)
            .delete("/api/v1/logout")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNjA4NjI5LCJleHAiOjE3MzI2MTU4Mjl9.tgIMkktY3pl-1XAhB4uiCSvmntzBvpIlfNnAD9bc6JU")

        logger.debug(response.body);
        expect(response.status).toBe(200);
    });
});