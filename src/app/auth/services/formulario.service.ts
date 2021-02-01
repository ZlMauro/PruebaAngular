import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(
    private firestore: AngularFirestore
  ) {}
   // Crea un nuevo Registro
   public createUser(data: any) {
    return this.firestore.collection('user').add(data);
  }

  // Obtiene un Registro
  public getUser(documentId: string) {
    return this.firestore.collection('user').doc(documentId).snapshotChanges();
  }

  // Obtiene todos los registros
  public getUsers() {
    return this.firestore.collection('user').snapshotChanges();
  }

  // Actualiza un Registro
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('user').doc(documentId).set(data);
  }

  // Borra un Registro
  public deleteUser(documentId: string) {
    return this.firestore.collection('user').doc(documentId).delete();
  }
}
