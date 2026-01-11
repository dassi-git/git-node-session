const nodemailer = require('nodemailer');

const createTransporter = () => {
    console.log('Creating transporter with:', {
        service: 'gmail',
        user: process.env.EMAIL_USER,
        hasPassword: !!process.env.EMAIL_PASSWORD
    });
    
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

const sendPasswordResetEmail = async (email, resetToken, userName) => {
    console.log('Sending email to:', email);
    
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: email,
        subject: 'איפוס סיסמה - My Store',
        html: `
            <div style="direction: rtl; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0;">My Store</h1>
                </div>
                
                <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin-bottom: 20px;">שלום ${userName},</h2>
                    
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        קיבלנו בקשה לאיפוס הסיסמה של החשבון שלך. 
                    </p>
                    
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        לחץ על הכפתור למטה כדי לאפס את הסיסמה שלך:
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                  color: white; 
                                  padding: 15px 40px; 
                                  text-decoration: none; 
                                  border-radius: 5px; 
                                  display: inline-block;
                                  font-weight: bold;
                                  font-size: 16px;">
                            איפוס סיסמה
                        </a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        או העתק והדבק את הקישור הזה בדפדפן:
                    </p>
                    <p style="color: #667eea; font-size: 14px; word-break: break-all;">
                        ${resetUrl}
                    </p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #999; font-size: 13px; line-height: 1.6;">
                            ⚠️ קישור זה תקף למשך שעה אחת בלבד.<br>
                            אם לא ביקשת איפוס סיסמה, התעלם ממייל זה.
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                    © 2026 My Store. כל הזכויות שמורות.
                </div>
            </div>
        `
    };
    
    try {
        console.log('📮 שולח מייל...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ המייל נשלח בהצלחה!', {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected
        });
        return { success: true };
    } catch (error) {
        console.error('❌ שגיאה בשליחת מייל:', {
            message: error.message,
            code: error.code,
            response: error.response,
            command: error.command
        });
        return { success: false, error: error.message };
    }
};

module.exports = { sendPasswordResetEmail };
