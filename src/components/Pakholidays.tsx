import { useState, useEffect } from "react";

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
        // fetchApiData()
        showPost();
    }, [])


    const fetchURL = 'https://holidayapi.com/v1/holidays?pretty&country=PK&year=2023&key=75fc3910-569f-4b1c-ad3e-81120cac7169';
    

    async function fetchPosts(url: string) {
        let response = await fetch(url);
        let body = await response.json();
        // setApiData(body)
        return body.holidays as Holiday[];
    }

    async function showPost() {
        let posts = await fetchPosts(fetchURL);
        console.log(posts, "These are posts.")

         // Filter holidays based on ID, assuming you want holidays with ID 2
         const filteredHolidays = posts.filter((holiday) => holiday.country === "PK");
         // Set the filtered data in state
         setApiData(filteredHolidays);
 
         console.table(filteredHolidays);

    }

    return (
        <div>
            <h1>Public Holidays of Pakistan.</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Observed Date</th>
                        <th>Public</th>
                        <th>Country</th>
                        {/* <th>UUID</th> */}
                        <th>Weekday</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData?.map((holiday) => (
                        <tr key={holiday.uuid}>
                            <td>{holiday.name}</td>
                            <td>{holiday.date}</td>
                            <td>{holiday.observed}</td>
                            <td>{holiday.public ? "Yes" : "No"}</td>
                            <td>{holiday.country}</td>
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