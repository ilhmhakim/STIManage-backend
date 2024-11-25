import supertest from 'supertest'
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";
import {UserTest} from "./test-util";

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