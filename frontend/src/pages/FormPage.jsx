import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, BarChart, Bar, Tooltip as BarTooltip, Legend as BarLegend } from "recharts";
import { useLocation } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6F91"];

const FormPage = () => {
  const location = useLocation();
  const patients = useMemo(() => {
    return location.state?.project?.allResponses || [];
  }, [location.state?.project?.allResponses]);

  const [questionOptions, setQuestionOptions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const [ageSpecificData, setAgeSpecificData] = useState([]);

  useEffect(() => {
    const allQuestions = new Set();

    patients.forEach((patient) => {
      patient.responses.forEach((resp) => {
        const trimmed = resp?.questionText?.trim();
        // Exclude 'Visit Number', age fields, and icon fields from analytics
        const excludedQuestions = [
          "age", "Age", "AGE", 
          "Visit Number", "visit number", "VISIT NUMBER"
        ];
        const isIconQuestion = trimmed && (
          trimmed.toLowerCase().includes("icon") ||
          trimmed.toLowerCase().includes("set your icon") ||
          trimmed.toLowerCase().includes("your icon")
        );
        
        if (!excludedQuestions.includes(trimmed) && !isIconQuestion && trimmed) {
          allQuestions.add(resp.questionText.trim());
        }
      });
    });
    setQuestionOptions([...allQuestions]);
  }, [patients]);

  useEffect(() => {
    const newChartsData = {};

    selectedQuestions.forEach((questionText) => {
      const grouped = {};

      patients.forEach((patient) => {
        const ageAnswer = patient.responses.find((r) =>
          ["age", "Age", "AGE"].includes(r.questionText.trim())
        );
        const selectedAnswer = patient.responses.find(
          (r) => r.questionText.trim() === questionText
        );

        // Exclude 'Visit Number' and icon questions from analytics data
        const isIconQuestion = selectedAnswer && (
          selectedAnswer.questionText.toLowerCase().includes("icon") ||
          selectedAnswer.questionText.toLowerCase().includes("set your icon") ||
          selectedAnswer.questionText.toLowerCase().includes("your icon")
        );
        
        if (
          ageAnswer &&
          selectedAnswer &&
          !["Visit Number", "visit number", "VISIT NUMBER"].includes(selectedAnswer.questionText.trim()) &&
          !isIconQuestion
        ) {
          const key = `${selectedAnswer.answer.trim()} (Age ${ageAnswer.answer.trim()})`;
          if (!grouped[key]) grouped[key] = 0;
          grouped[key]++;
        }
      });

      newChartsData[questionText] = Object.entries(grouped).map(
        ([name, value]) => ({ name, value })
      );
    });

    setChartsData(newChartsData);
  }, [selectedQuestions, patients]);

  useEffect(() => {
    const ageRangeData = [];

    patients.forEach((patient) => {
      const ageAnswer = patient.responses.find((r) =>
        ["age", "Age", "AGE"].includes(r.questionText.trim())
      );

      if (ageAnswer && parseInt(ageAnswer.answer) >= 18 && parseInt(ageAnswer.answer) <= 90) {
        // Add logic to extract specific responses for this age range
        patient.responses.forEach((resp) => {
          const answerValue = resp.answerText?.trim() || resp.answer?.trim() || "";

          // Exclude 'Visit Number' and icon questions from age-specific data
          const isIconQuestion = resp.questionText && (
            resp.questionText.toLowerCase().includes("icon") ||
            resp.questionText.toLowerCase().includes("set your icon") ||
            resp.questionText.toLowerCase().includes("your icon")
          );
          
          if (
            resp.questionText?.trim() !== "age" &&
            !["Visit Number", "visit number", "VISIT NUMBER"].includes(resp.questionText?.trim()) &&
            !isIconQuestion
          ) {
            ageRangeData.push({
              question: resp.questionText.trim(),
              answer: answerValue,
              age: ageAnswer?.answerText?.trim() || ageAnswer?.answer?.toString().trim() || "",
            });
          }
        });
      }
    });

    setAgeSpecificData(ageRangeData);
  }, [patients]);
  console.log(ageSpecificData)

  const handleCheckboxChange = (questionText) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionText)
        ? prev.filter((q) => q !== questionText)
        : [...prev, questionText]
    );
  };

  // Process age range data for charting
  const processAgeRangeData = () => {
    const chartData = {};
    ageSpecificData.forEach((data) => {
      const key = `${data.question} - Age ${data.age}`;
      if (!chartData[key]) {
        chartData[key] = 0;
      }
      chartData[key]++;
    });

    return Object.entries(chartData).map(([key, value]) => ({
      name: key,
      value,
    }));
  };

  // Helper to prepare bar chart data for a question
  const getBarChartData = (questionText) => {
    const counts = {};
    patients.forEach((patient) => {
      const answerObj = patient.responses.find(
        (r) => r.questionText.trim() === questionText
      );
      // Exclude 'Visit Number' and icon questions from bar chart data
      const isIconQuestion = answerObj && (
        answerObj.questionText.toLowerCase().includes("icon") ||
        answerObj.questionText.toLowerCase().includes("set your icon") ||
        answerObj.questionText.toLowerCase().includes("your icon")
      );
      
      if (
        answerObj &&
        answerObj.answer &&
        !["Visit Number", "visit number", "VISIT NUMBER"].includes(answerObj.questionText.trim()) &&
        !isIconQuestion
      ) {
        // If answer is array (checkbox), count each
        if (Array.isArray(answerObj.answer)) {
          answerObj.answer.forEach((ans) => {
            counts[ans] = (counts[ans] || 0) + 1;
          });
        } else {
          counts[answerObj.answer] = (counts[answerObj.answer] || 0) + 1;
        }
      }
    });
    // Convert to array for recharts
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Form Analytics</h1>

      {/* Question Checkboxes */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Select one or more questions:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {questionOptions.map((q, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(q)}
                onChange={() => handleCheckboxChange(q)}
              />
              {q}
            </label>
          ))}
        </div>
      </div>
        {console.log(chartsData)}
      {/* Render Pie Charts and Bar Charts */}
      {selectedQuestions.length > 0 &&
        selectedQuestions.map((q, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-xl font-semibold mb-2">{q}</h2>
            {/* Pie Chart */}
            {chartsData[q] && chartsData[q].length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartsData[q]}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      label
                    >
                      {chartsData[q].map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-red-500">No data for this question.</p>
            )}
            {/* Bar Chart */}
            <div className="h-80 mt-8">
              <ResponsiveContainer>
                <BarChart data={getBarChartData(q)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <BarTooltip />
                  <BarLegend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}

      {/* Age Specific Line Chart */}
      {ageSpecificData.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-2">Age 18-30 Responses</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <LineChart data={processAgeRangeData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <RechartsLegend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedQuestions.length === 0 && (
        <p className="text-gray-500 mt-4">Please select a question to view chart.</p>
      )}
    </div>
  );
};

export default FormPage;
