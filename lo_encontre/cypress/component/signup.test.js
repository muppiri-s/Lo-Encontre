describe("test user sign up", () => {
  it("can sign up as new user", async () => {
    // we will write this function next
    const inbox = await generateNewEmailAddress();
    await page.type('input[name="password"]', password);
    await page.type('input[name="email"]', inbox.email);
    await page.$eval('input[name="submit"]', (btn) => btn.click());
  });
});
const { MailSlurp } = require('mailslurp-client');
const api = new MailSlurp({ apiKey: process.env.API_KEY! });

async function generateNewEmailAddress() {
  return await api.createInbox();
}
const { emailAddress, id } = await generateNewEmailAddress();
async function getVerificationCode(inboxId: string) {
  const emails = await api.getEmails(inboxId, { minCount: 1 });
  const latestEmail = await api.getEmail(emails[0].id);
  const verificationCode = /code = (.*)/.exec(latestEmail.body)![1]!;
  return verificationCode;
}
expect(await getVerificationCode(id)).toContain('123');