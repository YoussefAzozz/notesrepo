import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/Services/auth.service';
import { NoteService } from 'src/Services/note.service';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _NoteService:NoteService) { }
  userInfo:any=this._AuthService.userData.getValue();
  isLoading:boolean=false;
  updatedTitle:string='';
  updatedDesc:string='';
  note:any={};
  noteTitle:string='';
  userNotes:any[]=[];
  message:string='';


  noteForm=new FormGroup({
    title:new FormControl(null,[Validators.minLength(1)]),
    desc:new FormControl(null,[Validators.minLength(1)]),
    citizenID:new FormControl(this.userInfo._id),
    token:new FormControl(localStorage.getItem('userToken'))
  });

   data:any={
    userID:this.userInfo._id,
    token:localStorage.getItem('userToken')
  }

  /********************Add Note************************/
  submitAddNoteForm(noteForm:FormGroup)
  {
    if(noteForm.valid)
    {
    this.isLoading=true;
    this._NoteService.addNote(noteForm.value).subscribe({
      next:(response:any)=>{
        console.log(response);
        if(response.message == 'success')
        {
          this._NoteService.getUserNotes(this.data).subscribe({
            next:(response:any)=>{
              this.userNotes=response.Notes;
              this.isLoading=false;
              $('#addNote').modal('toggle');
              this.getAllUserNotes();
              this.noteForm.reset();
            }
          });
        }
      }
    });
    }
  }
/********************get all user Notes ************************/
  getAllUserNotes()
  {
    this.isLoading=true;
    this._NoteService.getUserNotes(this.data).subscribe({
      next:(response:any)=>{
        if(response.message == 'success' )
        {
          this.userNotes=response.Notes;
          this.isLoading=false;
          this.message='';        }
        else
        {
          this.userNotes=response.Notes;
          this.message=response.message;
          this.isLoading=false;
        }
      }
    });
  }
  /********************get id of deleted or updated  Notes ************************/
  getId(id:any)
  {
    this.note=this.userNotes.find(n=> n._id==id);
  }
  /********************update Notes ************************/
  updateNote()
  {
    let data={
      token:localStorage.getItem('userToken'),
      title:this.updatedTitle != ''?this.updatedTitle:this.note.title,
      desc:this.updatedDesc != ''?this.updatedDesc:this.note.desc,
      NoteID:this.note._id
    };
    this.isLoading=true;
    this._NoteService.updateNote(data).subscribe({
      next:(response:any)=>
      {
        console.log(response);
        if(response.message == 'updated')
        {
          $('#editNote').modal('toggle');
          this.getAllUserNotes();
          this.isLoading=false;
        }
      }
    })
  }
   /********************delete Notes ************************/
  deleteNote()
  {
    let data={
      body:{
        NoteID:this.note._id,
        token:localStorage.getItem('userToken')
      }
    };
    this.isLoading=true;
    this._NoteService.deleteNote(data).subscribe({
      next:(response:any) => 
      {
       if(response.message == 'deleted')
       {
        this.isLoading=false;
        $('#deleteNote').modal('toggle');
        this.getAllUserNotes();
       }
      }
    })
  }

  ngOnInit(): void {
    this.getAllUserNotes();
   }

}
