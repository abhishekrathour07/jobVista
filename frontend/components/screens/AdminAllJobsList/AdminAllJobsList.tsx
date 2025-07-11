"use client"

import AllJobsTable from "./components/AllJobsTable";

const AdminAllJobsList = () => {

    return (
        <div className=" p-6 flex flex-col justify-center">
            <div className="bg-white p-6 items-center space-y-4 border rounded-lg">
                <div className="flex flex-col gap-2 ">
                    <h2 className="text-2xl font-bold text-purple-800 ">All Jobs</h2>
                    <p className="text-red-600">Double click on any row to see the applicants</p>
                </div>
                <AllJobsTable />

            </div>
        </div>
    );
};

export default AdminAllJobsList;