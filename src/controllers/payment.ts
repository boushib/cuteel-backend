import Stripe from 'stripe'
import { Request, Response } from 'express'

export const generateSecret = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27',
  })

  try {
    // Psst. For production-ready applications we recommend not using the
    // amount directly from the client without verifying it first. This is to
    // prevent bad actors from changing the total amount on the client before
    // it gets sent to the server. A good approach is to send the quantity of
    // a uniquely identifiable product and calculate the total price server-side.
    // Then, you would only fulfill orders using the quantity you charged for.

    const { amount } = req.body
    if (!amount) res.status(400).json({ message: 'Amount is invalid!' })
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    return res.status(500).json({
      message: 'Error processing your payment! Please try again later!',
    })
  }
}
