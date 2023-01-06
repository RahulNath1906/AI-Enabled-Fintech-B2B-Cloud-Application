import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

function AnalyticsView() {
  // initializing the state 'color' as "primary" for the buttton colors..
  const [color] = useState("primary");

  // initializing the state 'open' as "false" for the dialog box..
  const [open, setOpen] = useState(false);

  // initializing the tstate 'openBar' as "false" for the bar chart dialog box..
  const [openBar, setOpenBar] = useState(false);

  const [custData, setCustData] = useState([]);
  const [amountData, setAmountData] = useState([]);

  //initializing the parameters state...
  const [from_clear_date, setFrom_clear_date] = useState("");
  const [to_clear_date, setTo_clear_date] = useState("");
  const [from_due_in_date, setFrom_due_in_date] = useState("");
  const [to_due_in_date, setTo_due_in_date] = useState("");
  const [from_baseline_create_date, setFrom_baseline_create_date] =
    useState("");
  const [to_baseline_create_date, setTo_baseline_create_date] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");

  // function to fetch the no. of customers depending on parameters..
  const getCustData = () => {
    axios
      .get("/InvoiceWebApp/FetchNoOfCust", {
        params: {
          from_clear_date,
          to_clear_date,
          from_due_in_date,
          to_due_in_date,
          from_baseline_create_date,
          to_baseline_create_date,
          invoice_currency,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCustData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function to fetch the total open amount depending on parameters..
  const getAmountData = () => {
    axios
      .get("/InvoiceWebApp/FetchAmount", {
        params: {
          from_clear_date,
          to_clear_date,
          from_due_in_date,
          to_due_in_date,
          from_baseline_create_date,
          to_baseline_create_date,
          invoice_currency,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAmountData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // labels for the Bar chart..
  const labels = [
    "Unilever",
    "Johnson and Johnson",
    "Bose",
    "Kellog's",
    "Sony",
    "Puma",
  ];

  // options for the Bar chart..
  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            // The y-axis value will start from zero
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      labels: {
        fontSize: 15,
      },
    },
  };

  // data for the Bar chart..
  const data = {
    labels: labels,
    datasets: [
      {
        label: "No. of Customers",
        data: custData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total Open Amount",
        data: amountData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  // function to handle Analytics View operation..
  const handleAnalytics = () => {
    getCustData();
    getAmountData();

    setOpenBar(true);
    setOpen(false);
  };

  return (
    <>
      <div>
        {/* Analytics View Button */}

        <Button color={color} variant="outlined" onClick={() => setOpen(true)}>
          ANALYTICS VIEW
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            style: {
              backgroundColor: "#2f4655f5",
              color: "white",
            },
          }}
        >
          <DialogTitle>ANALYTICS VIEW</DialogTitle>
          <DialogContent>
            <div className="advanceSearch_1">
              <div className="advanceSearch_clearDate">
                <p>Clear Date</p>
                <div className="from_clear_date">
                  <TextField
                    label="From"
                    type={"date"}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    name="from_clear_date"
                    onChange={(e) => setFrom_clear_date(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="to_clear_date">
                  <TextField
                    label="To"
                    type={"date"}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    name="to_clear_date"
                    onChange={(e) => setTo_clear_date(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>

              <div className="advanceSearch_dueDate">
                <p>Due Date</p>
                <div className="from_due_in_date">
                  <TextField
                    label="From"
                    type={"date"}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    name="from_due_in_date"
                    onChange={(e) => setFrom_due_in_date(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="to_due_in_date">
                  <TextField
                    label="To"
                    type={"date"}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    name="to_due_in_date"
                    onChange={(e) => setTo_due_in_date(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className="advanceSearch_2">
              <div className="advanceSearch_baselinecreateDate">
                <p>Baseline Create Date</p>
                <div className="from_baseline_create_date">
                  <TextField
                    label="From"
                    type={"date"}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    name="from_baseline_create_date"
                    onChange={(e) =>
                      setFrom_baseline_create_date(e.target.value)
                    }
                    fullWidth
                  />
                </div>
                <div className="to_baseline_create_date">
                  <TextField
                    label="To"
                    type={"date"}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    name="to_baseline_create_date"
                    onChange={(e) => setTo_baseline_create_date(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="advanceSearch_currency">
                <p>Invoice Currency</p>
                <div className="invoice_currency">
                  <TextField
                    label="Invoice Currency"
                    variant="outlined"
                    name="invoice_currency"
                    onChange={(e) => setInvoice_currency(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleAnalytics}
              type="submit"
              fullWidth
              style={{ color: "white", border: "1px solid white" }}
            >
              SUBMIT
            </Button>

            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              fullWidth
              style={{ color: "white", border: "1px solid white" }}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bar Chart Dialog Box */}

        <Dialog open={openBar} onClose={() => setOpenBar(false)}>
          <DialogContent>
            <Bar data={data} options={options} height={400} width={5000} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default AnalyticsView;
