import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import axios from "axios";
import { refreshPage } from "../InvoiceApp";

function AddForm() {
  // initializing the state 'open' as "false" for the dialog box..
  const [open, setOpen] = useState(false);

  // initializing the state 'color' as "primary" for the buttton colors..
  const [color] = useState("primary");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //initializing the parameters state...
  const [business_code, setBusiness_code] = useState("");
  const [cust_number, setCust_number] = useState("");
  const [clear_date, setClear_date] = useState("");
  const [buisness_year, setBuisness_year] = useState("");
  const [doc_id, setDoc_id] = useState("");
  const [posting_date, setPosting_date] = useState("");
  const [document_create_date, setDocument_create_date] = useState("");
  const [due_in_date, setDue_in_date] = useState("");
  const [invoice_currency, setInvoice_currency] = useState("");
  const [document_type, setDocument_type] = useState("");
  const [posting_id, setPosting_id] = useState("");
  const [total_open_amount, setTotal_open_amount] = useState("");
  const [baseline_create_date, setBaseline_create_date] = useState("");
  const [cust_payment_terms, setCust_payment_terms] = useState("");
  const [invoice_id, setInvoice_id] = useState("");

  // function to handle the Add Button operation..
  const handleAddData = () => {
    axios
      .get("/InvoiceWebApp/Add", {
        params: {
          business_code,
          cust_number,
          clear_date,
          buisness_year,
          doc_id,
          posting_date,
          document_create_date,
          due_in_date,
          invoice_currency,
          document_type,
          posting_id,
          total_open_amount,
          baseline_create_date,
          cust_payment_terms,
          invoice_id,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
    refreshPage();
  };

  return (
    <>
      {/* Add Button */}

      <Button color={color} variant="outlined" onClick={handleClickOpen}>
        ADD
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: "#2f4655f5",
            color: "white",
          },
        }}
      >
        <DialogTitle>ADD</DialogTitle>
        <DialogContent>
          <div className="addForm_1">
            <TextField
              required={true}
              label="Business Code"
              variant="outlined"
              onChange={(e) => setBusiness_code(e.target.value)}
              name="business_code"
              fullWidth
            />

            <TextField
              label="Customer Number"
              variant="outlined"
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setCust_number(e.target.value)}
              name="cust_number"
              fullWidth
            />
            <TextField
              label="Clear Date"
              type={"date"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setClear_date(e.target.value)}
              name="clear_date"
              required
              fullWidth
            />
            <TextField
              label="Business Year"
              variant="outlined"
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setBuisness_year(e.target.value)}
              name="buisness_year"
              required
              fullWidth
            />
          </div>
          <div className="addForm_2">
            <TextField
              label="Document Id"
              variant="outlined"
              onChange={(e) => setDoc_id(e.target.value)}
              name="doc_id"
              required
              fullWidth
            />
            <TextField
              label="Posting Date"
              type={"date"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setPosting_date(e.target.value)}
              name="posting_date"
              required
              fullWidth
            />
            <TextField
              label="Document Create Date"
              type={"date"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setDocument_create_date(e.target.value)}
              name="document_create_date"
              required
              fullWidth
            />
            <TextField
              label="Due Date"
              type={"date"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setDue_in_date(e.target.value)}
              name="due_in_date"
              required
              fullWidth
            />
          </div>
          <div className="addForm_3">
            <TextField
              label="Invoice Currency"
              variant="outlined"
              onChange={(e) => setInvoice_currency(e.target.value)}
              name="invoice_currency"
              required
              fullWidth
            />
            <TextField
              label="Document Type"
              variant="outlined"
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setDocument_type(e.target.value)}
              name="document_type"
              required
              fullWidth
            />
            <TextField
              label="Posting Id"
              variant="outlined"
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setPosting_id(e.target.value)}
              name="posting_id"
              required
              fullWidth
              className="postingid_text"
            />
            <TextField
              label="Total Open Amount"
              variant="outlined"
              onChange={(e) => setTotal_open_amount(e.target.value)}
              name="total_open_amount"
              required
              fullWidth
            />
          </div>
          <div className="addForm_4">
            <TextField
              label="Baseline Create Date"
              type={"date"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setBaseline_create_date(e.target.value)}
              name="baseline_create_date"
              required
              className="base_create_date_text"
            />
            <TextField
              label="Customer Payment Terms"
              variant="outlined"
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setCust_payment_terms(e.target.value)}
              name="cust_payment_terms"
              required
              className="cust_terms_text"
            />
            <TextField
              label="Invoice Id"
              variant="outlined"
              style={{ marginLeft: ".5rem" }}
              onChange={(e) => setInvoice_id(e.target.value)}
              name="invoice_id"
              required
              className="invoiceid_text"
            />
          </div>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleAddData}
              type="submit"
              fullWidth
              style={{ color: "white", border: "1px solid white" }}
            >
              ADD
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              fullWidth
              style={{ color: "white", border: "1px solid white" }}
            >
              CANCEL
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddForm;
