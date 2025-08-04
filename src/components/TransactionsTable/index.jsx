import React, { useState } from 'react';
import { Select, Table, Input, Radio } from 'antd';
import searchImg from '../../assets/search.svg';
import { unparse } from 'papaparse';

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

    let filteredTransactions = transactions.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            item.type.includes(typeFilter)
    );

  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
        <div style={{ width: "100%", padding: "0rem 2rem" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
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
            </div>

            <div className="my-table">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: "1rem",
                    }}
                >
                    <h2>My Transactions</h2>

                    <Radio.Group
                        className="input-radio"
                        onChange={(e) => setSortKey(e.target.value)}
                        value={sortKey}
                    >
                        <Radio.Button value="">No Sort</Radio.Button>
                        <Radio.Button value="date">Sort by Date</Radio.Button>
                        <Radio.Button value="amount">Sort by Amount</Radio.Button>
                    </Radio.Group>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                            width: "400px",
                            marginRight: "48px"
                        }}
                    >
                        <button className="btn" onClick={exportToCsv}>Export to CSV</button>
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={sortedTransactions}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
}

export default TransactionTable;
