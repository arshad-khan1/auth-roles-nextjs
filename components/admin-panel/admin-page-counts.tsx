"use client";

import { useEffect, useState } from "react";
import InfoCard from "../dashboard/info-card";

export async function AdminPageCount() {
    const [userCount, setUserCount] = useState(0);
    const [managerCount, setManagerCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch users and companies data here if needed
                const userResponse = await fetch("/api/user");
                const companyResponse = await fetch("/api/companies");

                if (!userResponse.ok || !companyResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const usersData = await userResponse.json();
                const companiesData = await companyResponse.json();

                const users = usersData.data || [];
                const companies = companiesData.companies || [];
                console.log(companies)

                const userCount = users.length;
                const managerCount = users.filter((user: { role: string; }) => user.role === "MANAGER").length;
                const companyCount = companies.length;

                setUserCount(userCount);
                setManagerCount(managerCount);
                setCompanyCount(companyCount);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Users" count={userCount} />
                <InfoCard title="Managers" count={managerCount} />
                <InfoCard title="Companies" count={companyCount} />
            </div>
        </>
    );
}