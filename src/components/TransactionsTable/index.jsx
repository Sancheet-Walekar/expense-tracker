import React, { useState } from 'react'
import { Select, Table } from 'antd';
import { Input, Radio } from "antd";

import searchImg from '../../assets/search.svg'
function TransactionTable({ transactions }) {
    const { Search } = Input;
    const { Option } = Select;
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Tag",
            dataIndex: "tag",
            key: "tag",
        },
    ];

    let filteredTransactions = transactions.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.type.includes(typeFilter));

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    return (
        <>
            <div className="input-flex">
                <img src={searchImg} width="16" />
                <input
                    placeholder="Search by Name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Select
                className="select-input"
                onChange={(value) => setTypeFilter(value)}
                value={typeFilter}
                placeholder="Filter"
                allowClear
            >
                <Option value="">All</Option>
                <Option value="income">Income</Option>
                <Option value="expense">Expense</Option>
            </Select>

            <Radio.Group
                className="input-radio"
                onChange={(e) => setSortKey(e.target.value)}
                value={sortKey}
            >
                <Radio.Button value="">No Sort</Radio.Button>
                <Radio.Button value="date">Sort by Date</Radio.Button>
                <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>

            <Table dataSource={sortedTransactions} columns={columns} />

        </>
    )
}

export default TransactionTable