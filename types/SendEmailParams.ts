
export default interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
    fromName?: string;
    fromEmail?: string;
}