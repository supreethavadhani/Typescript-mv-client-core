import { Component, Input,ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatTableModule } from '@angular/material/table';
import { Vo } from '../../mv-form-core/types';
import { FormData } from '../../mv-form-core/formData';


@Component({
	selector: 'app-mv-table',
	templateUrl: './component.html',
	styleUrls:['./component.scss']
})

export class MvTableComponent {
	@Input() tableGridData:TableMetaData | undefined;
	@ViewChild(MatTable,{static:true}) table: MatTable<any> | undefined;
	@ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
	
	public tableData:any = {data:[],metaData:{}};
	public dataSource:any;
	public values: Array<any> = [];
	public tempDatasource: any;
	public rowNumber:any;
	colored: any[] = []

	readonly separatorKeysCodes: number[] = [13, 9, 188];
	isView: string = 'auto';
	dropdownShow: boolean = false;
	filters: {} = {};
	columns: any;

	update() {
		this.isView = this.tableData.metaData.view ? 'pointer' : 'auto'
		this.tableData = this.tableGridData;
		this.columns = this.tableData.metaData.column_names

		this.tempDatasource = this.tableGridData!.data;
		this.tempDatasource = this.tableGridData!.data
		this.dataSource = new MatTableDataSource<any>(this.tableData.data);
		this.dataSource.sort = this.sort;
		console.log(this.tableGridData)
		}

	getColumnData(fd:FormData){
		let tableData:TableMetaData = {
			data: [],
			metaData: {
			  column_names:[
			  ],
			  display_names: { 
			  },
	  
			},
		  };
		fd.form.fields!.forEach(i=>{
			if(i.controlType == 'Input') {
			tableData.metaData.column_names.push(i.name)
			tableData.metaData.display_names[i.name] = i.label
			}
		})
		return tableData
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	  }
}

export interface TableMetaData{
	data:Vo[],
	metaData:{
		column_names:string[],
		display_names:{[key:string]:string},
		editable_columns?:string[],
		badgesColumn?:string,
		disableBadges?:boolean,
		allSelected?:boolean,
		view?:boolean,
		edit?:boolean,
		search?:boolean,
		placeholder?:string,
		selectAttr?:string,
		error?:string,
		buttonName?: string,
		validations?:{[key:string]: Validators},
		managerFunction?: string,
		itemName?: string,
		styleAttribute?: { [key:string]: Array<StyleComparison> }
	},	
}

export interface StyleComparison {
	comp: '=' | '>' | '<' | '>=' | '<=' | '!=',
	value: any,
	dependentCol?: string,
	style: any,
}

export interface Validators{
	minLength?:number,
	maxLength?:number,
	minValue?:number,
	maxValue?:number,
	pattern?:string,
}
