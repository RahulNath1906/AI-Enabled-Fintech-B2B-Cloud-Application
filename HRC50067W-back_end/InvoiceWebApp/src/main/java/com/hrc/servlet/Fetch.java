package com.hrc.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hrc.pojo.*;
import com.google.gson.Gson;

/**
 * Servlet implementation class Fetch
 */
@WebServlet(urlPatterns={"/Fetch"},name = "Fetch")
public class Fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Fetch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		//response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		

		
		ArrayList<POJO> InvoiceArrLst = new ArrayList<POJO>();
		
		String business_code,clear_date,posting_date,document_create_date,due_in_date;
		String invoice_currency,document_type,baseline_create_date,cust_payment_terms;
		String buisness_year,doc_id;
		int sl_no,cust_number,posting_id,invoice_id;
		double total_open_amount;
		
		
		try 
		{

			Class.forName("com.mysql.cj.jdbc.Driver");

            Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");               

            PreparedStatement pst = conn.prepareStatement("SELECT * from winter_internship where is_deleted = 0");

            
           
            response.setHeader("Access-Control-Allow-Origin", "*");
			ResultSet rs = pst.executeQuery();
			
			while(rs.next())
			{
				POJO Invoiceobj = new POJO();
				
				sl_no = rs.getInt("sl_no");
				cust_number = rs.getInt("cust_number");
				buisness_year = rs.getString("buisness_year");
				doc_id = rs.getString("doc_id");
				posting_id = rs.getInt("posting_id");
				invoice_id = rs.getInt("invoice_id");
				
				business_code = rs.getString("business_code");
				clear_date = rs.getString("clear_date");
				posting_date = rs.getString("posting_date");
				document_create_date = rs.getString("document_create_date");
				due_in_date = rs.getString("due_in_date");
				invoice_currency = rs.getString("invoice_currency");
				document_type = rs.getString("document_type");
				total_open_amount = rs.getDouble("total_open_amount");
				baseline_create_date = rs.getString("baseline_create_date");
				cust_payment_terms = rs.getString("cust_payment_terms");
				
				
				Invoiceobj.setSl_no(sl_no);
				Invoiceobj.setCust_number(cust_number);
				Invoiceobj.setBuisness_year(buisness_year);
				Invoiceobj.setDoc_id(doc_id);
				Invoiceobj.setPosting_id(posting_id);
				Invoiceobj.setInvoice_id(invoice_id);
				Invoiceobj.setBusiness_code(business_code);
				Invoiceobj.setClear_date(clear_date);
				Invoiceobj.setPosting_date(posting_date);
				Invoiceobj.setDocument_create_date(document_create_date);
				Invoiceobj.setDue_in_date(due_in_date);
				Invoiceobj.setInvoice_currency(invoice_currency);
				Invoiceobj.setDocument_type(document_type);
				Invoiceobj.setTotal_open_amount(total_open_amount);
				Invoiceobj.setBaseline_create_date(baseline_create_date);
				Invoiceobj.setCust_payment_terms(cust_payment_terms);

				
				InvoiceArrLst.add(Invoiceobj);
			}
			
			for(POJO obj :InvoiceArrLst)
			{
				System.out.println(obj.toString());
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.out.println("exception occur");
		}
		
		Gson gson = new Gson();
		String respData = gson.toJson(InvoiceArrLst);
		response.setHeader("Access-Control-Allow-Origin", "*");
		out.println(respData);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
