import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import activateEmailTemplate from '@/emails/activateEmailTemplate';

const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const mailingServiceClientID = '1046665240561-416npp7pupc7ukvfjul6nuqasf27k68u.apps.googleusercontent.com'
const mailingServiceSecret = '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'
const mailingServiceRefreshToken = '1//04i4AI4M21wK3CgYIARAAGAQSNwF-L9IrfSAEWNmQuMEZm3DJUe2mAgyPI9JHlrWGD-2EVmvtsqAi6H51AVzPehcHvHxA6CS6ikk'
const senderEmailAddress = 'farmediateam@gmail.com'

const oath2Client = new OAuth2(mailingServiceClientID, mailingServiceSecret, mailingServiceRefreshToken, OAUTH_PLAYGROUND)

//send email

export const sendEmail = (to, url, txt, subject, template) => {

    oath2Client.setCredentials({
        refresh_token: mailingServiceRefreshToken
    });
    const accessToken = oath2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: senderEmailAddress,
            clientId: '1046665240561-416npp7pupc7ukvfjul6nuqasf27k68u.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04i4AI4M21wK3CgYIARAAGAQSNwF-L9IrfSAEWNmQuMEZm3DJUe2mAgyPI9JHlrWGD-2EVmvtsqAi6H51AVzPehcHvHxA6CS6ikk',
            accessToken,
        }
    })
    const mailOptions = {
        from: senderEmailAddress,
        to: to,
        subject: subject,
        html: template(to, url),
    }
    smtpTransport.sendMail(mailOptions, (err,infos)=>{
        if (err) return err;
        return infos
    })
}