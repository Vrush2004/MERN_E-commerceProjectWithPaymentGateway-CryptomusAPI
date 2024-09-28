import asyncHandler from "express-async-handler";

// @desc    create an invoice
// @api     GET /api/payment/create-invoice
// @access  Private
 export const createInvoice = asyncHandler(async (req, res) => {
    res.send("Hello World!")
  });