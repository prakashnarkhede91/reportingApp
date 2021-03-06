import { Component,OnInit} from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
//import { IEmployee } from './IEmployee';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { PagerService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';
//import {dateFormatPipe} from '../employees/datePipe';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
	providers:[EmployeeService]
})
export class StaffComponent implements OnInit {

 employeeData1:any[]=null;
	selectedRecord:any[]=null;
	msg:string="No Record Found";
	id1='';
	name1='';
	// pager object
    pager: any = {};
	// paged items
    pagedItems: any[];
	
	allItems:any[];
	modalRef:any;
	modalRef1:any;
	result:any;
	
	
	deleteResult:any;
	
	
	constructor(private Eservice:EmployeeService,private route:ActivatedRoute,private pagerService: PagerService,private modalService: BsModalService)
	{
		
		//this.employeeData=this.Eservice.getemployeeData();
	}
	ngOnInit()
	{
		
		this.Eservice.getStaffList().subscribe(
													(empData1)=>{this.employeeData1=empData1['bloodList']; 
																this.allItems = empData1['bloodList'];
													 			this.setPage(1);
											
														},
												 error=>{
														this.msg="please try again";
												});
		
	

	
	}
	
	 setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

	selectData(emp1:any,template:any):any{
		
		this.selectedRecord=emp1;
		this.modalRef = this.modalService.show(template);
		
	}
	new_staff_add(template1:any):any{
		
		let config = { backdrop: true, ignoreBackdropClick: true };
		
		this.modalRef1 = this.modalService.show(template1, config);
		 
		
	}
	updateData(data:any,template:any):any{
		this.selectedRecord=data;
		let config = { backdrop: true, ignoreBackdropClick: true };
		
		this.modalRef = this.modalService.show(template, config);
		
	}
	editNewStaff(data:any,template:any):any{
		console.log(data.value);
		
		var datePipe = new DatePipe("en-US");
        var value = datePipe.transform(data.value.emp_birth_date, 'yyyy-MM-dd');
		console.log("aaaaaaaaaaaaaaaaaaaaaaaa"+value);
		data.value.emp_birth_date=datePipe.transform(data.value.emp_birth_date, 'yyyy-MM-dd');
		
		this.Eservice.editNewStaff(data.value).subscribe(data=>{
			
			if(data['Sucess']=='Update Successfully')
			{
				 this.modalRef.hide();
				this.displayTable();
			}
			
		})
	}
	
	
	
	
	
	RemoveStaff(employee_id:any):any{
		
		this.Eservice.RemoveStaff(employee_id).subscribe(data=>{this.deleteResult=data; 
															   
															   if(data['Sucess']=='Remove Sucessfully')
																{
																	 this.displayTable();
																}
															   
															   });
																
	}
	searchDataFilter(searchData: NgForm)
	{
		let cname=searchData.value.cname;
		let cmobile=searchData.value.cmobile;
		this.Eservice.searchDataFilter(cname,cmobile).subscribe((empData1)=>{this.employeeData1=empData1['bloodList']; 
																			this.allItems = empData1['bloodList'];
																			this.setPage(1);
																			}
		
																);
		
	}
	addNewStaff(data:any,template1:any){
	
		console.log(data.value);
		this.Eservice.addNewStaff1(data.value).subscribe((data1)=>{this.result=data1;
																  
																  //console.log(data1.Sucess);
																   if(data1['Sucess']=='One Record sucessfully insereted.')
																	  {
																		   this.modalRef1.hide();
																		   this.displayTable();
																	  }
																 }
														
														);
		
		
	}
	
	
	displayTable():void{
		
		 this.Eservice.getStaffList().subscribe((empData1)=>{this.employeeData1=empData1['bloodList']; 
															 this.allItems = empData1['bloodList'];
															 this.setPage(1);
															},
															error=>{
																		this.msg="please try again";
																	});
		
		
	}
	

}
