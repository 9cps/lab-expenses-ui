import React from 'react';
import moment from 'moment'; // Import Moment.js

function DataTable({ dataList }) {
    console.log(dataList);

    return (
        <>
            <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Expenses Type</th>
                            <th>Expenses Description</th>
                            <th>Expenses Amount</th>
                            <th>Created Date</th>
                            <th>Created Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList && dataList.data ? (
                            dataList.data.map((item, index) => (
                                <tr key={index} className="hover">
                                    <td>{index + 1}</td>
                                    <td>{item.ExpensesType}</td>
                                    <td>{item.ExpensesDesc}</td>
                                    <td className='text-right'>{item.ExpensesAmount}</td>
                                    <td>{moment(item.CreatedAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(item.CreatedAt).format('HH:mm:ss')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className='text-center' colSpan="6">No records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;
