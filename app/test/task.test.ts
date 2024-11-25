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
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjM0IiwiaWF0IjoxNzMyNTM2MTkxLCJleHAiOjE3MzI1NDMzOTF9.neH4l7Ov5om4f-Ti-0y-_KsnDRznVcsXCaCear9gAVI")
            .send({
                task_name: "Test 1",
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
