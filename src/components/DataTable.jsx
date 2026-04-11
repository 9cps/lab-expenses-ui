import React from 'react';
import moment from 'moment';

const typeBadge = {
    FIXCOST: 'badge-info',
    CREDIT: 'badge-warning',
    OTHER: 'badge-ghost',
};

function DataTable({ dataList, onEdit, onDelete }) {
    const rows = dataList?.data || [];

    return (
        <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur shadow-xl overflow-hidden">
            <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
                <table className="table table-sm">
                    <thead className="sticky top-0 bg-neutral-900/80 backdrop-blur z-10">
                        <tr className="text-xs uppercase tracking-wider text-neutral-400">
                            <th className="w-12">No.</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th className="text-right">Amount</th>
                            <th>Created</th>
                            <th className="text-center w-28">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((item, index) => (
                                <tr key={item.ID ?? index} className="hover border-neutral-800">
                                    <td className="text-neutral-500">{index + 1}</td>
                                    <td>
                                        <span className={`badge ${typeBadge[item.ExpensesType] || 'badge-ghost'} badge-sm`}>
                                            {item.ExpensesType}
                                        </span>
                                    </td>
                                    <td className="font-medium">{item.ExpensesDesc}</td>
                                    <td className="text-right font-mono font-semibold">
                                        {Number(item.ExpensesAmount).toLocaleString()}
                                    </td>
                                    <td className="text-neutral-400 text-xs">
                                        <div>{moment(item.CreatedAt).format('DD/MM/YYYY')}</div>
                                        <div className="opacity-60">{moment(item.CreatedAt).format('HH:mm:ss')}</div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-1">
                                            <button
                                                className="btn btn-ghost btn-xs text-info"
                                                onClick={() => onEdit?.(item)}
                                                title="Edit"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                className="btn btn-ghost btn-xs text-error"
                                                onClick={() => onDelete?.(item)}
                                                title="Delete"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center py-10 text-neutral-500" colSpan="6">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;
