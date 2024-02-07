import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const AdminTickets = () => {
    const [ticketData, setTicketData] = useState([]);

    useEffect(() => {
        axios
            .get("/api/tickets")
            .then((response) => {
                setTicketData(response.data.tickets);
            })
            .catch((error) => {
                console.error("Error fetching ticket data:", error);
            });
    }, []);

    const prepareChartData = () => {
        const data = [["Month", "Tickets"]];

        const ticketCounts = {};

        ticketData.forEach((ticket) => {
            const ticketDate = new Date(ticket.date);
            const monthYear = ticketDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
            });

            ticketCounts[monthYear] = (ticketCounts[monthYear] || 0) + 1;
        });

        Object.entries(ticketCounts).forEach(([month, count]) => {
            data.push([month, count]);
        });

        return data;
    };

    return (
        <div className="tickets-page">
            <div className="visit-title-container">
                <h2 className="visit-title">Tickets per Month</h2>
                <p>
                    This chart shows the number of tickets sold for each month.
                </p>
            </div>
            <div className="chart-container">
                {ticketData.length === 0 ? (
                    <p>No tickets available.</p>
                ) : (
                    <div className="chart-wrapper">
                        <Chart
                            chartType="ColumnChart"
                            data={prepareChartData()}
                            options={{
                                hAxis: { title: "Month" },
                                vAxis: {
                                    title: "Number of Tickets",
                                    format: "0",
                                },
                            }}
                            width="600px"
                            height="400px"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTickets;
