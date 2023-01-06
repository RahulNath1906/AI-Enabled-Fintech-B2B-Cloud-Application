import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { RefreshOutlined, Search } from "@material-ui/icons";
import AddForm from "./components/AddForm";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import AnalyticsView from "./components/AnalyticsView";
import "./App.css";

// columns for the Datagrid..

const columns = [
  { field: "sl_no", headerName: "Sl no", width: 120 },
  {
    field: "business_code",
    headerName: "Business Code",
    width: 150,
  },
  { field: "cust_number", headerName: "Customer Number", width: 150 },
  { field: "clear_date", headerName: "Clear Date", width: 150 },
  { field: "buisness_year", headerName: "Business Year", width: 150 },
  { field: "doc_id", headerName: "Document Id", width: 150 },
  { field: "posting_date", headerName: "Posting Date", width: 150 },
  {
    field: "document_create_date",
    headerName: "Document Create Date",
    width: 150,
  },
  { field: "due_in_date", headerName: "Due Date", width: 150 },
  { field: "invoice_currency", headerName: "Invoice Currency", width: 150 },
  { field: "document_type", headerName: "Document Type", width: 150 },
  { field: "posting_id", headerName: "Posting Id", width: 150 },
  { field: "total_open_amount", headerName: "Total Open Amount", width: 150 },
  {
    field: "baseline_create_date",
    headerName: "Baseline Create Date",
    width: 150,
  },
  {
    field: "cust_payment_terms",
    headerName: "Customer Payment Terms",
    width: 150,
  },
  { field: "invoice_id", headerName: "Invoice Id", width: 150 },
];

// 'refresh' button function..

export const refreshPage = () => {
  window.location.reload();
};

function InvoiceApp() {
  // initializing the state 'color' as "primary" for the buttton colors..
  const [color] = useState("primary");

  // initializing the state of every dialog as 'false' for dialog boxes..
  const [editDialog, setEditDialog] = useState(false);
  const [dltDialog, setDltDialog] = useState(false);
  const [advanceSearchDialog, setAdvanceSearchDialog] = useState(false);

  const [gridData, setGridData] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);

  // function to fetch the whole data from the backend..
  const getGridData = () => {
    axios
      .get("/InvoiceWebApp/Fetch")
      .then((res) => {
        console.log(res.data);
        setGridData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => getGridData(), []);

  function PredictBtn() {
    alert("onClick Function Not yet written");
  }

  // function to handle enable/disable property of the Edit Button..
  const enableEditbtn = () => {
    if (checkedRow.length === 0 || checkedRow.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  // function to handle enable/disable property of the Delete Button..
  const enableDltbtn = () => {
    if (checkedRow.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // const [pageSize, setPageSize] = useState(10);

  //initializing the parameters state...
  const [cust_number, setCust_number] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [cust_payment_terms, setCust_payment_terms] = useState("");
  const [sl_no, setSl_no] = useState(null);
  const [doc_id, setDoc_id] = useState("");
  const [invoice_id, setInvoice_id] = useState("");
  const [buisness_year, setBuisness_year] = useState("");

  // function to handle the Edit Button operation..
  const handleEditData = () => {
    axios
      .post(
        "/InvoiceWebApp/Edit?invoice_currency=" +
          invoice_currency +
          "&cust_payment_terms=" +
          cust_payment_terms +
          "&sl_no=" +
          checkedRow.map((e) => e.sl_no),
        {
          params: {
            invoice_currency,
            cust_payment_terms,
            sl_no,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditDialog(false);
    refreshPage();
  };

  // function to handle the Delete Button operation..
  const handleDeleteData = () => {
    axios
      .get("/InvoiceWebApp/Delete?sl_no=" + checkedRow.map((e) => e.sl_no), {
        params: {
          sl_no,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setDltDialog(false);
    refreshPage();
  };

  // function to handle the Search by Customer Number operation..
  const handleSearch = (input) => {
    setCust_number(input);
    axios
      .get("/InvoiceWebApp/SearchCustNum", {
        params: {
          cust_number,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setGridData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => handleSearch(), []);

  // function to handle the Advance Search operation..
  const handleAdvanceSearch = () => {
    axios
      .get("/InvoiceWebApp/AdvanceSearch", {
        params: {
          doc_id,
          invoice_id,
          cust_number,
          buisness_year,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setGridData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setAdvanceSearchDialog(false);
  };
  // useEffect(() => handleAdvanceSearch(), []);

  return (
    <>
      {/* Grid Header Part */}

      <div
        className="gridHeader"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Predict Button */}

        <div className="predict_btn">
          <Button color={color} variant="outlined" onClick={() => PredictBtn()}>
            PREDICT
          </Button>
        </div>

        {/* Analytics View Button */}

        <div className="analytics_btn">
          <AnalyticsView />
        </div>

        {/* Advance Search Button */}

        <div className="advance_search_btn">
          <Button
            color={color}
            variant="outlined"
            onClick={() => setAdvanceSearchDialog(true)}
          >
            ADVANCE SEARCH
          </Button>

          <Dialog
            open={advanceSearchDialog}
            onClose={() => setAdvanceSearchDialog(false)}
            PaperProps={{
              style: {
                backgroundColor: "#2f4655f5",
                color: "white",
              },
            }}
          >
            <DialogTitle>ADVANCE SEARCH</DialogTitle>
            <DialogContent>
              <div className="advanceSearch_1">
                <TextField
                  label="Document Id"
                  variant="outlined"
                  name="doc_id"
                  onChange={(e) => setDoc_id(e.target.value)}
                />
                <TextField
                  label="Invoice Id"
                  variant="outlined"
                  style={{ marginLeft: "1.5rem" }}
                  name="invoice_id"
                  onChange={(e) => setInvoice_id(e.target.value)}
                />
              </div>
              <div className="advanceSearch_2">
                <TextField
                  label="Customer Number"
                  variant="outlined"
                  name="cust_number"
                  onChange={(e) => setCust_number(e.target.value)}
                />
                <TextField
                  label="Business Year"
                  variant="outlined"
                  style={{ marginLeft: "1.5rem" }}
                  name="buisness_year"
                  onChange={(e) => setBuisness_year(e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleAdvanceSearch}
                variant="outlined"
                fullWidth
                style={{ color: "white", border: "1px solid white" }}
              >
                SEARCH
              </Button>
              <Button
                onClick={() => setAdvanceSearchDialog(false)}
                variant="outlined"
                fullWidth
                style={{ color: "white", border: "1px solid white" }}
              >
                CANCEL
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* Refresh Button */}

        <div className="refresh_btn">
          <Button color={color} variant="outlined" onClick={refreshPage}>
            <RefreshOutlined />
          </Button>
        </div>

        {/* Search by Customer Number field */}

        <div className="search_fld">
          <TextField
            type={"search"}
            label="Search Customer Number"
            variant="outlined"
            name="cust_number"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Add Button */}

        <div className="add_btn">
          <AddForm />
        </div>

        {/* Edit Button */}

        <div className="edit_btn">
          <Button
            color={color}
            variant="outlined"
            onClick={() => setEditDialog(true)}
            disabled={enableEditbtn()}
          >
            EDIT
          </Button>
          <Dialog
            open={editDialog}
            onClose={() => setEditDialog(false)}
            PaperProps={{
              style: {
                backgroundColor: "#2f4655f5",
                color: "white",
              },
            }}
          >
            <DialogTitle>EDIT</DialogTitle>
            <DialogContent>
              <TextField
                label="Invoice Currency"
                variant="outlined"
                name="invoice_currency"
                defaultValue={checkedRow.map((e) => e.invoice_currency)}
                onChange={(ev) => setInvoice_currency(ev.target.value)}
              />
              <TextField
                label="Customer Payment Terms"
                variant="outlined"
                style={{ marginLeft: ".5rem" }}
                name="cust_payment_terms"
                defaultValue={checkedRow.map((e) => e.cust_payment_terms)}
                onChange={(ev) => setCust_payment_terms(ev.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleEditData}
                variant="outlined"
                type="submit"
                fullWidth
                style={{ color: "white", border: "1px solid white" }}
              >
                EDIT
              </Button>
              <Button
                onClick={() => setEditDialog(false)}
                variant="outlined"
                fullWidth
                style={{ color: "white", border: "1px solid white" }}
              >
                CANCEL
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* Delete Button */}

        <div className="delete_btn">
          <Button
            color={color}
            variant="outlined"
            onClick={() => setDltDialog(true)}
            disabled={enableDltbtn()}
          >
            DELETE
          </Button>
          <Dialog
            open={dltDialog}
            onClose={() => setDltDialog(false)}
            PaperProps={{
              style: {
                backgroundColor: "#2f4655f5",
                color: "white",
              },
            }}
          >
            <DialogTitle>Delete Records ?</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "white" }}>
                Are you sure you want to delete these record ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setDltDialog(false)}
                fullWidth
                style={{ color: "white", border: "1px solid white" }}
              >
                CANCEL
              </Button>
              <Button
                variant="outlined"
                onClick={handleDeleteData}
                fullWidth
                style={{ color: "white", border: "1px solid white" }}
              >
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <br />

      {/* Grid Table */}

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(rows) => rows.sl_no}
          rows={gridData}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const checkedRow = gridData.filter((row) =>
              selectedIDs.has(row.sl_no)
            );

            setCheckedRow(checkedRow);
          }}
          // pageSize={pageSize}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // rowsPerPageOptions={[10, 20, 40]}
        />
      </div>
    </>
  );
}

export default InvoiceApp;
