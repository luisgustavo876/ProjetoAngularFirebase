import { Component, ViewChild } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NavController, ModalController } from '@ionic/angular';
import { create } from 'domain';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  funcionario:any;
  guia:any = 'all'

  constructor(
    public modalCtrl: ModalController 
    
) 
  { 
    this.listarfuncionario()
}

// MODAL ///////////////////////////////////////////////////////////////////////////////

isModalOpen = false;

  setOpen(funcionario: any) {
    this.isModalOpen = true;
    console.log(funcionario)
    this.funcionario = funcionario
  }
  closeModal() {
    this.isModalOpen = false;
  }

// variaveis ///////////////////////////////////////////////////////////////////////////////

  isLoading: boolean = false;
  funcionarios: any;

  listarfuncionario(){
    this.isLoading = true;
    fetch('http://localhost/empresa/funcionario/listar_funcionario.php')
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.funcionarios = response.funcionarios;
      // ['Nome']['cargo']['cidade']['fone']
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }


  removerfuncionario(){
    this.isLoading = true;
    fetch('http://localhost/api/funcionarios/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: this.funcionarios.Nome.Cargo.Cidade.Fone, Acao: 'remover'})
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  trocar(event:any){
    console.log(event.detail.value)
    this.guia=event.detail.value
  }


  // alert remover
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'alert-button-cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Confirm',
      role: 'confirm',
      cssClass: 'alert-button-confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.removerfuncionario()
      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}