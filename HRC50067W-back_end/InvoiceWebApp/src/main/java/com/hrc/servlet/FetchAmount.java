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
import com.google.gson.Gson;
/**
 * Servlet implementation class FetchAmount
 */
@WebServlet("/FetchAmount")
public class FetchAmount extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchAmount() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		PrintWriter out = response.getWriter();
		ArrayList<String> InvoiceArrLst = new ArrayList<String>();
		double total_open_amount;
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

            Connection conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");               

            PreparedStatement ps = conn.prepareStatement("SELECT total_open_amount FROM winter_internship "
            		+ "WHERE clear_date BETWEEN ? AND ? OR due_in_date BETWEEN ? AND ? "
            		+ "OR baseline_create_date BETWEEN ? AND ? OR invoice_currency = ? GROUP BY business_code");
            
            ps.setString(1, request.getParameter("from_clear_date"));
            ps.setString(2, request.getParameter("to_clear_date"));
            ps.setString(3, request.getParameter("from_due_in_date"));
            ps.setString(4, request.getParameter("to_due_in_date"));
            ps.setString(5, request.getParameter("from_baseline_create_date"));
            ps.setString(6, request.getParameter("to_baseline_create_date"));
            ps.setString(7, request.getParameter("invoice_currency"));
     
            
            response.setHeader("Access-Control-Allow-Origin", "*");
            ResultSet rs = ps.executeQuery();
            while(rs.next())
			{
				String Invoiceobj = new String();
				
				total_open_amount = rs.getDouble("total_open_amount");
				
				Invoiceobj = String.valueOf(total_open_amount);

				
				InvoiceArrLst.add(Invoiceobj);
			}
			
			for(String obj :InvoiceArrLst)
			{
				System.out.println(obj);
			}
		}
		catch(Exception e) 
		{
			e.printStackTrace();
			System.out.println("exception occur");
		}
		
		Gson gson = new Gson();
		String respData = gson.toJson(InvoiceArrLst);
		
		out.println(respData);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		doGet(request, response);
//	}

}
