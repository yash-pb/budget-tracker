const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');
// Protected route
router.get('/search-user', verifyToken, async (req, res) => {
    try {
        const users = await User.find({name: { $regex: new RegExp(req.query.search, 'i') }},  {password: 0});
        res.status(200).json({ status: true, users: users });
    } catch (error) {
        console.log('error => ', error);
    }
});

router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        let currentUserId = getUserIdFromAuthToken(req.header('Authorization'))
        const allTransactions = await Transaction.find({user_id: currentUserId}, {password: 0});
        const result = await Transaction.aggregate([
            { $match: { user_id: currentUserId } },
            { 
                $group: {
                    _id: "$type",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        // Organize the sums into a more readable format
        let expenseSum = 0;
        let incomeSum = 0;
        result.forEach(item => {
            if (item._id === 'Expense') {
                expenseSum = item.totalAmount;
            } else if (item._id === 'Income') {
                incomeSum = item.totalAmount;
            }
        });

        res.status(200).json({ status: true, transactions: allTransactions, income: incomeSum, expense: expenseSum });
    } catch (error) {
        console.log('error => ', error);
    }
});

router.post('/add-transaction', verifyToken, async (req, res) => {
    try {
        let currentUserId = getUserIdFromAuthToken(req.header('Authorization'))
        const { description, amount, type } = req.body;
        const transaction = new Transaction({
            user_id: currentUserId,
            description: description,
            amount: amount,
            type: type 
        });
        await transaction.save();
        res.status(200).json({ message: 'Entry added success' });
    } catch (error) {
        console.log('error => ', error);
    }
});

router.post('/delete-transaction', verifyToken, async (req, res) => {
    try {
        let currentUserId = getUserIdFromAuthToken(req.header('Authorization'))
        const { transaction_id } = req.body;
        const transaction = await Transaction.deleteOne({ _id: `${transaction_id}` })
        if(transaction.deletedCount) {
            res.status(200).json({ message: 'Entry deleted success' });
        }
        res.status(500).json({ message: "Something went wrong" });
    } catch (error) {
        console.log('error => ', error);
    }
}); 

router.post('/logout', verifyToken, async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.log('error => ', error);
    }
});

router.get('/last-year', verifyToken, async (req, res) => {
    try {
        let currentUserId = getUserIdFromAuthToken(req.header('Authorization'))
        const today = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(today.getFullYear() - 1);
    
        const expenses = await Transaction.aggregate([
            { 
                $match: {
                    user_id: currentUserId,
                    created_at: {
                        $gte: lastYear,
                        $lt: today
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$created_at" },
                        month: { $month: "$created_at" }
                    },
                    totalIncome: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0]
                    }
                    },
                    totalExpense: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0]
                    }
                    }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);
    
        let labels = [];
        let incomeData = [];
        let expenseData = [];
        
        expenses.forEach(item => {
            // console.log('item => ', item);
            const dateLabel = `${item._id.year}-${item._id.month}`;
            labels.push(dateLabel);
            incomeData.push(item.totalIncome);
            expenseData.push(item.totalExpense);
        });
    
        res.status(200).json({
            labels: labels,
            datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                // stack: 'Stack 0',
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                // stack: 'Stack 0',
            }
            ]
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getUserIdFromAuthToken = (authToken) => {
    return (jwt.verify(authToken, 'secret@123')).userId ?? null;

}
module.exports = router;