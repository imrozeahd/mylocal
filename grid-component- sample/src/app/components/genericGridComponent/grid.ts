import {Component, OnInit} from '@angular/core';
import {Columns} from './column';
import {Sorter} from './sorter';
import {textboxComponent} from '../textbox/textbox.component';
import {testComponent} from '../test/test.component';
@Component({
    selector: 'generic-grid',
    inputs: ['rows: rows', 'columns: columns', 'pagesize:pagesize', 'isCheckBoxReq:isCheckBoxReq', 'autoGenColumns:autoGenColumns', 'setPagination:setPagination', 'isSearchRequired:isSearchRequired'],
    templateUrl: './app/components/genericGridComponent/grid.html',
    styleUrls: ['./app/components/genericGridComponent/grid.css'],
    directives: [textboxComponent, testComponent]
})
export class GenericGrid implements OnInit {

    count: number;
    numberarray = [];
    columns: Array<Columns>;
    rows: Array<any>;
    filterRows: Array<any>;
    sorter: Sorter;
    pagesize: number;
    displayRows: Array<any>;
    check: number;
    pageno: number = 1;
    selectedcheckbox: string = "checked";
    setAllOn: string;
    select: string;
    value: string;
    isCheckBoxReq: boolean;
    autoGenColumns: boolean;
    numarray = [];
    setPagination: number = 3;
    previousNo: number = 0;
    nextNo: number = 0;
    public filterValue: string = '';
    
    isSearchRequired: boolean = true;

    constructor() {
        this.sorter = new Sorter();
        this.setAllOn = "";
        this.value = "";
    }


    sort(key) {
        this.sorter.sort(key, this.displayRows);
    }
    callmyfunc(i) {
        this.check = i.age;

    }
    //ngOnChanges
    ngOnInit() {        
        
        this.filterRows=this.rows;
        this.InitalizeGrid(this.filterRows);
    }

    InitalizeGrid(arrayRows) {
        if (arrayRows != null) {
            if (arrayRows.length < this.pagesize) {
                this.count = arrayRows.length;
            } else {
                if ((arrayRows.length) % (this.pagesize) == 0) {
                    this.count = Math.round(arrayRows.length / this.pagesize)
                } else {
                    this.count = Math.round(arrayRows.length / this.pagesize) + 1;
                }
            }
            this.numarray = [];
            for (let i = 1; i <= this.count; i++) {
                this.numarray.push(i);
            }
            this.previousNo = 0;
            if (this.numarray.length < this.setPagination) {
                this.nextNo = this.numarray.length;
            }
            else {
                this.nextNo = this.setPagination;
            }
            this.numberarray = this.numarray.slice(this.previousNo, this.nextNo);
            this.displayRows = arrayRows.slice((this.pagesize * (this.pageno - 1)), (this.pagesize * (this.pageno - 1)) + this.pagesize);

            if (this.autoGenColumns) {
                let nameofcoloumns = Object.keys(this.rows[0]);
                this.columns = Array<Columns>();
                for (var key in nameofcoloumns) {

                    this.columns.push(new Columns(nameofcoloumns[key], nameofcoloumns[key]));

                }
            }

        }



    }

    callrow(pagenumber) {
        this.displayRows = this.filterRows.slice(this.pagesize * (pagenumber - 1), (this.pagesize * (pagenumber - 1)) + this.pagesize);
        this.pageno = pagenumber;

        if (pagenumber <= 1) {
            this.previousNo = pagenumber;

        }
        else 
        {
                this.previousNo = this.nextNo - this.setPagination;
        }
        if(this.previousNo<1) {
            this.previousNo = pagenumber - 1;
        }

        if (this.previousNo + this.setPagination <= this.numarray.length) {
            this.nextNo = this.previousNo + this.setPagination;

        }
        else {
            this.nextNo = this.numarray.length + 1;
            
        }



        this.numberarray = this.numarray.slice(this.previousNo - 1, this.nextNo - 1);
    }

    SetCheckboxes(sel) {
        if (sel == "") {
            this.setAllOn = this.selectedcheckbox;
            this.value = this.selectedcheckbox;
        }
        else {
            this.setAllOn = "";
            this.value = "";
        }
    }
    
    filterSearch() {

        
        if (this.isSearchRequired  && this.filterValue != '') {

            this.filterRows = [];
            this.columns.forEach(element => {
                let temparray = [];
                temparray = this.rows.filter(item => item[element.name].toString().toLocaleLowerCase().indexOf(this.filterValue.toString().toLocaleLowerCase()) !== -1);
                temparray.forEach(element => {

                    this.filterRows.push(element);

                });


            });


        }
        else {
            this.filterRows = this.rows;
        }



        this.pageno = 1;
        this.InitalizeGrid(this.filterRows);
    }
}
