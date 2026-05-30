import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Missing form data' });
  }

  const recipient = 'jayjmehta251203@gmail.com';
  
  let subject = ``;
  let htmlContent = ``;

  // Filter and format label nicely
  const getLabel = (key) => {
    const customLabels = {
      name: 'Full Name',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location (City, State)',
      company: 'Company / Farm Name',
      shopName: 'Shop Name',
      companyName: 'Company Name',
      address: 'Full Address',
      city: 'City',
      state: 'State',
      country: 'Country',
      quantity: 'Quantity Needed',
      packSize: 'Pack Size Selection',
      crop: 'Crop Target Details',
      inquiryType: 'Inquiry Classification',
      subject: 'Inquiry Topic / Subject',
      message: 'Message Detail / Comments',
      turnover: 'Annual Business Turnover',
      currentProducts: 'Current Products Sold',
      productsOfInterest: 'Products of Interest'
    };
    return customLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getCleanFields = (fields) => {
    // Exclude technical metadata parameters
    const excludeList = ['recipient', 'category', 'productSlug', 'program', 'redirect', 'action'];
    return Object.entries(fields)
      .filter(([key]) => !excludeList.includes(key) && fields[key] !== undefined && fields[key] !== '')
      .map(([key, val]) => ({
        label: getLabel(key),
        value: val
      }));
  };

  const cleanFields = getCleanFields(data);

  const renderTableRows = (fieldsList) => {
    return fieldsList.map(field => `
      <tr style="border-bottom: 1px solid #e8f5e9;">
        <td style="padding: 12px 16px; font-weight: 700; color: #113416; font-size: 13px; width: 40%; vertical-align: top; background-color: #fcfdfe;">${field.label}</td>
        <td style="padding: 12px 16px; color: #333333; font-size: 13px; width: 60%; line-height: 1.5; background-color: #ffffff;">${field.value}</td>
      </tr>
    `).join('');
  };

  if (type === 'product_enquiry') {
    const prodName = data.productName || 'Agricultural Biological Solution';
    const userName = data.name || 'Valued Customer';
    subject = `🌾 [Product Inquiry] Request for ${prodName} - ${userName}`;
    
    htmlContent = `
      <div style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1.5px solid #d4af37; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(17,52,22,0.12); background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #113416 0%, #1c4d23 100%); color: white; padding: 28px 24px; text-align: center; border-bottom: 3px solid #d4af37;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1.5px; color: #d4af37; text-transform: uppercase;">JAY AGRITECH</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; opacity: 0.85; color: #ffffff;">Product Quote & Specification Request</p>
        </div>
        <div style="padding: 32px 24px;">
          <div style="border-left: 4px solid #d4af37; padding-left: 12px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 4px 0; color: #113416; font-size: 16px; font-weight: 700;">NEW QUOTE INQUIRY</h3>
            <p style="margin: 0; font-size: 12px; color: #666666;">Generated dynamically via the Automated Co-Pilot Agent</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e8f5e9; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
            <thead>
              <tr style="background-color: #113416; color: #ffffff;">
                <th colspan="2" style="padding: 10px 16px; text-align: left; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #d4af37;">INQUIRY DOSSIER</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(cleanFields)}
            </tbody>
          </table>

          <div style="margin-top: 24px; padding: 16px; background-color: #f7f9f7; border-radius: 8px; border: 1px dashed rgba(17,52,22,0.2); font-size: 12px; color: #555555; text-align: center;">
            Please coordinate and review details. Standard SLA response window is <strong>24 Business Hours</strong>.
          </div>
        </div>
        <div style="background-color: #f1f5f2; padding: 18px; text-align: center; border-top: 1px solid #e8f5e9; font-size: 11px; color: #888888;">
          © ${new Date().getFullYear()} Jay Agritech Pvt. Ltd. | Valsad, Gujarat, India. All rights reserved.
        </div>
      </div>
    `;
  } else if (type === 'become_partner') {
    const progName = data.program ? data.program.toUpperCase() : 'DEALER';
    const userName = data.fullName || 'Prospective Applicant';
    subject = `🤝 [Partner Application] ${progName} Program - ${userName}`;
    
    htmlContent = `
      <div style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1.5px solid #d4af37; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(17,52,22,0.12); background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #113416 0%, #1c4d23 100%); color: white; padding: 28px 24px; text-align: center; border-bottom: 3px solid #d4af37;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1.5px; color: #d4af37; text-transform: uppercase;">JAY AGRITECH</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; opacity: 0.85; color: #ffffff;">Partner Network Onboarding Portal</p>
        </div>
        <div style="padding: 32px 24px;">
          <div style="border-left: 4px solid #d4af37; padding-left: 12px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 4px 0; color: #113416; font-size: 16px; font-weight: 700;">PARTNER APPLICATION: ${progName} PROGRAM</h3>
            <p style="margin: 0; font-size: 12px; color: #666666;">Generated dynamically via the Automated Co-Pilot Agent</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e8f5e9; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
            <thead>
              <tr style="background-color: #113416; color: #ffffff;">
                <th colspan="2" style="padding: 10px 16px; text-align: left; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #d4af37;">APPLICATION DATA RECORD</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(cleanFields)}
            </tbody>
          </table>

          <div style="margin-top: 24px; padding: 16px; background-color: #f7f9f7; border-radius: 8px; border: 1px dashed rgba(17,52,22,0.2); font-size: 12px; color: #555555; text-align: center;">
            Applicant has selected <strong>${progName} Onboarding</strong>. Please review their commercial profile for approval.
          </div>
        </div>
        <div style="background-color: #f1f5f2; padding: 18px; text-align: center; border-top: 1px solid #e8f5e9; font-size: 11px; color: #888888;">
          © ${new Date().getFullYear()} Jay Agritech Pvt. Ltd. | Valsad, Gujarat, India. All rights reserved.
        </div>
      </div>
    `;
  } else if (type === 'contact') {
    const userName = data.name || 'Valued Customer';
    const subTopic = data.subject || 'General Assistance';
    subject = `📞 [Contact Form Request] Message from ${userName} - Topic: ${subTopic}`;
    
    htmlContent = `
      <div style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1.5px solid #d4af37; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(17,52,22,0.12); background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #113416 0%, #1c4d23 100%); color: white; padding: 28px 24px; text-align: center; border-bottom: 3px solid #d4af37;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1.5px; color: #d4af37; text-transform: uppercase;">JAY AGRITECH</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; opacity: 0.85; color: #ffffff;">General Helpdesk Inbox</p>
        </div>
        <div style="padding: 32px 24px;">
          <div style="border-left: 4px solid #d4af37; padding-left: 12px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 4px 0; color: #113416; font-size: 16px; font-weight: 700;">GENERAL ENQUIRY INBOUND</h3>
            <p style="margin: 0; font-size: 12px; color: #666666;">Generated dynamically via the Automated Co-Pilot Agent</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e8f5e9; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
            <thead>
              <tr style="background-color: #113416; color: #ffffff;">
                <th colspan="2" style="padding: 10px 16px; text-align: left; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #d4af37;">INBOUND MESSAGE DETAILS</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(cleanFields)}
            </tbody>
          </table>
        </div>
        <div style="background-color: #f1f5f2; padding: 18px; text-align: center; border-top: 1px solid #e8f5e9; font-size: 11px; color: #888888;">
          © ${new Date().getFullYear()} Jay Agritech Pvt. Ltd. | Valsad, Gujarat, India. All rights reserved.
        </div>
      </div>
    `;
  } else {
    subject = `📨 [Jay Agritech Form] New Request from ${data.name || data.fullName || 'User'}`;
    htmlContent = `
      <div style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1.5px solid #d4af37; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(17,52,22,0.12); background-color: #ffffff;">
        <div style="background: #113416; color: #ffffff; padding: 24px; text-align: center; border-bottom: 2px solid #d4af37;">
          <h2 style="margin: 0; color: #d4af37; letter-spacing: 1px;">JAY AGRITECH</h2>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #eeeeee;">
            <tbody>
              ${renderTableRows(cleanFields)}
            </tbody>
          </table>
        </div>
        <div style="background-color: #f1f5f2; padding: 14px; text-align: center; font-size: 11px; color: #888888;">
          © ${new Date().getFullYear()} Jay Agritech Pvt. Ltd.
        </div>
      </div>
    `;
  }

  // Check if real GMAIL credentials are provided in env
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS ? process.env.GMAIL_PASS.replace(/\s+/g, '') : '';

  // Safeguard: check if variables are placeholders
  const hasRealCredentials = gmailUser && gmailPass && !gmailPass.includes('xxxx') && !gmailPass.includes('your-16-character');

  if (hasRealCredentials) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass
        }
      });

      const customerEmail = data.email || data.fullName || gmailUser;

      const mailOptions = {
        from: `"Jay Agritech Portal" <${gmailUser}>`,
        to: recipient,
        replyTo: customerEmail,
        subject: subject,
        html: htmlContent
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Email sent successfully via Gmail SMTP to ' + recipient });
    } catch (error) {
      console.error('SMTP Email sending failed:', error);
      return res.status(500).json({ error: 'SMTP Connection failed: ' + error.message });
    }
  } else {
    // Standard mock logger fallback
    const logMessage = `
============================================================
MOCK EMAIL TO: ${recipient}
SUBJECT: ${subject}
DATE: ${new Date().toISOString()}
------------------------------------------------------------
FIELDS LOGGED:
${JSON.stringify(cleanFields, null, 2)}
============================================================
`;
    console.log(logMessage);
    
    try {
      const logPath = path.join(process.cwd(), 'mock-emails.log');
      fs.appendFileSync(logPath, logMessage);
    } catch (e) {
      console.error('Failed to write mock email to disk:', e);
    }

    return res.status(200).json({ 
      success: true, 
      mocked: true,
      message: `Form processed! A mock email has been logged to the console and to 'mock-emails.log' in the project directory. To send a real email from your Gmail account, replace the GMAIL_USER and GMAIL_PASS variables in '.env.local' with your real credentials.` 
    });
  }
}
