import { FormularioService } from '../../../services/formulario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnDestroy {
  public formsubmit: boolean = false;
  public formpassword: boolean = false;
  public documentId = null;
  public arreglousers = [];
  public currentStatus = 1;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(20)]),
    cc: new FormControl('', [Validators.required, Validators.minLength(10)]),
    tel: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern(this.emailPattern)]),
    confiremail: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    id: new FormControl('')
  });

  constructor(private firestoreService: FormularioService) { }

  onReset() {
    this.newUserForm.reset();
  }

  ngOnInit() {
    console.log("datosf" + this.arreglousers.values);
    this.newUserForm.setValue({
      id: '',
      name: '',
      cc: '',
      tel: '',
      email: '',
      confiremail: '',
      password: '',
      confirpassword: ''

    });
    this.firestoreService.getUsers().subscribe((usersSnapshot) => {
      this.arreglousers = [];
      usersSnapshot.forEach((userData: any) => {
        this.arreglousers.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      });
    });
  }

  ngOnDestroy() {

  }

  get name() { return this.newUserForm.get('name'); }
  get cc() { return this.newUserForm.get('cc'); }
  get tel() { return this.newUserForm.get('tel'); }
  get email() { return this.newUserForm.get('email'); }
  get confiremail() { return this.newUserForm.get('confirmemail'); }
  get password() { return this.newUserForm.get('password'); }
  get confirpassword() { return this.newUserForm.get('confirpassword'); }

  public newUser(form, documentId = this.documentId) {


    const email1 = this.newUserForm.get('email').value;
    const email2 = this.newUserForm.get('confiremail').value;
    const password1 = this.newUserForm.get('password').value;
    const password2 = this.newUserForm.get('confirpassword').value

    if (this.newUserForm.invalid) {
      return;
    }

    if (email1 !== email2) {
      this.formsubmit = true;
      return;
    } else {
      this.formsubmit = false;
    }
    if (password1 !== password2) {
      this.formpassword = true;
      return;
    } else {
      this.formpassword = false;
    }

    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const data = {
        name: form.name,
        cc: form.cc,
        tel: form.tel,
        email: form.email,
        confiremail: form.confiremail,
        password: form.password,
        confirpassword: form.confirpassword


      };
      this.firestoreService.createUser(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.onReset();
        this.newUserForm.setValue({
          id: '',
          name: '',
          cc: '',
          tel: '',
          email: '',
          confiremail: '',
          password: '',
          confirpassword: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      const data = {
        name: form.name,
        cc: form.cc,
        tel: form.tel,
        email: form.email,
        confiremail: form.confiremail,
        password: form.password,
        confirpassword: form.confirpassword
      };
      this.firestoreService.updateUser(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newUserForm.setValue({
          id: '',
          name: '',
          cc: '',
          tel: '',
          email: '',
          confiremail: '',
          password: '',
          confirpassword: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editUser(documentId) {
    const editSubscribe = this.firestoreService.getUser(documentId).subscribe((user) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newUserForm.setValue({
        id: documentId,
        name: user.payload.data()['name'],
        cc: user.payload.data()['cc']
      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteUser(documentId) {
    this.firestoreService.deleteUser(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

}



