import supertest from 'supertest';
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";
import {UserTest} from "./test-util";

// Set timeout untuk seluruh test di file ini
jest.setTimeout(20000); // 20 detik

describe('POST /api/v1/task', () => {
    it('Menerima request pembuatan task baru saat semua datanya valid', async () => {
        const response = await supertest(web)
            .post("/api/v1/task")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNjA4NjI5LCJleHAiOjE3MzI2MTU4Mjl9.tgIMkktY3pl-1XAhB4uiCSvmntzBvpIlfNnAD9bc6JU")
            .send({
                task_name: "Test ACC BARU COY",
                gitlab_link: "url.com",
                scope: "BE",
                module_type: "DTS User",
                problem_type: "Problem Test",
                category: "Fitur Baru",
                programmer_name: "Ethan",
                qa_name: "Ethan QA",
                deadline_date: "2024-11-29",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
    });
});

describe('PATCH /api/v1/task', () => {
    it('Menerima request pembuatan task baru saat semua datanya valid', async () => {
        const response = await supertest(web)
            .patch("/api/v1/task/4")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNTkxMzU4LCJleHAiOjE3MzI1OTg1NTh9.57Gn13FpgDcxC-DozUM5Kfbc3nOFY47zg3FqQOpEPH8")
            .send({
                task_name: "Test 3",
                gitlab_link: "url.com",
                scope: "BE",
                module_type: "DTS User",
                problem_type: "Problem Test",
                category: "Fitur Baru",
                programmer_name: "Ethan",
                qa_name: "Ethan QA",
                deadline_date: "2024-11-29",
                task_status: "Doing"
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
    });
});

describe('GET /api/v1/task', () => {
    it('Menerima request untuk get task detail', async () => {
        const response = await supertest(web)
            .get("/api/v1/task/4")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNTkxMzU4LCJleHAiOjE3MzI1OTg1NTh9.57Gn13FpgDcxC-DozUM5Kfbc3nOFY47zg3FqQOpEPH8")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    });
});

describe('DELETE /api/v1/task', () => {
    it('Menerima request untuk menghapus suatu task', async () => {
        const response = await supertest(web)
            .delete("/api/v1/task/4")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNTkxMzU4LCJleHAiOjE3MzI1OTg1NTh9.57Gn13FpgDcxC-DozUM5Kfbc3nOFY47zg3FqQOpEPH8")

        logger.debug(response.body);
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/tasks/summary', () => {
    it('Mengakses summary dari keseluruhan status tasks', async () => {
        const response = await supertest(web)
            .get("/api/v1/tasks")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNTk5NjMyLCJleHAiOjE3MzI2MDY4MzJ9.Wy6_l1nWKzyuoF3HKCK1MyINYM8hG5l2jlAKSlqNqMg")

        logger.debug(response.body);
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/tasks/download', () => {
    it('Download seluruh tasks', async () => {
        const response = await supertest(web)
            .get("/api/v1/tasks/download")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNTk5NjMyLCJleHAiOjE3MzI2MDY4MzJ9.Wy6_l1nWKzyuoF3HKCK1MyINYM8hG5l2jlAKSlqNqMg")

        logger.debug(response.body);
        expect(response.status).toBe(200);
    });
});
