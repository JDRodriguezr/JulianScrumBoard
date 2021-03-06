import { Component, OnInit } from '@angular/core';
//import del servicio del usuario.
import { BoardService } from '../../services/board.service';
//se importa el router por que se va a comunicar por medio de rutas.
import { Router } from '@angular/router';
//traemos el snapbar por que este nos va a mostrar ciertos mensajes
//es una barra de mensajes
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  public registerData: any;
  public message: string;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public VerticalPosition: MatSnackBarVerticalPosition = 'top';
  public duratioInseconds: number;

  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.message = "";
    this.duratioInseconds = 2;
    this.registerData = {}
  }

  ngOnInit(): void {}

  saveTask(){
        //validamos que lleguen los datos
    if (
      !this.registerData.name ||
      !this.registerData.description
    ) {
      console.log('Failed process:incomplete data');
      this.message = 'Failed process:imcomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._boardService.saveTask(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listTask']);
          this.message = 'Succesfull Task Registration';
          this.openSnackBarSuccesfull();
          this.registerData= {};

          
        },
        (err)=>{
          console.log(err);
          this.message=err.error;
          this.openSnackBarError();
        }
      );
    } 
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
