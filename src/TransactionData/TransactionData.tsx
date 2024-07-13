import { useEffect, useState } from "react";
import { ICutomers, ITransactions } from "../interface";
import axios from "axios";

type Props = {};

function TransactionData({ }: Props) {
    const [customers, setCustomers] = useState<ICutomers[]>([]);
    const [transactions, setTransaction] = useState<ITransactions[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
    const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
    const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | undefined>(undefined);
    const [sortByAmount, setSortByAmount] = useState<'asc' | 'desc' | undefined>(undefined);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/transactions')
            .then((res) => {
                setTransaction(res.data);
            })
            .catch(err => console.log("Error fetching transactions:", err));

        axios.get('http://localhost:3001/customers')
            .then((res) => {
                setCustomers(res.data);
            })
            .catch(err => console.log("Error fetching customers:", err));
        setSortByDate('asc')
    }, []);

    const getCustomerById = (id: number) => customers.find(customer => customer.id == id);

    // Filter transactions based on search term and amount range
    const filteredTransactions = transactions.filter(transaction => {
        const customer = getCustomerById(transaction.customer_id);
        return customer &&
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (minAmount === undefined || transaction.amount >= minAmount) &&
            (maxAmount === undefined || transaction.amount <= maxAmount);
    });

    // Sort transactions by date
    if (sortByDate) {
        filteredTransactions.sort((a, b) => {
            if (sortByDate === 'asc') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
        });
    }

    // Sort transactions by amount
    if (sortByAmount) {
        filteredTransactions.sort((a, b) => {
            if (sortByAmount === 'asc') {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });
    }

    const toggleSortByDate = () => {
        if (!sortByAmount) {
            setSortByDate(sortByDate === 'asc' ? 'desc' : 'asc');
        } else {
            setSortByDate('asc');
            setSortByAmount(undefined);
        }
    };

    const toggleSortByAmount = () => {
        if (!sortByDate) {
            setSortByAmount(sortByAmount === 'asc' ? 'desc' : 'asc');
        } else {
            setSortByAmount('asc');
            setSortByDate(undefined);
        }
    };

    return (
        //  filtrations
        <div className="md:w-1/2    mx-2">
            <div className="flex justify-between mb-4 space-x-20">
                <div className="flex flex-col">
                    {/* <label htmlFor="search" className="text-start font-semibold ">Name</label> */}
                    <input
                        type="text"
                        id="search"
                        className="rounded-[.40rem] border-b-2 py-2 px-3 outline-none hover:border-blue-500  focus:border-blue-500 border-blue-300"
                        placeholder="Search by customer name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    {/* <div className="text-start font-semibold ">Amount Range</div> */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="w-32 rounded-[.40rem] border-b-2 py-2 px-3 outline-none focus:border-blue-300"
                            placeholder="Min Amount"
                            value={minAmount === undefined ? '' : minAmount}
                            onChange={(e) => setMinAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        />
                        <input
                            type="text"
                            className="w-32 rounded-[.40rem] border-b-2 p-2 outline-none focus:border-blue-300"
                            placeholder="Max Amount"
                            value={maxAmount === undefined ? '' : maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="card   rounded-2xl overflow-x-hidden overflow-y-scroll h-[90%] scrollbar  mt-2">
                <div className="overflow-x-auto bg-white bg-opacity-5 text-white  backdrop-blur-lg ">
                    <table className="min-w-full divide-y  divide-gray-200">
                        <thead className="">
                            <tr >
                                <th className=" ps-4 py-7 text-left text-xs  font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className=" py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer text-nowrap" onClick={toggleSortByDate}>
                                    Transaction Date{' '}
                                    <span>{sortByDate === 'asc' ? '▲' : '▼'}</span>
                                </th>
                                <th className=" py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer text-nowrap" onClick={toggleSortByAmount}>
                                    Transaction Amount{' '}
                                    <span>{sortByAmount === 'asc' ? '▼' : '▲'}</span>
                                </th>
                                <th className=" py-3 text-center text-xs font-base text-gray-500 uppercase tracking-wider ">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="   ">
                            {filteredTransactions.map((transaction) => {
                                const customer = getCustomerById(transaction.customer_id);
                                return (
                                    <tr key={transaction.id} id={`${transaction.customer_id}`} className="cursor-pointer">
                                        <td className="ps-3  py-4 whitespace-nowrap align-top">
                                            {customer && (
                                                <div className="flex items-center ps-2 md:ps-0 box-border">
                                                    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                        <img src={customer.profileImg} className="w-full h-full object-cover" alt={customer.name} />
                                                    </div>
                                                    <span className="ml-2 font-semibold">{customer.name}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className=" py-4 whitespace-nowrap align-middle text-center ">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </td>
                                        <td className=" py-4 whitespace-nowrap align-middle text-center ">
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="text-sm text-nowrap md:pe-3">
                                            <div id={`${transaction.customer_id}`} className="relative after:absolute after:w-0 after:-bottom-1 after:left-0  after:bg-black after:h-[0.1px] hover:after:w-full after:transition-all after:duration-300 w-fit">
                                                Show Customer Data
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TransactionData;
