const express = require("express");
const router = express.Router();
const TPF = require("../models/TPF");

router.get("/tpf", async (req, res) => {
  const allFinance = await TPF.find();
  res.send(allFinance);
});

router.post("/tpf", async (req, res) => {
  try {
    const { financeNumber, paymentAmount, paymentType, remarks } = req.body;

    const FinanceObject = await TPF.findOne({ financeNumber });

    if (!FinanceObject) {
      return res.status(404).json({ error: "Finance record not found" });
    }

    let updatingEMI = { ...req.body, date: new Date() };
    FinanceObject.EMI = [...(FinanceObject.EMI || []), updatingEMI];


    let emiLeft = Number(FinanceObject.financeObject.numberOfEMILeft);
    if (emiLeft>0){emiLeft -= 1}
    FinanceObject.financeObject.numberOfEMILeft = emiLeft.toString();
    FinanceObject.markModified("financeObject");

    await FinanceObject.save();

    res.status(200).json({ message: "EMI added successfully", data: FinanceObject });
  } catch (err) {
    console.error("Error in /tpf POST:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
