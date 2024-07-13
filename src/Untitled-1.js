// import React, { useEffect, useState } from "react";
// import { ICutomers, IRowData, ITransactions } from "../interface";
// import axios from "axios";
// type Props = {};

// function TransactionData({ }: Props) {
//     const [customers, setCustomers] = useState<ICutomers[]>([]);
//     const [transactions, setTransaction] = useState<ITransactions[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
//     const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

//     const formatCurrency = (amount: number) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//         }).format(amount);
//     };

//     const renderTransactions = (transactions: ITransactions[]) => {
//         const filteredTransactions = transactions.filter(transaction =>
//             (minAmount === undefined || transaction.amount >= minAmount) &&
//             (maxAmount === undefined || transaction.amount <= maxAmount)
//         );

//         return (
//             <div className="flex flex-wrap my-2 gap-3">
//                 {filteredTransactions.map((transaction: ITransactions) => (
//                     <div key={transaction.id} className="bg-green-100 flex hover:bg-green-200 transition duration-300 w-[15rem] justify-center p-8 rounded-2xl">
//                         <div className="flex flex-col text-sm font-semibold">
//                             <div>Transiction Date: {transaction.date.toString()}</div>
//                             <div>Transiction Amount: {formatCurrency(transaction.amount)}</div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     };

//     useEffect(() => {
//         axios.get('http://localhost:3001/transactions')
//             .then((res) => {
//                 setTransaction(res.data);
//             })
//             .catch(err => console.log("Error fetching transactions:", err));

//         axios.get('http://localhost:3001/customers')
//             .then((res) => {
//                 setCustomers(res.data);
//             })
//             .catch(err => console.log("Error fetching customers:", err));
//     }, []);

//     const aggregatedCustomers = customers.map(customer => ({
//         ...customer,
//         transactions: transactions.filter(transaction => transaction.customer_id == customer.id)
//     }));
//     console.log(aggregatedCustomers)

//     // Filter customers based on search term and amount range
//     const filteredCustomers = aggregatedCustomers.filter(customer =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         customer.transactions.some(transaction =>
//             (minAmount === undefined || transaction.amount >= minAmount) &&
//             (maxAmount === undefined || transaction.amount <= maxAmount)
//         )
//     );

//     return (
//         <div className="card border w-2/3  rounded-3xl  mt-2 ">
//             <div className="overflow-x-auto">
//                 <div className="flex justify-center mb-4 space-x-20">
//                     <div>
//                         <label htmlFor="">Name:</label>
//                         <input
//                             type="text"
//                             className=" border-2 focus:outline-green-200 "
//                             placeholder="Search by customer name"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <div className="flex flex-col">

//                         <div className="flex gap-2 ">
//                             <input
//                                 type="string"
//                                 className="w-24 border-2 p-2 focus:outline-green-200 "
//                                 placeholder="Min"
//                                 value={minAmount === undefined ? '' : minAmount}
//                                 onChange={(e) => setMinAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
//                             />
//                             <div className="self-center">
//                                 amount
//                             </div>
//                             <input
//                                 type="string"
//                                 className="w-24 border-2 p-2 focus:outline-green-200 "
//                                 placeholder="Max"
//                                 value={maxAmount === undefined ? '' : maxAmount}
//                                 onChange={(e) => setMaxAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Name
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Name
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Transactions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-300 ">
//                         {filteredCustomers.map((customer) => (
//                             <tr key={customer.id} className=" cursor-pointer">
//                                 <td className="  whitespace-nowrap align-top lg:align-middle rounded-full flex">

//                                     <img src={customer.profileImg} className="rounded-full w-12 h-12 object-contain" alt="" />
//                                     {customer.name}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap align-top lg:align-middle">

//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap align-top lg:align-middle">
//                                     {renderTransactions(customer.transactions)}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// }

// export default TransactionData;
// import React, { useEffect, useState } from "react";
// import { ICutomers, ITransactions } from "../interface";
// import axios from "axios";

// type Props = {};

// function TransactionData({ }: Props) {
//     const [customers, setCustomers] = useState<ICutomers[]>([]);
//     const [transactions, setTransaction] = useState<ITransactions[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
//     const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

//     const formatCurrency = (amount: number) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//         }).format(amount);
//     };

//     const renderTransactions = (transactions: ITransactions[]) => {
//         const filteredTransactions = transactions.filter(transaction =>
//             (minAmount === undefined || transaction.amount >= minAmount) &&
//             (maxAmount === undefined || transaction.amount <= maxAmount)
//         );

//         return (
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Transaction Date
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Transaction Amount
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-300 ">
//                     {filteredTransactions.map((transaction: ITransactions) => (
//                         <tr key={transaction.id} className="hover:bg-gray-100 cursor-pointer">
//                             <td className="px-6 py-4 whitespace-nowrap align-top lg:align-middle">
//                                 {transaction.date.toString()}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap align-top lg:align-middle">
//                                 {formatCurrency(transaction.amount)}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         );
//     };

//     useEffect(() => {
//         axios.get('http://localhost:3001/transactions')
//             .then((res) => {
//                 setTransaction(res.data);
//             })
//             .catch(err => console.log("Error fetching transactions:", err));

//         axios.get('http://localhost:3001/customers')
//             .then((res) => {
//                 setCustomers(res.data);
//             })
//             .catch(err => console.log("Error fetching customers:", err));
//     }, []);

//     const aggregatedCustomers = customers.map(customer => ({
//         ...customer,
//         transactions: transactions.filter(transaction => transaction.customer_id == customer.id)
//     }));

//     // Filter customers based on search term and amount range
//     const filteredCustomers = aggregatedCustomers.filter(customer =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         customer.transactions.some(transaction =>
//             (minAmount === undefined || transaction.amount >= minAmount) &&
//             (maxAmount === undefined || transaction.amount <= maxAmount)
//         )
//     );

//     return (
//         <div className="card border w-2/3 rounded-3xl mt-2">
//             <div className="overflow-x-auto">
//                 <div className="flex justify-center mb-4 space-x-20">
//                     <div>
//                         <label htmlFor="">Name:</label>
//                         <input
//                             type="text"
//                             className="border-2 focus:outline-green-200"
//                             placeholder="Search by customer name"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <div className="flex flex-col">
//                         <div className="flex gap-2">
//                             <input
//                                 type="string"
//                                 className="w-24 border-2 p-2 focus:outline-green-200"
//                                 placeholder="Min"
//                                 value={minAmount === undefined ? '' : minAmount}
//                                 onChange={(e) => setMinAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
//                             />
//                             <div className="self-center">amount</div>
//                             <input
//                                 type="string"
//                                 className="w-24 border-2 p-2 focus:outline-green-200"
//                                 placeholder="Max"
//                                 value={maxAmount === undefined ? '' : maxAmount}
//                                 onChange={(e) => setMaxAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Profile Image
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Name
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Transactions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-300">
//                         {filteredCustomers.map((customer) => (
//                             <tr key={customer.id} className="cursor-pointer">
//                                 <td className="whitespace-nowrap align-top lg:align-middle flex items-center py-4">
//                                     <img src={customer.profileImg} className="rounded-full w-12 h-12 object-cover" alt="" />
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap align-top lg:align-middle">
//                                     {customer.name}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap align-top lg:align-middle">
//                                     {renderTransactions(customer.transactions)}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default TransactionData;
