package com.hrc.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Add
 */
@WebServlet(urlPatterns={"/Add"},name = "Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

            Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");               

            PreparedStatement ps = conn.prepareStatement("insert into winter_internship "
            		+ "(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,"
            		+ "document_create_date,due_in_date,invoice_currency,document_type,posting_id,"
            		+ "total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) "
            		+ "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            
            ps.setString(1, request.getParameter("business_code"));
            ps.setInt(2, Integer.valueOf(request.getParameter("cust_number")));
            ps.setString(3, request.getParameter("clear_date"));
            ps.setString(4, request.getParameter("buisness_year"));
            ps.setString(5, request.getParameter("doc_id"));
            ps.setString(6, request.getParameter("posting_date"));
            ps.setString(7, request.getParameter("document_create_date"));
            ps.setString(8, request.getParameter("due_in_date"));
            ps.setString(9, request.getParameter("invoice_currency"));
            ps.setString(10, request.getParameter("document_type"));
            ps.setInt(11, Integer.valueOf(request.getParameter("posting_id")));
            ps.setDouble(12, Double.valueOf(request.getParameter("total_open_amount")));
            ps.setString(13, request.getParameter("baseline_create_date"));
            ps.setString(14, request.getParameter("cust_payment_terms"));
            ps.setInt(15, Integer.valueOf(request.getParameter("invoice_id")));
            
            response.setHeader("Access-Control-Allow-Origin", "*");
            ps.executeUpdate();
            
        
            ps.close();
            conn.close();
		}
		catch(Exception e) 
		{
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		doGet(request, response);
//	}

}
