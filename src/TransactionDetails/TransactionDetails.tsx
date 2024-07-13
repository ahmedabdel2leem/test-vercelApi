type Props = {
    customerId: number
}

function TransactionDetails({ }: Props) {

    return (

        <div className="h-[calc(50%-20px)] w-full space-x-3  mb-2 flex ">
            <div className="All Transactions w-2/3  h-full bg-yellow-100 bg-opacity-15 rounded-xl backdrop-blur-lg">

            </div>
            <div className=" h-full w-2/6 bg-yellow-100 bg-opacity-15 rounded-xl backdrop-blur-lg">

            </div>
        </div>


    )
}

export default TransactionDetails 