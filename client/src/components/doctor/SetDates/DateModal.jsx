import React, { useState } from 'react'
import { deleteTime, getAllDates, setTime } from '../../../services/api/doctorRoute';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CancelIcon from '@mui/icons-material/Cancel';


const DateModal = ({ setIsOpen, isOpen, itemId, iduser }) => {
    const [to, setTo] = useState("")
    const [from, setFrom] = useState("")
    const queryClient = useQueryClient()
    const { data: allDates } = useQuery({
        queryKey: ["allDates", iduser],
        queryFn: getAllDates
    })

    const currentDateObj = allDates?.filter((x) => x._id === itemId)
    // console.log(currentDateObj);
    const { mutate: addTimeMutate } = useMutation({
        mutationFn: setTime,
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries(["allDates"])
                console.log("sucessfully added");
            }
        }
    })


    const { mutate: deleteTimeMutate } = useMutation({
        mutationFn: deleteTime,
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries(["allDates"])
            }
        }
    })

    const handleDeletTime = (id) => {
        deleteTimeMutate({
            bookedDateId: itemId,
            userId: iduser,
            timeId: id
        })
    }

    const handleAddingTime = (e) => {
        console.log({
            bookedDateId: itemId,
            userId: iduser,
            timeObj: {
                to,
                from
            }
        });
        e.preventDefault();

        addTimeMutate({
            bookedDateId: itemId,
            userId: iduser,
            timeObj: {
                to,
                from
            }
        })
    }
    return (
        <div>
            <>
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
                {/* Modal container */}
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg z-50 shadow-md">
                    {/* Modal content */}
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">Add Time Period</h2>
                        {/* Available dates */}
                        <div className="mb-4">
                            <p className="text-gray-700 mb-2">Available Time:</p>
                            <ul>
                                {currentDateObj &&
                                    currentDateObj[0]?.time?.map((item) => (

                                        <div className='relative'>
                                            <CancelIcon onClick={() => handleDeletTime(item?._id)} className='text-black absolute top-[-7px] right-[-5px]' />

                                            <li className="text-black px-5 mt-1 text-center py1 rounded-md bg-[#8FE82B]">{item?.from} to {item?.to} </li>
                                        </div>

                                    ))
                                }
                                {/* {
                                        console.log(currentDateObj)
                                    } */}
                                {/* <li className="text-gray-600">to </li> */}

                                {/* Add more available dates as needed */}
                            </ul>
                        </div>
                        <form>
                            {/* Time period inputs */}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="fromTime"
                                >
                                    From:
                                </label>
                                <input
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-48"
                                    id="fromTime"
                                    type="text"
                                    placeholder="HH:MM AM/PM"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="toTime"
                                >
                                    To:
                                </label>
                                <input
                                    onChange={(e) => setTo(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-48"
                                    id="toTime"
                                    type="text"
                                    placeholder="HH:MM AM/PM"
                                />
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleAddingTime}
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>

        </div>
    )
}

export default DateModal
