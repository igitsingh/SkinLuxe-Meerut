export class NotificationService {
    static async sendSMS(phone: string, message: string): Promise<void> {
        // In a real app, integrate Twilio here
        console.log(`[SMS] To: ${phone} | Message: ${message}`);
    }

    static async sendEmail(email: string, subject: string, body: string): Promise<void> {
        // In a real app, integrate Resend/SendGrid here
        console.log(`[EMAIL] To: ${email} | Subject: ${subject} | Body: ${body}`);
    }

    static async sendOrderConfirmation(order: any): Promise<void> {
        const message = `Your order #${order.id.slice(0, 6)} has been placed successfully! Total: ₹${order.total}`;
        if (order.user.phone) {
            await this.sendSMS(order.user.phone, message);
        }
        await this.sendEmail(order.user.email, 'Order Confirmation', message);
    }

    static async sendStatusUpdate(order: any): Promise<void> {
        const message = `Update: Your order #${order.id.slice(0, 6)} is now ${order.status.replace(/_/g, ' ')}.`;
        if (order.user.phone) {
            await this.sendSMS(order.user.phone, message);
        }
        await this.sendEmail(order.user.email, 'Order Status Update', message);
    }
}
