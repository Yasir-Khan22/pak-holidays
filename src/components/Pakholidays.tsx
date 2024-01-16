import { useState, useEffect } from "react";
import { API_URL } from "../api_url";


interface apiProps {
    name: string,
    date: string,
    countryCode: string,

}

const Pakholidays = () => {
    const [apiData, setApiData] = useState<apiProps[]>();

    // useEffect.
    useEffect(() => {
        fetchApiData()
    }, [])

    const fetchApiData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setApiData(data)
            console.table(data)
        }
        catch (error) {
            console.error("Something went wrong please try again later.", error)
        }
    }
    return (
        <div>
            {apiData && apiData.length > 0 && (
                <h2 className="bg-amber-300 text-xl mt-8">Public Holidays of {apiData[0].countryCode}</h2>
            )}

            <table className="border-[2px] border-collapse m-auto mt-4 text-center">
                <thead className="text-xl">
                    <tr>
                        <th className="w-3/4">Date</th>
                        <th>Holiday Type</th>
                    </tr>
                </thead>

                <tbody>
                    {apiData && apiData?.map((items, index) => (
                        <tr className="" key={index}>
                              <td>{items.date}</td>
                              <td>{items.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Pakholidays;