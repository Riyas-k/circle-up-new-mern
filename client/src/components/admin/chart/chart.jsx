/* eslint-disable react/prop-types */
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const Chart = ({ users }) => {
  const locationData = [];
  users.forEach((user) => {
    const locationIndex = locationData?.findIndex(
      (item) => item?.name === user.location
    );
    if (locationIndex !== -1) {
      locationData[locationIndex].value += 1;
    } else {
      locationData.push({ name: user.location, value: 1 });
    }
  });
  const undefinedIndex = locationData?.findIndex(
    (item) => item?.name == undefined
  );
  if (undefinedIndex) {
    locationData[undefinedIndex].name = "Others";
  }
  const ageData = [
    { name: "18-24", value: 30 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 20 },
    { name: "45+", value: 5 },
  ];

  const genderData = [
    { name: "Male", value: 4 },
    { name: "Female", value: 3 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3
        style={{
          variant: "body2",
          textAlign: "center", 
          marginTop: "20px",
        }}
      >
        User Demographics
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", marginRight: "30px" }}>
          <h4>Age</h4>
          <div style={{ display: "inline-block" }}>
            <PieChart width={250} height={270}>
              <Pie
                data={ageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50} // Set the inner radius for the donut effect
                fill="#8884d8"
                label
                stroke="#FFFFFF" // Add a stroke color for the donut border
                strokeWidth={2} // Set the stroke width for the donut border
              >
                {ageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend align="center" verticalAlign="bottom" />
            </PieChart>
          </div>
        </div>
        <div style={{ textAlign: "center", marginRight: "30px" }}>
          <h4>Gender</h4>
          <div style={{ display: "inline-block" }}>
            <PieChart width={250} height={250}>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50} // Set the inner radius for the donut effect
                fill="#8884d8"
                label
                stroke="#FFFFFF" // Add a stroke color for the donut border
                strokeWidth={2} // Set the stroke width for the donut border
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend align="center" verticalAlign="bottom" />
            </PieChart>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h4>Location</h4>
          <div style={{ display: "inline-block" }}>
            <PieChart width={250} height={250}>
              <Pie
                data={locationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50} // Set the inner radius for the donut effect
                fill="#8884d8"
                label
                stroke="#FFFFFF" // Add a stroke color for the donut border
                strokeWidth={2} // Set the stroke width for the donut border
              >
                {locationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend align="center" verticalAlign="bottom" />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
