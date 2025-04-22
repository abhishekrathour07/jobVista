"use client"

import AllJobsTable from "./components/AllJobsTable";

const AdminAllJobsList = () => {

    return (
        <div className=" p-6 flex flex-col justify-center">
            <div className="bg-white p-6 items-center space-y-4 border rounded-lg">
                <div className="flex justify-between items-center ">
                    <h2 className="text-2xl font-bold text-purple-800 ">All Jobs</h2>
                </div>
                <AllJobsTable />

            </div>
        </div>
    );
};

export default AdminAllJobsList;