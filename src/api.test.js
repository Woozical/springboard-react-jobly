import JoblyAPI from "./api";
import token from "./TEST_TOKEN";
JoblyAPI.token = token;

// smoke test
test("can reach backend", async () => {
  await JoblyAPI.request("companies");
});

describe("GET operations", () => {
  test("GET company/:handle", async () => {
    const company = await JoblyAPI.getCompany("smith-llc");
    expect(company.name).toEqual("Smith LLC");
  });

  test("GET companies", async () => {
    const companies = await JoblyAPI.getCompanies();
    expect(Array.isArray(companies)).toBeTruthy();
  });

  test("GET companies with search params", async () => {
    const companies = await JoblyAPI.getCompanies({maxEmployees: 200, minEmployees: 100});
    expect(companies[0].numEmployees).toBeLessThanOrEqual(200);
    expect(companies[0].numEmployees).toBeGreaterThanOrEqual(100);
  });

  test("GET job", async () => {
    const job = await JoblyAPI.getJob(1);
    expect(job).not.toBeUndefined();
  });

  test("GET jobs", async () => {
    const jobs = await JoblyAPI.getJobs();
    expect(Array.isArray(jobs)).toBeTruthy();
  });

  test("GET jobs with search params", async () => {
    const jobs = await JoblyAPI.getJobs({minSalary : 50000});
    expect(jobs[0].salary).toBeGreaterThanOrEqual(50000);
  });

  test("GET user", async () => {
    const user = await JoblyAPI.getUser("admin");
    expect(user).not.toBeUndefined();
  });

  test("GET applications", async () => {
    const apps = await JoblyAPI.getUserApps("admin");
    expect(Array.isArray(apps)).toBeTruthy();
  });
});