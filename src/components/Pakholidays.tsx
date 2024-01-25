import axios from "axios";
import { API_URL } from "../config"
import { useState, useEffect } from "react";
import { HolidayAPI } from "holiday_api";

interface Holiday {
    name: string;
    date: string;
    observed: string;
    public: boolean;
    country: string;
    uuid: string;
    weekday: {
        date: {
            name: string;
            numeric: string;
        };
        observed: {
            name: string;
            numeric: string;
        };
    };
}

const Pakholidays = () => {
    const [apiData, setApiData] = useState<Holiday[]>();

    // useEffect.
    useEffect(() => {
        showPost();
    }, [])

    async function fetchPosts(url: string) {
        let response = await axios.get(url);
        return response.data.holidays as Holiday[];
    }

    async function showPost() {
        let posts = await fetchPosts(API_URL);
         const filteredHolidays = posts.filter((holiday) => holiday.country === "PK");
         setApiData(filteredHolidays);

    }

    return (
        <div> 
            <h1 className="font-medium text-2xl text-center my-[2rem] mx-1">Public Holidays of Pakistan.</h1>
            <table className="border-[1px] border-[gray] m-auto w-[65%] mb-10 ">
                <thead className="bg-gray-300">
                    <tr className=" even:bg-gray-300">
                        <th>Name</th>
                        {/* <th>Date</th> */}
                        <th className="px-2">Observed Date</th>
                        <th className="px-1">Public</th>
                        {/* <th>Country</th> */}
                        {/* <th>UUID</th> */}
                        <th>Weekday</th>
                    </tr>
                </thead>
                <tbody className="text-center " >
                    {apiData?.map((holiday) => (
                        <tr key={holiday.uuid} className="even:bg-gray-300">
                            <td className="text-center text-lg text-wrap w-1/3">{holiday.name}</td>
                            {/* <td>{holiday.date}</td> */}
                            <td className="text-[15px] my-3">{holiday.observed}</td>
                            <td>{holiday.public ? "Yes" : "No"}</td>
                            {/* <td>{holiday.country}</td> */}
                            {/* <td>{holiday.uuid}</td> */}
                            <td>{holiday.weekday.date.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}
export default Pakholidays;