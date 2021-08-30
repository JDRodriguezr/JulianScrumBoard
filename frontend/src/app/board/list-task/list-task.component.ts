import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  public taskData: any;
  public message: string;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public VerticalPosition: MatSnackBarVerticalPosition = 'top';
  public duratioInseconds: number;


  constructor(private _boardService: BoardService,
    private _router: Router,
    private _snackbar: MatSnackBar) {

    this.message = "";
    this.duratioInseconds = 2;
    this.taskData = {}
    
   }

  ngOnInit(): void {
    this._boardService.listTask().subscribe(
      (res)=>{
        console.log(res);
        
        this.taskData = res.board;
       
      },
      (err)=>{
        console.log(err);
        this.message = err.error;
        this.openSnackBarError();
      }
    )
  }

  updateTask(task:any,status:string){
    let tempStatus = task.taskStatus
    task.taskStatus = status



    this._boardService.updateTask(task).subscribe(
      (res)=>{
        task.status = status
      },
      (err)=>{
        task.status = tempStatus
        this.message = err.error;
        this.openSnackBarError();
      }
    )
  }

  deleteTask(task:any){
    this._boardService.deleteTask(task).subscribe(
      (res)=>{  
        let index = this.taskData.indexOf(task)
        if(index>-1){
          this.taskData.splice(index,1);
          this.message = res.message;
          this.openSnackBarSuccesfull()
        }
      },
      (err)=>{
        this.message = err.error;
        this.openSnackBarError();
      }
    )
  }


  openSnackBarSuccesfull() {
    this._snackbar.open(this.message,'X',{
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.VerticalPosition,
      duration:this.duratioInseconds*1000,
      panelClass:['style-snackBarTrue']
    });
  }

  openSnackBarError() {
    this._snackbar.open(this.message,'X',{
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.VerticalPosition,
      duration:this.duratioInseconds*1000,
      panelClass:['style-snackBarFalse']
    });
  }
}
