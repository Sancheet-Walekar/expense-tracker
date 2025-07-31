import Card from 'antd/es/card/Card';
import React from 'react';
import Button from '../Button';
import "./styles.css";
import { Row } from 'antd';
function Cards({ income,expenses,currentBalance,showIncomeModal,showExpenseModal} ) {
    console.log("Cards component rendered");
    return (
        <>
            <div>
                <Row className='my-row'>
                    <Card className="my-card" >
                        <h2>Current Balance</h2>
                        <p>₹ {currentBalance}</p>
                        <Button text="Reset Balance"></Button>
                    </Card>

                    <Card className="my-card" >
                        <h2>Total Income</h2>
                        <p>₹ {income}</p>
                        <Button text="Add Income" onClick={showIncomeModal}></Button>
                    </Card>

                    <Card className="my-card">
                        <h2>Total Expenses</h2>
                        <p>₹ {expenses}</p>
                        <Button text="Add Expense" onClick={showExpenseModal}></Button>
                    </Card>
                </Row>
            </div>
        </>
    )
}

export default Cards