import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const employees = [
  { position: "FrontEnd Developer", numberOfPeople: 12 },
  { position: "Backend Developer", numberOfPeople: 9 },
  { position: "QA Engineers", numberOfPeople: 5 },
  { position: "HR", numberOfPeople: 1 },
  { position: "Accountant", numberOfPeople: 4 },
  { position: "Database Engineer", numberOfPeople: 8 },
];

export const data = {
  labels: employees.map((employee) => employee.position),
  datasets: [
    {
      label: "# of Employee",
      data: employees.map((employee) => employee.numberOfPeople),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const Dashboard = () => {
  return (
    <>
      <h1 className="text-xl text-center m-4">
        Welcome To Employee Management System
      </h1>
      <Pie data={data} />;
    </>
  );
};

export default Dashboard;
