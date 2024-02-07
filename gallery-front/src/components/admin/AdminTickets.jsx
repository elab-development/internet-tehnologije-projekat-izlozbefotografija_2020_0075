import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import Footer from "../footer/Footer";

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

        const sortedTickets = ticketData.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        sortedTickets.forEach((ticket) => {
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
                    <p style={{ textAlign: "center" }}>Loading chart...</p>
                ) : (
                    <div className="chart-wrapper">
                        <Chart
                            chartType="ColumnChart"
                            data={prepareChartData()}
                            options={{
                                hAxis: {
                                    title: "Month",
                                    titleTextStyle: {
                                        color: "#d9d9d9",
                                        fontName: "Josefin Sans",
                                        fontSize: 20,
                                    },
                                    textStyle: {
                                        color: "#d9d9d9",
                                        fontName: "Josefin Sans",
                                        fontSize: 15,
                                    },
                                },
                                vAxis: {
                                    title: "Number of Tickets",
                                    titleTextStyle: {
                                        color: "#d9d9d9",
                                        fontName: "Josefin Sans",
                                        fontSize: 20,
                                    },
                                    textStyle: {
                                        color: "#d9d9d9",
                                        fontName: "Josefin Sans",
                                        fontSize: 15,
                                    },
                                    format: "0",
                                },
                                legend: {
                                    textStyle: {
                                        color: "#d9d9d9",
                                        fontName: "Josefin Sans",
                                        fontSize: 15,
                                    },
                                },
                                colors: ["#bfa48d"],
                                backgroundColor: "#171717",
                            }}
                            width="750px"
                            height="400px"
                        />
                    </div>
                )}
                <Footer />
            </div>
        </div>
    );
};

export default AdminTickets;
