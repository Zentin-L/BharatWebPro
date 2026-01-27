import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export interface PaymentOrderData {
  amount: number; // in rupees
  gstAmount: number;
  totalAmount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, any>;
}

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

class RazorpayService {
  /** Create a payment order */
  async createOrder(data: PaymentOrderData) {
    try {
      const options = {
        amount: Math.round(data.totalAmount * 100), // paise
        currency: data.currency || 'INR',
        receipt: data.receipt || `rcpt_${Date.now()}`,
        notes: {
          ...data.notes,
          amount: data.amount,
          gst: data.gstAmount,
          total: data.totalAmount,
        },
      };

      const order = await razorpay.orders.create(options);
      return { success: true, order };
    } catch (error: any) {
      console.error('Razorpay Order Creation Error:', error);
      return { success: false, error: error.message };
    }
  }

  /** Verify payment signature */
  verifyPaymentSignature(data: PaymentVerificationData): boolean {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest('hex');

      return expectedSignature === razorpay_signature;
    } catch (error) {
      console.error('Signature Verification Error:', error);
      return false;
    }
  }

  /** Fetch payment details */
  async getPayment(paymentId: string) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return { success: true, payment };
    } catch (error: any) {
      console.error('Fetch Payment Error:', error);
      return { success: false, error: error.message };
    }
  }

  /** Initiate refund */
  async refundPayment(paymentId: string, amount?: number) {
    try {
      const refundData: any = { payment_id: paymentId };
      if (amount) refundData.amount = Math.round(amount * 100);

      const refund = await razorpay.payments.refund(paymentId, refundData);
      return { success: true, refund };
    } catch (error: any) {
      console.error('Refund Error:', error);
      return { success: false, error: error.message };
    }
  }

  /** Create UPI payment link */
  async createPaymentLink(data: {
    amount: number;
    description: string;
    customerName: string;
    customerEmail?: string;
    customerPhone: string;
    callbackUrl?: string;
  }) {
    try {
      const options = {
        amount: Math.round(data.amount * 100),
        currency: 'INR',
        description: data.description,
        customer: {
          name: data.customerName,
          email: data.customerEmail,
          contact: data.customerPhone,
        },
        notify: {
          sms: true,
          email: !!data.customerEmail,
        },
        reminder_enable: true,
        callback_url: data.callbackUrl || `${process.env.NEXTAUTH_URL}/api/payment/callback`,
        callback_method: 'get',
      };

      const paymentLink = await razorpay.paymentLink.create(options);
      return { success: true, paymentLink };
    } catch (error: any) {
      console.error('Payment Link Creation Error:', error);
      return { success: false, error: error.message };
    }
  }

  /** Calculate GST (18%) */
  calculateGST(amount: number): { amount: number; gst: number; total: number } {
    const gst = Math.round((amount * 18) / 100);
    const total = amount + gst;
    return { amount, gst, total };
  }

  /** Get pricing for plans */
  getPlanPricing(plan: string): { amount: number; gst: number; total: number } | null {
    const pricing: Record<string, number> = {
      BASIC: 14999,
      PREMIUM: 29999,
      ENTERPRISE: 59999,
      STARTER_MONTHLY: 999,
      BUSINESS_MONTHLY: 2499,
      ENTERPRISE_MONTHLY: 4999,
    };

    const amount = pricing[plan];
    if (!amount) return null;
    return this.calculateGST(amount);
  }
}

export const razorpayService = new RazorpayService();
export default razorpayService;
